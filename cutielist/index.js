
const delay = ms => new Promise(res => setTimeout(res, ms));
async function createCard(icon, name, subname, series, desc, color = "", tributes = "") {
    
    card = document.createElement("a");
    card.classList.add("card")
    if (icon == "") icon = "placeholder.png";
    card.innerHTML =
        `<img src=\"img/cards/` + icon + `\" alt=\"\" draggable=\"false\" style=\"transition: 0.5s; transform: rotateY(0deg) rotateX(0deg);\">
    <span>` + name + `</span>
    <span>` + subname + `</span>`
    cardData = new JSON.constructor()
    
    cardData.name = name
    cardData.subname = subname
    cardData.series = series
    cardData.desc = desc
    if (color != "") {cardData.color = color}
    if (tributes.length > 5 ) {   
        cardData.tributes = [...tributes.match(/[\S]+\..{3}/g)];
    }
    card.dataset['info'] = JSON.stringify(cardData)
    addFX(card)
    await cardlistContainer.appendChild(card);
}

function addFX(card) {
    card.onmousemove = cursorMove;
    card.onmouseleave = cursorOut;
    card.onclick = focusCard;

}

//Card Hover Stuff
magRadius = 100

function a(x, y) {
    if (x >= 0) {
        return Math.atan(y / x)
    } else {
        return Math.atan(y / x) + Math.PI
    }
}

function cursorOut(e) {
    e.originalTarget.children[0].style.transform = "rotateY(0deg) rotateX(0deg)";
    e.originalTarget.children[0].style.transition = ".5s";
}

function cursorMove(e) {
    if (e.target.tagName == "IMG") {
        parent = e.originalTarget.offsetParent
        cursorX = e.clientX
        cursorY = e.clientY
        dx = cursorX - (parent.offsetWidth / 2 + parent.offsetLeft)
        dy = cursorY - (parent.offsetHeight / 2 + parent.offsetTop) + document.getElementById("cardlist-container").scrollTop
        angle = a(dx, dy)
        mag = Math.min(magRadius, Math.sqrt(dx * dx + dy * dy))
        xMag = mag / magRadius * Math.cos(angle)
        yMag = mag / magRadius * Math.sin(angle)

        parent.children[0].style.transition = ".1s";
        parent.children[0].style.transform = "rotateY(" + 20 * xMag + "deg) rotateX(" + 20 * -yMag + "deg)";
    }
}



async function focusCard(e) {
    if (infoOpen) {
        cardFocusElement.style.animation = "fade 1s ease-in-out forwards"
        await delay(500);
    }

    //Load Stuff
    data = JSON.parse(e.originalTarget.offsetParent.dataset['info'])
    if ("color" in data) {
        cardName.style.color = data['color']
        cardName.style.textShadow = "0 0 .1em " + data['color']
    } else {
        cardName.style.color = "#eee"
        cardName.style.textShadow = ""
    }

    cardTributes.innerHTML = ""
    if ("tributes" in data) {
        data['tributes'].forEach(element => {
            cardTributes.innerHTML += '<a href="' + element + '" target="_blank"><img src="' + element + '"></a>'
        });
    }

    cardName.innerHTML = data['name']
    cardSubname.innerHTML = data['subname']
    cardSeries.innerHTML = data['series']
    cardDesc.innerHTML = data['desc']

    // Open Menu
    infoOpen = true
    cardFocusElement.classList.add("active")
    await delay(500);
    cardFocusElement.style.animation = ""
}

function closeInfo() {
    infoOpen = false

    cardFocusElement.classList.remove("active")
}

async function loadCutieList(){
    cutieListJSON = ""
    loadCutieListRequest = {
        method: 'GET',
        headers: {
            cookie: 'NID=514%3DQBmNTolaX6gmlOwAatUJ3CwxaaI_XMnqjbE587cxyRQrJb9UBWQ7DF7eB439EFj4mD3zbLM33NHlEVW41uox7VAyeujwnJanTdWo987briFLNYw0IIQ_GR6FHc0S_RVeo2eD3ORNDNW3BoRVMQLxomhY1mNWBTJnoQw3AQXKz0w'
        }
    };

    await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSswUuFvTWxF0klI5Up5wfSPjN6bpCu6A2GGBWkFUnn7gb4QtfP58BPTXdy8MLIsEHsEUjQ0-775xp7/pub?output=csv', loadCutieListRequest)
        .then(response => response.text())
        .then(text => {cutieListJSON=csvJSON(text)})
        .catch(err => console.error(err));

        cutieListJSON.forEach(cutie => {
            createCard(cutie.Image,cutie.Name,cutie.Subname,"<i>"+cutie.Source+"</i>","",cutie.Color,cutie["Tributes\r"])
            
        });

}

//From https://stackoverflow.com/questions/27979002/convert-csv-data-into-json-format-using-javascript
function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    //return result; //JavaScript object
    return result; //JSON
  }