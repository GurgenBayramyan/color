const cols = document.querySelectorAll(".col");
let btn = document.querySelectorAll('button');
btn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        if(btn.innerHTML === `<i class="fa-solid fa-lock-open"></i>`){
        btn.innerHTML = `<i class="fa-solid fa-lock"></i>`
    }else{
        btn.innerHTML = `<i class="fa-solid fa-lock-open"></i>`
    }
    })

})
document.addEventListener("click",(e)=>{
    const type = e.target.dataset.type;
    if(type === "coppy"){
        coppyToclick(e.target.textContent)
    }
})
document.addEventListener("keydown",(e)=>{
    e.preventDefault()
    if(e.code === "Space"){
        setRandomColors()
    }
})
function gerenerateRandomColor(){
    const hexCodes = "0123456789ABCDEF";
    let color = "";
    for(let i = 0; i < 6;i++){
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return "#" + color
}
function setRandomColors(isInitical){
    const colors = isInitical ? getColorsFromHash(): [];
    cols.forEach((col,index) =>{
        const text = col.querySelector("h2");
        const button = col.querySelector("button");
        
        if(button.innerHTML === `<i class="fa-solid fa-lock"></i>`){
            colors.push(text.textContent)
            return
        }

        const color =  isInitical ? colors[index] : gerenerateRandomColor();
        if(!isInitical){
            colors.push(color)
        }
        
        text.textContent = color;
        col.style.background = color;
       

        setTextColor(text,color)
        setTextColor(button,color)
    })
    updateColorsHash(colors)
}
function coppyToclick(text){
   return navigator.clipboard.writeText(text)
}
function setTextColor(txt,color){

    const luminance = chroma(color).luminance();
    txt.style.color = luminance > 0.5 ? "black" : "white"
}
function updateColorsHash(colors = []){
    document.location.hash = colors.map((col)=>{
        return col.substring(1)
    }).join("_")
}
function getColorsFromHash(){
    if(document.location.hash.length > 1){
       return document.location.hash
       .substring(1)
       .split("_")
       .map(color => "#" + color)
    }
    return []
}
setRandomColors()