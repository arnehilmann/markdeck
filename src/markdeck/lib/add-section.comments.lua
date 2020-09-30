level0 = -1
level1 = undefined

function Header(elem, attr)
    if elem.level == 1 then
        level0 = level0 + 1
        level1 = -1
        return {pandoc.Plain({pandoc.RawInline("markdown", "<!-- section " .. level0 .. " -->")}), elem}
        -- return {pandoc.Plain({pandoc.Str("<!-- section level " .. level0 .. " -->")}), elem}
        -- return {pandoc.RawBlock("html", "<!-- section " .. level0 .. " -->"), elem}
    end
    if elem.level ==  2 then
        level1 = level1 + 1
        if level1 > 0 then
            -- return {pandoc.RawBlock("html", "<!-- subsection " .. level0 .. " / " .. level1 .. " -->"), elem}
            -- return {pandoc.Plain({pandoc.Str("<!-- subsection " .. level0 .. " / " .. level1 .. " -->")}), elem}
            return {pandoc.Plain({pandoc.RawInline("markdown", "<!-- subsection " .. level0 .. " / " .. level1 .. " -->")}), elem}
        end
    end
    return nil
    -- return {pandoc.Plain({pandoc.RawInline("", "<!-- section level " .. elem.level .. " -->")}), elem}
    -- return {pandoc.RawBlock("text/html", "aha"), elem}
end
