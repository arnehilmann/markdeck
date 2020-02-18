function shlex(text)
    --
    -- blatantly copied from https://stackoverflow.com/a/28665686
    --
    local result = {}
    local e = 0
    while true do
        local b = e+1
        b = text:find("%S",b)
        if b==nil then
            break
        end
        if text:sub(b,b)=="'" then
            e = text:find("'",b+1)
            b = b+1
        elseif text:sub(b,b)=='"' then
            e = text:find('"',b+1)
            b = b+1
        else
            e = text:find("%s",b+1)
        end
        if e==nil then
            e=#text+1
        end
        -- print("["..text:sub(b,e-1).."]")
        table.insert(result, text:sub(b, e-1))
    end
    return result
end
-- for _, token in pairs(shlex("aha 'foo bar' egg")) do
    -- print(token)
-- end
--
--
CONFIGFILE=os.getenv("ASCIIART_CONFIG") or "render-asciiart-filter.config"
local config = {}
local configfile,err = loadfile(CONFIGFILE, "t", config)
if configfile then
   configfile() -- load the config
else
   io.stderr:write(err)
end

local outputdir=io.open("rendered","r")
if outputdir~=nil then
    io.close(outputdir)
else
    os.execute("mkdir rendered")
end

LIBDIR=os.getenv("ASCIIART_LIBDIR") or "lib"

local renderer = {
    render_ditaa = function(text, attrs)
        if attrs[1] then
            attrs = attrs[1][2]
        else
            attrs = config.ditaa.defaultargs or ""
        end
        params = {"-jar", LIBDIR .. "/ditaa.jar"}
        for _, w in pairs(shlex(attrs)) do
            table.insert(params, w)
        end
        table.insert(params, "-")
        table.insert(params, "-")
        return {"java", params, text}, "png"
    end,
    render_plantuml = function(text, attrs)
        if attrs[1] then
            attrs = attrs[1][2]
        else
            attrs = config.plantuml.defaultargs or ""
        end
        params = {"-jar", LIBDIR .. "/plantuml.jar", "-tsvg", "-p", "-Sbackgroundcolor=transparent"}
        for w in attrs:gmatch("%S+") do
            table.insert(params, w)
        end
        return {"java", params, text}, "svg"
    end,
    render_dot = function(text, attrs)
        if attrs[1] then
            attrs = attrs[1][2]
        else
            attrs = config.dot.defaultargs or ""
        end
        params = {"-Tsvg"}
        for w in attrs:gmatch("%S+") do
            table.insert(params, w)
        end
        return {"dot", params, text}, "svg"
    end,
    render_qr = function(text, attrs)
        if attrs[1] then
            attrs = attrs[1][2]
        else
            attrs = config.qr.defaultargs or ""
        end
        params = {"-o", "-"}
        for w in attrs:gmatch("%S+") do
            table.insert(params, w)
        end
        return {"qrencode", params, text}, "png"
    end,
    render_vegalite = function(text, attrs)
        return {"vl2svg", {}, text}, "svg"
    end,
    render_a2s = function(text, attrs)
        return {
                    "curl",
                    {"-s", "-S", "--data-binary",  "@-", "http://a2sketch:22753/a2svg"},
                    text
                },
               "svg"
    end,
    render_a2sketch = function(text, attrs)
        io.stderr:write("a2sketch: source text:\n" .. text .. "\n\n")
        return {
                    "curl",
                    {"-s", "-S", "--data-binary",  "@-", "http://a2sketch:22753/a2sketch"},
                    text
                },
               "svg"
    end,
    render_svgbob = function(text, attrs)
        io.stderr:write("svgbob found: " .. text .. "\n")
        if attrs[1] then
            attrs = attrs[1][2]
        end
        params = {}
        for _, w in pairs(shlex(attrs)) do
            table.insert(params, w)
        end
        return {"svgbob", params, text}, "svg"
    end,
}


images = {}


function Cleanup(doc)
    local pfile = io.popen('ls -a rendered/*.png rendered/*.svg 2> /dev/null')
    for fname in pfile:lines() do
        if not images[fname] then
            io.stderr:write("removing obsolete '" .. fname .. "'\n")
            os.remove(fname)
        end
    end
    pfile:close()

    return nil
end


function Render(elem, attr)
    for format, render_cmd in pairs(renderer) do
        if elem.classes[1] == format then
            local cmd, filetype = render_cmd(elem.text, elem.attributes or {})
            local mimetype = "image/" .. filetype
            local fname = "rendered/" .. format .. "-" .. pandoc.sha1(cmd[1] .. table.concat(cmd[2], " ") .. cmd[3]) .. "." .. filetype
            local data = nil

            local f=io.open(fname,"rb")
            if f~=nil then
                io.stderr:write("cached " .. format .. " found\n")
                data = f:read("*all")
                f:close()
            else
                io.stderr:write("call " .. format .. "\n")
                data = pandoc.pipe(cmd[1], cmd[2], cmd[3])
                local f=io.open(fname, "wb")
                f:write(data)
                f:close()
            end
            images[fname] = true
            pandoc.mediabag.insert(fname, mimetype, data)
            return fname
        end
    end
    return nil
end


function RenderCodeBlock(elem, attr)
    local fname = Render(elem, attr)
    if fname ~= nil then
        return pandoc.Para{ pandoc.Image({pandoc.Str("")}, fname) }
    else
        return nil
    end
end


function RenderCode(elem, attr)
    elem.text = elem.text:gsub("\\n.", "\n")
    local fname = Render(elem, attr)
    if fname ~= nil then
        return pandoc.Image({pandoc.Str("")}, fname)
    else
        return nil
    end
end


function ModifyCode(elem, attr)
    if elem.classes[1] == "render_mermaid" then
        io.stderr:write("mermaid found\n")
        new_elem = pandoc.Div({pandoc.Plain({pandoc.Str(elem.text)})})
        table.insert(new_elem.classes, "mermaid")
        return new_elem
    end
    return nil
end


return {{CodeBlock=RenderCodeBlock, Code=RenderCode}, {CodeBlock=ModifyCode}, {Pandoc=Cleanup}}
