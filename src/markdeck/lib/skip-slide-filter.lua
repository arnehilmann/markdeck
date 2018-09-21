variant = "unknown"
skip = false

function Header(header)
    if header.attributes.skipon ~= nil and string.find(header.attributes.skipon, variant) then
        io.write("header skipped\n")
        skip = true
        return {}
    else
        skip = false
        return nil
    end
end

function Block(block)
    if skip then
        io.write("block skipped\n")
        return {}
    else
        return nil
    end
end

function Meta(m)
    -- io.write(m.variant .. " active!\n")
    -- for k, v in pairs(m) do
        -- io.write(k .. "\n")
    -- end
    -- for k, v in pairs(m.variant) do
        -- io.write(k .. "\n")
        -- for k1, v1 in pairs(v) do
            -- io.write(k1)
        -- end
    -- end
    -- io.write(m.variant[1].c)
    variant = m.variant[1].c
    return nil
end

return {{Meta=Meta}, {Header=Header, Block=Block}}
