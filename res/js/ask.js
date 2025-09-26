const MAX_QUESTION_LENGTH = 256;
document.getElementById("sender-question").setAttribute('maxLength', MAX_QUESTION_LENGTH)

var characters = {
    //"example":{"name":"example","theme":"#9f0","icon":"","desc":"a test char"},
    "snapps": {
        "name": "Snapps",
        "theme": "linear-gradient(270deg,#f0f,#0ff)",
        "icon": "",
        "desc": "That's me! Hello!"
    },
    "savak": {
        "name": "Savak",
        "theme": "#9f6dbd",
        "icon": "",
        "desc": "Ugh, what do *you* want?"
    },
    "snavak": {
        "name": "Snavak",
        "theme": "#9f6dbd",
        "icon": "",
        "desc": "Oh? A question for me? How delightful!"
    },
    "emma": {
        "name": "Emma",
        "theme": "#d993a1",
        "icon": "",
        "desc": "*Shy crocodile noises*"
    },
    "claire": {
        "name": "Claire",
        "theme": "#8dbc53",
        "icon": "",
        "desc": "Hi! Hi! Hello! :3"
    },
    "quinn": {
        "name": "Quinn",
        "theme": "#2dbaa1",
        "icon": "",
        "desc": ". . ."
    },
}



for (character in characters) {
    char = characters[character]
    const datalistOpt = document.createElement("option")
    datalistOpt.value = char.name
    //document.getElementById("characterList").appendChild(datalistOpt)

    const charChip = document.createElement("span")
    charChip.className = "char-chip"
    charChip.innerText = char.name;
    charChip.style.background = char.theme;
    document.getElementById("char-chips").appendChild(charChip)
    charChip.setAttribute('onClick', "charChipClick('" + char.name + "')")
    charChip.addEventListener("click", function () {})
}

//Add onChange event listener to the recipient field

function checkRecip(currentChar) {
    if (currentChar.toLowerCase() in characters) charRecognized(currentChar.toLowerCase())
    else {
        clearCharTab()
    }
}

function charRecognized(char) {
    const character = characters[char]
    console.log("Charater Recognized: " + character.name)
    fillCharTab(character)
}

function updateCharCount(input) {
    var inputLength = input.length
    node = document.createElement("span")
    charsLeft = MAX_QUESTION_LENGTH - inputLength
    node.innerText = charsLeft
    document.getElementById("char-count").replaceChildren(node)
    if (charsLeft / MAX_QUESTION_LENGTH < .1) node.style.color = "red";
    else if (charsLeft / MAX_QUESTION_LENGTH < .25) node.style.color = "orange";
    else if (charsLeft / MAX_QUESTION_LENGTH < .5) node.style.color = "yellow";
    else node.style.color = "#333";
    //else if 
}

function charChipClick(charName) {
    document.getElementById("recipient-field").value = charName;
    checkRecip(charName)
}

function fillCharTab(character) {
    document.getElementById("char-tab").innerHTML = character.desc
    document.getElementById("char-tab").style.height = "150px";
    document.getElementById("char-tab").style.margin = "unset";
    document.getElementById("char-tab").style.setProperty("--bg",character.theme);
}

function clearCharTab() {
    document.getElementById("char-tab").innerText = null
    document.getElementById("char-tab").style.height = "0px";
    document.getElementById("char-tab").style.margin = "0px";
}
clearCharTab()