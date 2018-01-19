emojis = {}
found = {}

function getFilename(url)
  return url:match("^.+/(.+)%..+$")
end


local pfile = io.popen('ls -a /markdeck/lib/emojis/*.png')
for png in pfile:lines() do
    -- io.stderr:write("png found: " .. png .. "\n")
    local code = getFilename(png)
    emojis[code] = png
end

os.execute('mkdir -p /target/assets/markdeck/emojis/')

function ReplaceEmojis(elem)
    local es = {}
    last_pos = 1
    for pos, c in utf8.codes(elem.text) do
        local codepoint = string.format("%x", c)
        local png = emojis[codepoint]
        if png then
            -- io.stderr:write("emoji: " .. utf8.char(c) .. "  " .. png .. "\n")
            found[#found+1] = utf8.char(c)
            if pos > last_pos then
                es[#es+1] = pandoc.Str(elem.text:sub(last_pos, pos-1))
            end
            last_pos = pos + utf8.char(c):len()
            local png_as_asset = "assets/markdeck/emojis/" .. codepoint .. ".png"
            os.execute("cp " .. png .. " " .. png_as_asset)
            es[#es+1] = pandoc.Image({pandoc.Str(utf8.char(c))}, png_as_asset, "", pandoc.Attr("", {"emoji"}))
        end
    end
    if elem.text:len() > last_pos then
        es[#es+1] = pandoc.Str(elem.text:sub(last_pos))
    end
    if #es > 0 then
        return es
    else
        return nil
    end
end


function DumpFoundEmojis(blocks)
    if #found > 0 then
        io.stderr:write("emojis found: ")
        for _, value in pairs(found) do
            io.stderr:write(value .. " ")
        end
        io.stderr:write("\n")
    end
    return nil
end


return {{Str=ReplaceEmojis}, {Pandoc=DumpFoundEmojis}}
