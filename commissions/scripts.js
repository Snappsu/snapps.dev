var i = 0;
Array.from(document.getElementsByClassName("nav-img")).forEach( (element) => {
    element.style.setProperty('rotate', Math.random()*360+"deg")
})

themes = [
    {
        "bg":"#fff",
        "cc":"#ccc",
        "cc2":"#aaa",
        "txt":"#000",
    },
    {
        "bg":"#111",
        "cc":"#333",
        "cc2":"#222",
        "txt":"#eee",
    }
]
function changeTheme(theme){
    document.querySelector(':root').style.setProperty('--bg-color', theme.bg);
    document.querySelector(':root').style.setProperty('--content-color', theme.cc);
    document.querySelector(':root').style.setProperty('--content-color2', theme.cc2);
    document.querySelector(':root').style.setProperty('--text-color', theme.txt);
}

// If dark theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    changeTheme(themes[1])
}