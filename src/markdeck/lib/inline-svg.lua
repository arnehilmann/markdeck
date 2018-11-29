function Image(elem, attr)
    local suffix = string.sub(elem.src, -4)
    if suffix == ".svg" then
        io.stderr:write("svg found: " .. elem.src .. ", inlining...\n")
        local f = io.open(elem.src, "rb")
        local data = f:read("*all")
        f:close()
        return pandoc.RawInline("html", data)
    end
end
