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
        // Flavor Data
        name: "Savak",
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
        // Flavor Data
        name: "Snavak",
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

    }
]

var charaters = []

// ==========================
// ===== Data Functions =====
// ==========================

function parseCharacterData(charaterData){
    // Empty Character
    charaterObject = {}

    // Relational Data
    charaterObject.id = charaterData.id
    charaterObject.revision = charaterData.revision
    charaterObject.parent_id = charaterData.parent_id
    // Filter Data
    charaterObject.is_nsfw = charaterData.is_nsfw
    charaterObject.is_kinky = charaterData.is_kinky
    // Aesthetic Data
    charaterObject.colors = JSON.parse(charaterData.colors)
    // Functional Data
    charaterObject.gallery_tag = charaterData.gallery_tag
    // Visual Data
    charaterObject.palette = JSON.parse(charaterData.palette)
    charaterObject.image_data = JSON.parse(charaterData.image_data)
    // Flavor Data
    charaterObject.name = charaterData.name
    charaterObject.debut_year = charaterData.debut_year
    charaterObject.aliases = JSON.parse(charaterData.aliases)
    charaterObject.series = charaterData.series
    charaterObject.quote = charaterData.quote
    charaterObject.sex = charaterData.sex
    charaterObject.gender = charaterData.gender
    charaterObject.pronouns = charaterData.pronouns
    charaterObject.personality = charaterData.personality
    charaterObject.common_tags = JSON.parse(charaterData.common_tags)
    charaterObject.trivia = JSON.parse(charaterData.trivia)
    charaterObject.footnotes = JSON.parse(charaterData.footnotes)

    return charaterObject
}

function searchForCharacter(key,value){
    //TODO: Only allow specific search keys
    //Probs "Stringy" ones only
    results = []
    
    //TODO: Specific searches for specific key types
    //if string
    charaters.forEach((character,index) => {
        if (character[key].toLowerCase().includes(value.toLowerCase())) results.push(index)
        
    });
    //if array (of strings)
    return(results)
}

// =============================
// ===== Display Functions =====
// =============================

function displayCharacter(id){

}

dummyResults.forEach(entry => {
    charaters.push(parseCharacterData(entry))
});

console.log(charaters)

