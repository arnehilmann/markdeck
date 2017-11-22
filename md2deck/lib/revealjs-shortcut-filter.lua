local bg_attrs = {"data-background", "data-background-image"}

function Header(elem)
    if elem.attributes then
        if elem.attributes.bg then
            io.stderr:write("section " .. elem.identifier .. "\n")
            local i=1
            for w in elem.attributes.bg:gmatch("([^;]*)") do
                io.stderr:write("    " .. bg_attrs[i] .. ": " .. w .. "\n")
                elem.attributes[bg_attrs[i]]=w
                i=i+1
            end
            elem.attributes.bg=nil
        end
    end

    return elem
end
