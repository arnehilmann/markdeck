variant = "unknown"
skip = false

function Header(header)
    if header.attributes.skipon ~= nil and variant ~= nil and string.find(header.attributes.skipon, variant) then
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
    for k, v in pairs(m) do
        if k == "variant" then
            print(k)
            variant = v[1].text
            print(variant)
        end
    end
    return nil
end

return {{Meta=Meta}, {Header=Header, Block=Block}}
