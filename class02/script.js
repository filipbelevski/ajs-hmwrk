// ## Title Generator
// * Create 3 inputs:
//   * Color
//   * FontSize
//   * Text
// * Create a button for generating titles
// * When the button is clicked generate a new h1 element with the color, font size and text from the inputs

// ## List Generator
// * Create 3 inputs:
//   * Color
//   * FontSize
//   * Items
// * Create a button for generating unordered lists
// * When the button is clicked generate a new ul element with the color, font size and items from the inputs 
// > Items should be added separated by , in the input

function validateCSS (element, input) {
    if (CSS.supports(element,input)){
    }
    return true;
}

function textColor (element, color){
    if(validateCSS(element,color)){
        element.style.color = color
    }
    else{
        element.style.color = "black"
    }
}

function textSize (element, text){
    if(validateCSS(element,text)){
        element.style.fontSize = text
    }
    else{
        element.style.fontSize = "24px"
    }
}

document.getElementById("generateTitleButton").addEventListener("click", function (){
    let userColor = document.getElementById("inputColor").value;
    let userFontSize = document.getElementById("inputFontSize").value;
    let userText = document.getElementById("inputText").value;
    let newHeading = document.getElementById("newHeading");
    newHeading.innerHTML = userText
    textColor(newHeading, userColor);
    textSize(newHeading, userFontSize);
   
});

document.getElementById("generateUlButton").addEventListener("click", function (){
    let liColor = document.getElementById("ulColor").value;
    let liFontSize = document.getElementById("ulFontSize").value;
    let liItems = document.getElementById("ulInputItems").value;
    let newUl = document.createElement("ul");
    let itemsArr = [];
    itemsArr.push(liItems)
    console.log(itemsArr)
    for (let items of itemsArr){
        document.getElementById("listDiv").append(newUl)
        newUl.innerText = items
        textColor(newUl, liColor);
        textSize(newUl, liFontSize);
    }
})
