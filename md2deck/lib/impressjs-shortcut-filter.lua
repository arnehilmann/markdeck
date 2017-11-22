local change_x=1000
local change_y=0

local last_x=-change_x
local last_y=0

function Header(elem)
    io.stderr:write("adding step class\n")
    table.insert(elem.classes, "step")
    if elem.attributes then
        local x=last_x+change_x
        last_x=x
        local y=last_y+change_y
        last_y=y
        io.stderr:write("setting x and y\n")
        local new_attrs = {}
        table.insert(new_attrs, {"data-x", x})
        table.insert(new_attrs, {"data-y", y})
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
