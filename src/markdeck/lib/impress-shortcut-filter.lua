local change = {x=1, y=0, z=0, scale=0, ["rotate-z"]=0}
local last = {x=-1, y=0, z=0, scale=1, ["rotate-z"]=0}
local history = {}

local dimensions = {"x", "y", "z", "scale", "rotate-z"}

io.write(string.format("%30s", "slide"))
for _, dim in pairs(dimensions) do
    io.write(string.format("%9s", dim))
end
io.write("\n")


local function starts_with(str, start)
   return str:sub(1, #start) == start
end


function string:split(sSeparator, nMax, bRegexp)
   assert(sSeparator ~= '')
   assert(nMax == nil or nMax >= 1)

   local aRecord = {}

   if self:len() > 0 then
      local bPlain = not bRegexp
      nMax = nMax or -1

      local nField, nStart = 1, 1
      local nFirst,nLast = self:find(sSeparator, nStart, bPlain)
      while nFirst and nMax ~= 0 do
         aRecord[nField] = self:sub(nStart, nFirst-1)
         nField = nField+1
         nStart = nLast+1
         nFirst,nLast = self:find(sSeparator, nStart, bPlain)
         nMax = nMax-1
      end
      aRecord[nField] = self:sub(nStart)
   end

   return aRecord
end


local radials = {}

function calc_pos(elem, dim)
    local attr_name = "data-" .. dim
    if elem.attributes[dim .. "-of"] then
        elem.attributes[attr_name] = history[elem.attributes[dim .. "-of"]][attr_name]
        change[dim] = 0
    end
    if elem.attributes[dim] then
        elem.attributes[attr_name] = elem.attributes[dim]
        change[dim] = 0
    end
    if elem.attributes["r" .. dim] then
        if elem.attributes[attr_name] then
            elem.attributes[attr_name] = elem.attributes[attr_name] + elem.attributes["r" .. dim]
        else
            elem.attributes[attr_name] = last[dim] + elem.attributes["r" .. dim]
        end
        change[dim] = elem.attributes[attr_name] - last[dim]
    end
    if elem.attributes[attr_name] == nil then
        elem.attributes[attr_name] = last[dim] + change[dim]
        change[dim] = elem.attributes[attr_name] - last[dim]
    end
    last[dim] = elem.attributes[attr_name]
end


function calc_position_radial(elem, radial)
    local arc_here = (radial["direction"] == "cw" and -1 or 1) * (radial["nr"] + 1) * radial["arc_step"] + radial["arc_start"]
    elem.attributes["data-x"] = radial["x"] + radial["radius"] * math.sin(arc_here)
    elem.attributes["data-y"] = radial["y"] + radial["radius"] * math.cos(arc_here)
    elem.attributes["data-z"] = 0
    elem.attributes["data-scale"] = 1
    elem.attributes["data-rotate-z"] = (radial["direction"] == "cw" and 1 or -1) * radial["nr"] * 360 / radial["count"]
    last["x"] = elem.attributes["data-x"]
    last["y"] = elem.attributes["data-y"]
    last["z"] = elem.attributes["data-z"]
    last["rotate-z"] = elem.attributes["data-rotate-z"]
end


function calc_position(elem)
    if elem.attributes.radial then
        local value = elem.attributes.radial
        local name = string.split(value, ";")[1]
        if radials[name]["nr"] == nil then
            io.write("radial " .. name .. " on " .. elem.identifier .. ": initial\n")
            radials[name]["nr"] = 0
        else
            radials[name]["nr"] = radials[name]["nr"] + 1
            -- io.write("radial " .. name .. " on " .. elem.identifier .. ": nr " .. radials[name]["nr"] .. "/" .. radials[name]["count"] .. "\n")
            calc_position_radial(elem, radials[name])
            return
        end
    end
    for _, dim in pairs(dimensions) do
        calc_pos(elem, dim)
    end
    if elem.attributes.radial then
        local name = string.split(elem.attributes.radial, ";")[1]
        local values = radials[name]
        values["x"] = last["x"] + values["rx"]
        values["y"] = last["y"] + values["ry"]
        values["radius"] = (values["rx"] ^ 2 + values["ry"] ^ 2) ^ 0.5
        values["arc_step"] = 2 * math.pi * values["arc"] / 360 / values["count"]
        local start_arc = values["arc_step"] * (math.atan(values["ry"] / values["rx"]) / (2 * math.pi) / values["count"] + 1)
        io.write("start arc: " .. start_arc .. "\n")
        values["arc_start"] = start_arc
    end
end

function remember_position(elem)
    local entry = {}
    for _, dim in pairs(dimensions) do
        local attr_name = "data-" .. dim
        entry[attr_name] = elem.attributes[attr_name]
    end
    history[elem.identifier] = entry
end

function dump_position(elem)
    -- local attrs = {elem.identifier}
    io.write(string.format("%30s", elem.identifier))
    for _, dim in pairs(dimensions) do
        local attr_name = "data-" .. dim
        io.write(string.format("%9.1f", elem.attributes[attr_name]))
        -- table.insert(attrs, elem.attributes[attr_name])
    end
    -- print(table.concat(attrs, "\t"))
    io.write("\n")
end

function calc_positions(elem)
    table.insert(elem.classes, "step")

    calc_position(elem)
    remember_position(elem)
    dump_position(elem)

    return elem
end


function add_backgrounds(header)
    io.write("adding bg?" .. header.identifier)
    print(header.attributes.bg)
    print(header.attributes.bgcss)
    if header.attributes.bg == nil and header.attributes.bgcss == nil then
        io.write(" no...\n")
        return header
    else
        io.write(" yes!\n")
        return {header, pandoc.Div(pandoc.Null(), pandoc.Attr(header.identifier .. "__bg"))}
    end
end


function collect_radials(header)
    for k, v in pairs(header.attributes) do
        if starts_with(k, "radial") then
            io.write(k .. " on " .. header.identifier .. ": " .. v .. "\n")
            local tokens = {}
            for _, t in next, string.split(v, ";") do
                tokens[#tokens+1] = t
            end
            local name = tokens[1]
            local values = radials[name]
            if values == nil then
                values = {}
                values["direction"] = tokens[4]
                values["arc"] = tokens[5]
                values["rx"] = string.split(tokens[2], ":")[2]
                values["ry"] = string.split(tokens[3], ":")[2]
                values["count"] = 0
            end
            values["count"] = values["count"] + 1
            radials[name] = values
        end
    end
end

function dump_radials(anything)
    for name, values in pairs(radials) do
        io.write(name .. "\n")
        for k, v in pairs(values) do
            io.write("\t" .. k .. ": " .. v .. "\n")
        end
    end
    return nil
end

return {{Header=collect_radials}, {Pandoc=dump_radials}, {Header=calc_positions}, {Header=add_backgrounds}}
