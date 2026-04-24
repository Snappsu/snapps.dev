async function fetchBlogPosts(query = "") {
    console.log("fetching entries from feed...")

    
    const url = `https://feed.snapps.dev/json?nsfw=true&{query}`;
    const options = {
        method: 'GET'
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        entries = data.items
            console.log(`${entries.length} entries found!`,entries)

    } catch (error) {
        console.error("error getting feed! thats not good",error)
    }

    populateEntryList(entries)
    return true;
}

    var entries = null


function populateEntryList(entries) {
    entries.sort((a, b) => {
        var one = new Date(a.date_modified)
        var two = new Date(b.date_modified)
        return two - one
    })
    console.log(entries)
    var list = document.getElementById("entry-list")
    entries.forEach(entry => {

        // entry
        var entryNode = document.createElement("div")
        entryNode.classList.add("entry")

        // - title
        var entryTitle = document.createElement("span")
        entryTitle.classList.add("title")
        entryTitle.style.order = "1"
        entryTitle.innerHTML = entry.title
        entryNode.appendChild(entryTitle)

        // - metadata
        var entryMeta = document.createElement("div")
        entryMeta.style.order = "2"
        entryMeta.classList.add("metadata")
        entryNode.appendChild(entryMeta)

        // - - desc
        var entryDesc = document.createElement("span")
        entryDesc.classList.add("desc")
        entryDesc.style.order = "1"
        entryDesc.innerHTML = entry.summary
        entryMeta.appendChild(entryDesc)

        // - - info
        var entryInfo = document.createElement("span")
        entryInfo.classList.add("info")
        entryInfo.style.order = "3"
        entryMeta.appendChild(entryInfo)


        // - - - category
        var entryCategory = document.createElement("span")
        entryCategory.innerHTML = entry.category[0]
        entryInfo.appendChild(entryCategory)

        // - - - tags
        var entryTags = document.createElement("span")
        entryTags.innerHTML = entry.tags[0]
        entryInfo.appendChild(entryTags)


        // - - read
        var entryReadButton = document.createElement("a")
        entryReadButton.classList.add("readNow")
        entryReadButton.innerHTML = "Read Now!"
                entryReadButton.style.order = "2"

        entryReadButton.setAttribute("onclick",`loadPage("soapbox/${entry.id}")`)
        entryMeta.appendChild(entryReadButton)

        // - date
        var entryDate = document.createElement("span")
        entryDate.classList.add("date")
        const date = new Date(entry.date_published)
        entryDate.innerHTML = date.getUTCMonth() +"-"+ date.getUTCDate() + "-"+date.getUTCFullYear()
        entryNode.appendChild(entryDate)

        list.appendChild(entryNode)
    });
}