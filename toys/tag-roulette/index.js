 // if you are familiar with js (which I have a feeling that you may be if you're here)
 // this is where all your tags are stored
 var tags = {

 }
 // every tag objects is in the format [tag name]:{l:[tag 'spice']}
 // upon typing that, i feel very dumb; theres a WAY better and easier way to hold that data smh my head...
 // omfg...... i'll get to that when i can...

 // initially there was a difficulty attribute to tags that would used to filter out tags that wouldn't fit
 // in the given timeframe 
 var diff = 1

 // not sure what this was for
 //var tag = 1

 var tagList = []

 // timer calculation
 var timeGiven = 1000 * 60 * diff

 var rolls = 0
 var bgColor = "#202020";

 function toggleTagPool() {
     document.getElementById("tag-pool").classList.contains("closed") ? document.getElementById("tag-pool")
         .classList.remove("closed") : document.getElementById("tag-pool").classList.add("closed")

 }

 function updateTagPoolPool() {
     document.getElementById("tag-pool").innerHTML = ""
     tagList.forEach(tag => {
         var element = `<span class="tag" data-spice="${tags[tag].l}">${tag}</span>`
         document.getElementById("tag-pool").innerHTML += element
     });
 }

 function updateTagPool() {
     tagList = []

     tag = parseInt(document.getElementById("lvl").value);
     diff = parseInt(document.getElementById("diff").value);
     timeGiven = 1000 * 60 * diff
     document.getElementById("timeBar").max = timeGiven

     for (const key in tags) {
         if (tags[key].l > tag) continue
         tagList.push(key)
     }

     tagList.sort()
     //console.log(tagList)
     document.getElementById("tag-count").innerHTML = tagList.length
     updateTagPoolPool()
     if (tagList.length == 0) document.getElementById("uRoll").disabled = true;
     else document.getElementById("uRoll").disabled = false;
 }

 var date
 var selTag = ""

 function rollTagUniform() {
     var newTag = tagList[Math.floor(Math.random() * tagList.length)]
     while (newTag == selTag) {
         newTag = tagList[Math.floor(Math.random() * tagList.length)]
     }
     rolls++
     selTag = newTag
     document.getElementById("result").innerHTML = selTag
     document.getElementById("rerolls").innerHTML = rolls
     date = new Date
     document.getElementById("date").innerHTML = date.toUTCString()
     document.getElementById("startTimerBtn").disabled = false

 }

 var timer;

 function startTimer() {

     Array.from(document.getElementsByTagName("button")).forEach(element => {
         element.disabled = true
     });

     document.getElementById("pauseTimer").disabled = false
     document.getElementById("startTimerBtn").disabled = false


     document.getElementById("startTimerBtn").onclick = stopTimer
     document.getElementById("startTimerBtn").innerText = "Stop Timer"
     timer = window.setInterval(decTime, 1000)
     document.getElementById("timeBar").value = timeGiven
     var time = Date
     document.getElementById("elapsedTime").innerText = ((1000 * 60 * diff - timeGiven) / 1000).toString()
         .toHHMMSS()


 }

 function stopTimer() {
     window.clearTimeout(timer)
     document.getElementById("pauseTimer").disabled = true
     document.getElementById("startTimerBtn").disabled = true
     document.getElementById("elapsedTime").style.color = timeUpShown ? "rgba(255, 145, 0, 1)" : "#9f0"

 }

 function pauseTime() {
     document.getElementById("pauseTimer").innerText = "Continue Timer"
     document.getElementById("pauseTimer").onclick = continueTime
     document.getElementById("elapsedTime").style.color = "#08f"
     window.clearTimeout(timer)
 }

 function continueTime() {
     document.getElementById("pauseTimer").innerText = "Pause Timer"
     document.getElementById("pauseTimer").onclick = pauseTime
     document.getElementById("elapsedTime").style.color = "#eee"
     timer = window.setInterval(decTime, 1000)
 }

 var timeUpShown = false

 function decTime() {
     if (timeGiven == 0) {
         //window.clearTimeout(timer)
         timeUpShown = true
         document.getElementById("elapsedTime").style.color = "#f00"
     }

     timeGiven -= 1000
     document.getElementById("timeBar").value = timeGiven
     var time = Date
     document.getElementById("elapsedTime").innerText = (((1000 * 60 * diff - timeGiven) / 1000).toString()
         .toHHMMSS())


 }

 String.prototype.toHHMMSS = function () {
     var sec_num = parseInt(this, 10); // don't forget the second param
     var hours = Math.floor(sec_num / 3600);
     var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
     var seconds = sec_num - (hours * 3600) - (minutes * 60);

     if (hours < 10) {
         hours = "0" + hours;
     }
     if (minutes < 10) {
         minutes = "0" + minutes;
     }
     if (seconds < 10) {
         seconds = "0" + seconds;
     }
     return hours + ':' + minutes + ':' + seconds;
 }

 function parseFile(data) {
     var tagsFound = 0
     var pretags = data.split(';')
     console.log(pretags)
     for (let index = 0; index < pretags.length; index++) {
        //console.log(pretags[index])
         pretags[index].replace(/ /g, "")
         if (pretags[index] == "") continue
         var tagParts = pretags[index].split(",")
         tags[tagParts[0]] = {
             l: parseInt(tagParts[1])
         }
         tagsFound++
     }

     updateTagPool()
     document.getElementById("tag-file-btn-lbl").innerText = `${Object.keys(tags).length} tags loaded!`

 }

 async function readTagsFromText() {
     var userIn = prompt().replace(/ /g,"")
     //console.log(userIn)
     parseFile(userIn)
     document.getElementById("tag-file-btn-lbl").style.animation = ""
     promptUserToSave();

 }

 function promptUserToSave() {
     document.getElementById("saveBtn").style.animation = "bounce 1s linear infinite "

 }


 function saveToCookies() {
     document.getElementById("saveBtn").style.animation = ""

     if (confirm("This will store your tags + background color in your cookies for a year since the last time you visit this site. Are you sure?"))
         var date = new Date()
     date.setFullYear(date.getFullYear() + 1)
     document.cookie = `tags=${JSON.stringify(tags)}; expires=${date.toUTCString()}`
     document.cookie = `bgColor=${bgColor}; expires=${date.toUTCString()}`
 }

 function readFromCookies() {
     const tagRegex = /tags=({.+})/g;
     var results = tagRegex.exec(document.cookie)
     //console.log(results)
     //if cookie exists...
     if (results) {
         //console.log("cookie found! yum!")
         tags = JSON.parse(results[1])
         var date = new Date()
         date.setFullYear(date.getFullYear() + 1)
         document.cookie = `tags=${JSON.stringify(tags)}; expires=${date.toUTCString()}`;
         if (Object.keys(tags).length) document.getElementById("tag-file-btn-lbl").innerText = `${Object.keys(tags).length} tags loaded!`
        document.getElementById("tag-file-btn-lbl").style.animation = ""


     }

     const bgRegex = /bgColor=(#.{6})/g;
     var results = bgRegex.exec(document.cookie)
     //console.log(results)
     //if cookie exists...
     if (results) {
         //console.log("cookie found! yum!")
         bgColor = results[1]
         var date = new Date()
         date.setFullYear(date.getFullYear() + 1)
         document.querySelector(':root').style.setProperty('--bgColor', bgColor);

         document.cookie = `bgColor=${bgColor}; expires=${date.toUTCString()}`
     }
 }

 async function exportTags() {
     if (confirm("this will export the tags to your clipboard. continue?")) {
         var outstr = ""
         const tagsRegex = /"([A-z|_]+)":{"l":(\d+)}/gm
         var results = [...JSON.stringify(tags).matchAll(tagsRegex)]
         results.forEach((tag) => {
             outstr += `${tag[1]},${tag[2]};\n`
         })
         try {
             await navigator.clipboard.writeText(outstr);
         } catch (error) {
             console.error(error.message);
             alert("oops... something went wrong while putting the tags in your clipboard...")
         }
     }
     // parse 

     // send to clipboard
 }

 function changeBGColor() {
     const hexRegex = /^#[A-F|a-f|0-9]{6}$/
     var userin = prompt("enter the desired color in 6-digit hex format:", "#202020");
     var results = hexRegex.exec(userin)
     //console.log(results)

     if (!results) {
         alert("invalid color entered")
     } else {
         bgColor = results[0]
         document.querySelector(':root').style.setProperty('--bgColor', bgColor);
     }
     promptUserToSave();

 }

 // setup stuffs
 document.getElementById("tag-file-btn-lbl").style.animation= "bounce 1s linear infinite "
 document.getElementById("jswarn").remove() //js warning
 document.getElementById("startTimerBtn").disabled = true
 document.getElementById("pauseTimer").disabled = true
 //document.getElementById("tag-file-btn").addEventListener("change", readFile);
 readFromCookies();
 updateTagPool()
