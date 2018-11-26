function Image(elem, attr)
    local suffix = string.sub(elem.src, -4)
    if suffix == ".svg" then
        io.stderr:write("svg found: " .. elem.src .. "\n")
        local f = io.open(elem.src, "rb")
        local data = f:read("*all")
        f:close()
        io.stderr:write("    inlining\n")
        -- return pandoc.Str(data)
        return pandoc.RawInline("html", data)
        -- return pandoc.RawInline("text/xml+svg", data)
    end
end
