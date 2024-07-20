
//Creates a new window
//htmlelement container - where the window should
//string[] [xpos, ypos] - x and y where coord
//string[] [width, height] - width and height of inner content
//string title - title of window
//bool[] controlButtons - is window [minimizable,closeable]
//string icon - location of window icon image
function centerWindow(targetWindow) {
    var windowWidth=targetWindow.offsetWidth
    var windowHeight=targetWindow.offsetHeight
    var screenWidth=window.innerWidth
    var screenHeight=window.innerHeight
    targetWindow.style.left = (screenWidth-windowWidth)/2
    targetWindow.style.top = (screenHeight-windowHeight)/2-20
    console.log(windowHeight)
}

function closeWindow(targetWindow) {
    var target;
    try {
        target = targetWindow.target
        while(target.tagName!="WINDOW"){
            target=target.parentElement
        }
    } catch (error) {
        target=targetWindow;
    }
    target.remove()
    windowClosed()
    activateLastWindow()
}

function activateWindow(targetWindow) {
    var target;
    try {
        target = targetWindow.target
        while(target.tagName!="WINDOW"){
            target=target.parentElement
        }
    } catch (error) {
        target=targetWindow;
    }
    
    Array.from(document.getElementsByTagName("window")).forEach((element) => element.classList.remove("active"));
    target.classList.add("active")
    windowActivated(target)
}

 function newWindow(os, windowManager, pos, size, src="", title="New Window", controlButtons=[true,true], icon="img/icons/default.gif"){
    //window elements
    windowElement = document.createElement("window")
    
    
    //title bar setup
    titleBar = document.createElement("window-bar")
        //title bar icon  
        titleBarIcon = document.createElement("img")
        titleBarIcon.src=icon
        titleBar.appendChild(titleBarIcon)
        //title bar text  
        titleBarTitle = document.createElement("span")
        titleBarTitle.innerHTML = title
        titleBar.appendChild(titleBarTitle)
        //title bar control buttons
        if(controlButtons[0]){
            minimizeButton = document.createElement("img")
            minimizeButton.classList.add("ui-button")
            titleBar.appendChild(minimizeButton)
        }
        if(controlButtons[1]){
            closeButton = document.createElement("img")
            closeButton.classList.add("ui-button")
            closeButton.src="img/icons/exit.gif"
            closeButton.addEventListener("click", (event) => { closeWindow(event) })
            titleBar.appendChild(closeButton)
        }
        
        //add title bar to window
    windowElement.appendChild(titleBar)

    contentContainer = document.createElement("window-content")
    

    windowElement.appendChild(contentContainer)
    

    //window styling
    windowElement.style.top = pos[1]
    windowElement.style.left = pos[0]
    contentContainer.style.width = size[0]
    contentContainer.style.height = size[1]

    os.appendChild(windowElement)
    

    //When window is clicked
    windowElement.addEventListener("mousedown", (event) => { activateWindow(event) })
    windowManager.push(windowElement)
    if(src!="") loadWindow(windowElement,src)

    updateTaskbar()
    activateWindow(windowElement)
    return windowElement

}