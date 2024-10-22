mp.register_script_message("toggle_dynaudnorm", function()
    mp.command("af toggle lavfi=[dynaudnorm=f=75:g=25:p=0.55:m=5:r=0.9:b=1]")
end)
