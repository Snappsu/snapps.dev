//in theory, there should be no calls to the document here
//not that it matters, really

export function rollTag(tag_list, max_spice = null, current_tag = null) {
    // filter
    let tagPool = [];
    for (const tag in tag_list) {
        if (max_spice ? tag_list[tag].spice <= max_spice : true)
            tagPool.push({
                name: tag,
                spice: tag_list[tag].spice,
                desc: tag_list[tag].desc
            })
    }
    // no same tag
    let newTag
    do {
        newTag = tagPool[Math.floor(Math.random() * tagPool.length)]
        console.log(`${current_tag.name} vs ${newTag.name}`)
    } while (current_tag.name == newTag.name && tagPool > 1);
    return newTag
}

// tag manipulation
export function checkForTag(user_data, tag_name) {
    return tag_name in user_data.tags
}

export function writeTag(user_data, tag_name, tag_spice, tag_desc = null) {
    user_data.tags[tag_name] = {
        spice: tag_spice,
        desc: tag_desc
    }
    return user_data.tags
}

// setting maniupulation
export function getSetting(user_data, setting_name) {
    return user_data.settings[setting_name]
}

export function setSetting(user_data, setting_name, value) {
    return user_data.settings[setting_name] = value
}

// import/export/saving
export function exportTags(tag_list) {
    let out = ""
    for (const tag in tag_list) {
        out += `${tag},${tag_list[tag].spice},${tag_list[tag].desc?tag_list[tag].desc:""};\n`
    }
    return out
}

export function importTags(data_in) {
    let tagRegex = /([\w\-()]+),(\d+),([^;]+)?;?/g
    let tagsFound = [...data_in.matchAll(tagRegex)]
    let tags = {}
    
    tagsFound.forEach((tag) => {
        let newTag = {}
        newTag.spice = parseInt(tag[2])
        tag[3] ? newTag.desc = tag[3] : newTag.desc = null
        tags[tag[1]] = newTag

    });
    console.log(tags)
    return tags
}

export function saveUserData(user_data, location) {
    localStorage.setItem(location, JSON.stringify(user_data));
}

export function loadUserData(data_location) {
    let data = null;
    try {
        data = JSON.parse(localStorage.getItem(data_location));
    } catch (error) {

    }
    return data
}