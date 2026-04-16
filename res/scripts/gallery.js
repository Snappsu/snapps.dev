const DEFAULT_QUERY = ""
const RATINGS_BLACKLIST = ["rating:q", "rating:e", "rating:unrated"]
const PERMA_BLACKLIST = ["timelapse"]

class Post {
    desc;
    link;
    src;
    constructor(desc, link, src) {
        console.log(desc)
        this.desc = desc
        if (this.desc == "" || this.desc == null) this.desc = "[no description provided]"
        this.link = link
        this.src = src
        return this
    }
    makeHTMLElement() {
        return `<a class="gallery-post" href="${this.link}"><img src="${this.src}"><span class="gallery-post-tooltip">${this.desc}</span></a>`
    }
}

function buildQuery(query, rating) {
    var queryOut = ""
    var negative = []
    negative = negative.concat(PERMA_BLACKLIST)
    for (var i = RATINGS_BLACKLIST.length - 1; i >= rating; i--) {
        negative.push(RATINGS_BLACKLIST[i])
    }

    negative = negative.map(function (e) {
        e = "-" + e;
        return e;
    });
    var queryOut = query + " " + negative.join(" ")
    return encodeURIComponent(queryOut)
}

function parseGalleryData(queryData) {
    var posts = []
    queryData.forEach(element => {
        posts.push(new Post(element.description, `https://gallery.snapps.dev/post/view/${element.id}`, element.preview_url))
    });
    console.log(`${posts.length} posts found!`)
    return posts
}

async function queryGallery(query = DEFAULT_QUERY, rating = 1) {
    finalQuery = buildQuery(query, rating)
    const url = `https://gallery.snapps.dev/post/list.json?tags=${finalQuery}`;
    console.log(`sending query ${url}`);
    const options = {
        method: 'GET'
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        var posts = parseGalleryData(data)
        document.getElementById("gallery-posts").innerHTML = ""
        posts.forEach(element => {
            document.getElementById("gallery-posts").innerHTML += element.makeHTMLElement()
        });

        return true;
    } catch (error) {
        console.error(error);
        return false
    }
    return false
}