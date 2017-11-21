local bg_attrs = {"data-background", "data-background-image"}

function Header(elem)
    if elem.attributes then
        local new_attrs = {}
        for k,attribute in pairs(elem.attributes) do
            if attribute[1]=="bg" then
                io.stderr:write("section " .. elem.identifier .. "\n")
                io.stderr:write("    " .. attribute[1] .. ": " .. attribute[2] .. "\n")
                local i=1
                for w in attribute[2]:gmatch("([^;]*)") do
                    io.stderr:write("        " .. bg_attrs[i] .. ": " .. w .. "\n")
                    table.insert(elem.attributes, {bg_attrs[i], w})
                    i=i+1
                end
            else
                table.insert(new_attrs, attribute)
            end
        end
        elem.attributes = new_attrs
    end

    return elem
end
