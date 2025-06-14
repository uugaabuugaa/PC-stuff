/* show album name and year under artist name */
(function() {
    async function updateAlbumInfo() {
        if (!document.querySelector(".main-trackInfo-container") || !Spicetify.Player.data?.item) {
            return setTimeout(updateAlbumInfo, 300);
        }

        const container = document.querySelector(".main-trackInfo-container");
        const album_uri = Spicetify.Player.data.item.metadata.album_uri;
        
        // Add your exact grid CSS (only once)
        if (!document.querySelector("#album-grid-applied")) {
            const style = document.createElement("style");
            style.id = "album-grid-applied";
            style.textContent = `
                .main-nowPlayingWidget-trackInfo {
                    grid-template:
                        "title title"
                        "badges subtitle"
                        "pretitle pretitle"
                        "genres genres" / auto 1fr;
                }
            `;
            document.head.appendChild(style);
        }

        let albumInfoHtml = "";
        if (album_uri && !album_uri.includes("spotify:show")) {
            try {
                const albumInfo = await Spicetify.CosmosAsync.get(
                    `https://api.spotify.com/v1/albums/${album_uri.replace("spotify:album:", "")}`
                );
                const album_date = new Date(albumInfo.release_date);
                const isRecent = album_date > new Date(new Date().setMonth(new Date().getMonth() - 6));
                
                albumInfoHtml = `
                    <div class="album-info-line" style="
                        font-size: 11px;
                        color: var(--spice-subtext);
                        margin-top: 0px;
                    ">
                        <a href="${album_uri}" style="color: inherit;">
                            ${Spicetify.Player.data.item.metadata.album_title}
                        </a>
                        <span> • ${album_date.toLocaleString("default", 
                            isRecent ? { year: "numeric", month: "short" } : { year: "numeric" })}
                        </span>
                    </div>
                `;
            } catch (err) {
                console.error("Album info fetch failed:", err);
                return;
            }
        }

        let element = document.querySelector("#album-info-extension");
        if (!element) {
            element = document.createElement("div");
            element.id = "album-info-extension";
            container.appendChild(element);
        }
        element.innerHTML = albumInfoHtml;
    }

    updateAlbumInfo();
    Spicetify.Player.addEventListener("songchange", updateAlbumInfo);
})();