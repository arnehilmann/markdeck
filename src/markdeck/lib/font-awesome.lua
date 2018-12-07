function url_decode(str)
   str = str:gsub("+", " ")
   str = str:gsub("%%(%x%x)", function(h)
      return string.char(tonumber(h,16))
   end)
   str = str:gsub("\r\n", "\n")
   return str
end

function Image(elem, attr)
    local prefix = string.sub(elem.src, 1, 2)
    if prefix == "fa" then
        local fa_classes = url_decode(elem.src)
        io.stderr:write("font-awesome found: " .. fa_classes .. "\n");
        local content = ""
        for k, v in pairs(elem.caption) do
            if v.text ~= nil then
                -- io.stderr:write("content " .. v.text .. "\n")
                content = content .. " " .. v.text
            end
        end
        return pandoc.RawInline("html", "<i class='" .. fa_classes .. "'>" .. content .. "</i>")
    end
end
