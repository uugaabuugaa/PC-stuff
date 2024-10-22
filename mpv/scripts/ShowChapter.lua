local function showChapterTitle()
    local chapterExists = mp.get_property("chapter")
    local idle = mp.get_property_native("idle-active")

  if chapterExists and not idle then  
    mp.osd_message('Chapter: '.. mp.command_native({'expand-text', '${chapter}'}), 3)
  end  
end
mp.observe_property("chapter", nil, showChapterTitle)