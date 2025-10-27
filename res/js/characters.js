// (Dummy Results from query
var dummyResults = [ 
    { // Result object - Savak 
        // Relational Data
        id: 1,
        revision: 1,
        parent_id: null,
        // Filter Data
        is_nsfw: false,
        is_kinky: false,
        // Aesthetic Data
        colors: `["#ff0","#0ff"]`,
        // Functional Data
        gallery_tag: "savak",
        // Visual Data
        palette: "[]",
        image_data: '[{"setLabel":"Full Body","setBG":"","setImages":[{"src":"woah.png","label":"SFW","desc":"Savak in their normal form","tags":[]},{"src":"woah2.png","label":"NSFW","desc":"Savak in their normal form","tags":[]}]}]',
        icon_src:"icon.gif",
        // Flavor Data
        name: "Savak",
        desc: "My favorite kobold <3",
        debut_year: "2022",
        aliases: "[]",
        series: "Mascot",
        quote: "Stop talking about my ass!",
        sex: "Intersex",
        gender: "Agender",
        pronouns: "They/Them",
        personality: "Temperamental",
        common_tags: "[]",
        trivia: "[]",
        footnotes: "[]",

    },
    { // Result object - Snavak 
        // Relational Data
        id: 2,
        revision: 1,
        parent_id: null,
        // Filter Data
        is_nsfw: false,
        is_kinky: false,
        // Aesthetic Data
        colors: `["#f0f","#0ff"]`,
        // Functional Data
        gallery_tag: "snavak",
        // Visual Data
        palette: "[]",
        image_data: '[{"setLabel":"Full Body","setBG":"","setImages":[{"src":"woah.png","label":"SFW","desc":"Savak in their normal form","tags":[]},{"src":"woah2.png","label":"NSFW","desc":"Savak in their normal form","tags":[]}]}]',
        icon_src:"icon.gif",
        // Flavor Data
        name: "Snavak",
        desc: "My favorite snake <3",
        debut_year: "2022",
        aliases: "[]",
        series: "Mascot",
        quote: "Keep talking about my ass!",
        sex: "Intersex",
        gender: "Agender",
        pronouns: "They/Them",
        personality: "Temperamental",
        common_tags: "[]",
        trivia: "[]",
        footnotes: "[]",

    }
]

var characters = []

dummyResults.forEach(entry => {
    characters.push(parseCharacterData(entry))
});

// ==========================
// ===== Data Functions =====
// ==========================

function parseCharacterData(characterData){
    // Empty Character
    characterObject = {}

    // Relational Data
    characterObject.id = characterData.id
    characterObject.revision = characterData.revision
    characterObject.parent_id = characterData.parent_id
    // Filter Data
    characterObject.is_nsfw = characterData.is_nsfw
    characterObject.is_kinky = characterData.is_kinky
    // Aesthetic Data
    characterObject.colors = JSON.parse(characterData.colors)
    // Functional Data
    characterObject.gallery_tag = characterData.gallery_tag
    // Visual Data
    characterObject.palette = JSON.parse(characterData.palette)
    characterObject.image_data = JSON.parse(characterData.image_data)
    characterObject.icon_src = characterData.icon_src
    // Flavor Data
    characterObject.name = characterData.name
    characterObject.desc = characterData.desc
    characterObject.debut_year = characterData.debut_year
    characterObject.aliases = JSON.parse(characterData.aliases)
    characterObject.series = characterData.series
    characterObject.quote = characterData.quote
    characterObject.sex = characterData.sex
    characterObject.gender = characterData.gender
    characterObject.pronouns = characterData.pronouns
    characterObject.personality = characterData.personality
    characterObject.common_tags = JSON.parse(characterData.common_tags)
    characterObject.trivia = JSON.parse(characterData.trivia)
    characterObject.footnotes = JSON.parse(characterData.footnotes)

    return characterObject
}

function searchForCharacter(key,value){
    //TODO: Only allow specific search keys
    //Probs "Stringy" ones only
    results = []
    
    //TODO: Specific searches for specific key types
    //if string
    characters.forEach((character,index) => {
        if (character[key].toLowerCase().includes(value.toLowerCase())) results.push(index)
    });
    //if array (of strings)
    return(results)
}

// =============================
// ===== Display Functions =====
// =============================

function displayCharacterInfo(charID){
    document.title = `${characters[charID].name.toLowerCase()} - oc gallery - snapps.dev`

    // Clear everything
    clearCharInfo()
    
    // Set up info
    setupCharInfo(charID)

    // Set up gallery
    setupCharGallery(characters[charID].image_data)
    
    // Make page visible
    document.getElementById("search").style.display = "none"
    document.getElementById("information").style.display = "flex"
}

function displaySearch(){
    document.title = `oc gallery - snapps.dev`
    document.getElementById("search").style.display = "flex"
    document.getElementById("information").style.display = "none"
}

function clearCharInfo(){
    Array.from(document.getElementById("information").children).forEach(ele => {ele.remove()})
}

function setupCharInfo(charID){

    char = characters[charID]

    // Let's set it up by summary
    // Name and desc first, of course
    // *Hypothetically*, since I'm planning on stuffing everything in a JSON, I could make every character have a JSON object with whatever I please
    // Though that would make the api inconsistent + look ugly :(
    // Thus, I'll settle for uniquely sorting every aspect on the fly
    // Anyways...

    // Name + Desc
    var name = document.createElement("h1")
    name.innerHTML = char.name
    var quote = document.createElement("p")
    quote.innerHTML = char.quote
    var desc = document.createElement("p")
    desc.innerHTML = char.desc

    var infoElement = document.getElementById("information")
    infoElement.append(name)
    infoElement.append(quote)
    infoElement.append(desc)

    // Pre-defined summaries to add
    var summaries = {
        personal:[],
        alternatForms:[], //gonna have to do some calc for tis
        trivia:[],
        footnotes:[],
        metadata:[],
    }

    if (char.quote) //frontmatter
    if (char.aliases) //frontmatter
    if (char.sex) //personal
    if (char.gender) //personal
    if (char.pronouns) //personal
    if (char.personality) //personal
    if (char.debut_year) //metadata
    if (char.series) //metadata
    if (char.common_tags) //metadata
    if (char.trivia) //trivia
    if (char.footnotes) //footnotes

    // Build summaries
    for (const key in summaries) {
        if (summaries[key].length < 1) continue;

        //
        var detailsElement = document.createElement("details")
        var summaryElement = document.createElement("summary")
        summaryElement.innerHTML = key
        detailsElement.append(summaryElement)

        object[key].forEach(element => {
            
        });
        
        // Add to page
        infoElement.append(detailsElement)
    }

}

function setupCharGallery(galleryData){
}

function fillSearchPage(charIDs){
        charIDs.forEach( id => {
        createSearchButton(id)
    });

}

function clearNavTabs(){
    var firstTabSkipped = false
    var tabs = document.getElementById("nav-cont").children
    Array.from(tabs).forEach(tab => {
        if (firstTabSkipped) tab.remove()
        firstTabSkipped=true
    });
}

function clearSearchButtons(){
     var buttons = document.getElementById("search-results").children
    Array.from(buttons).forEach(btn => {
        btn.remove()
    });
}

function createNavTab(charID){
    var tabObject = document.createElement("a")
    tabObject.classList.add("nav-icon")
    tabObject.style.setProperty("--hoverColor",characters[charID].colors[0])

    // Icon
    var tabIcon = document.createElement("img")
    tabIcon.src=characters[charID].icon_src
    tabObject.append(tabIcon)

    // Name
    var tabName = document.createElement("span")
    tabName.innerHTML=characters[charID].name
    tabObject.append(tabName)

    tabObject.addEventListener('click',function() { displayCharacterInfo(charID) } )
    document.getElementById("nav-cont").append(tabObject)
}

function createSearchButton(charID){
    var tabObject = document.createElement("a")
    tabObject.classList.add("search-icon")
    tabObject.style.setProperty("--hoverColor",characters[charID].colors[0])

    // Icon
    var tabIcon = document.createElement("img")
    tabIcon.src=characters[charID].icon_src
    tabObject.append(tabIcon)

    // Name
    var tabName = document.createElement("span")
    tabName.innerHTML=characters[charID].name
    tabObject.append(tabName)

    tabObject.addEventListener('click',function() { displayCharacterInfo(charID) })
    document.getElementById("search-results").append(tabObject)
}

function submitSearch(){
    var match =[]
    // TODO: Add more keys to search
    // TODO: Implement autocomplete; probs involves sampling the data for unique values

    // Name
    var nameSearch = document.getElementById("search-name").value
    match = searchForCharacter("name",nameSearch)

    // 
    confirmCharacters(match)
}
// This is the function that calls the displays functions
// To be called after every search
function confirmCharacters(charIDs){
    // Clear page
    clearNavTabs()
    clearSearchButtons()

    // Add stuff
    // - Search Page
    fillSearchPage(charIDs)
    
    // - Tabs
    charIDs.forEach( id => {
        createNavTab(id)
    });
}

console.log(characters)

// ===========================
// ===== Init Page Setup =====
// ===========================



// Get all characters
confirmCharacters(searchForCharacter("name",""))

// Show Search Page
displaySearch()