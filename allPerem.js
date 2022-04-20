function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function clearTime() {
    var z = clearInterval(timer);
};


const theWholeTable = document.querySelector('.table');
var tableSquareVertSize = 15;
var tableSquareHorizonSize = 10;
var variableCreateStringInTable = 0;
var variableAlternateString = 0;
var allActiveElement = document.querySelector('.allActiveElement');
var idActiveFigure = 0;
var allActiveFigure = 15;


function createNewElement() {
    let random = getRandomIntInclusive(0, 6);
    let nextFigure;
    let styleAllFigure;
    if(random == 0){
        nextFigure = "verticallyFigure";
        styleAllFigure = ["horizantlyFigure", "verticallyFigure"];
    } else if(random == 1){
        nextFigure = "squareFigure";
        styleAllFigure = ["squareFigure"];
    } else if(random == 2){
        nextFigure = "GFigure";
        styleAllFigure = ["GFigureLeft", "GFigureDown", "GFigureRight", "GFigure"];
    } else if(random == 3){
        nextFigure = "reGFigure";
        styleAllFigure = ["reGFigureLeft", "reGFigureDown", "reGFigureRight", "reGFigure"];
    } else if(random == 4){
        nextFigure = "pyramidFigure";
        styleAllFigure = ["pyramidFigureLeft", "pyramidFigureDown", "pyramidFigureRight", "pyramidFigure"];
    } else if(random == 5){
        nextFigure = "lightningFigure";
        styleAllFigure = ["lightningFigureLeft", "lightningFigureDown", "lightningFigureRight", "lightningFigure"];
    } else if(random == 6){ 
        nextFigure = "reLightningFigure";
        styleAllFigure = ["reLightningFigureLeft", "reLightningFigureDown", "reLightningFigureRight", "reLightningFigure"];
    };
    allActiveElement.innerHTML += `
    <div class="${nextFigure}" id="id_0${idActiveFigure}">
        <div class="itemElementOfFigureOne">
            <div class="itemElementOfFigure"></div>
        </div>
        <div class="itemElementOfFigureTwo">
            <div class="itemElementOfFigure"></div>
        </div>
        <div class="itemElementOfFigureThree">
            <div class="itemElementOfFigure"></div>
        </div>
        <div class="itemElementOfFigureFour">
            <div class="itemElementOfFigure"></div>
        </div>
    </div>
    `;
    state.styleAllFigure.push(styleAllFigure);
    idActiveFigure++;
}

while(variableCreateStringInTable < tableSquareVertSize){
    theWholeTable.innerHTML += `<div class="string"></div>`;
    variableCreateStringInTable++;
};
const tableString = document.querySelectorAll('.string');


while(variableAlternateString < tableSquareVertSize) {
    let variableCreateItemInString = 0;
    while(variableCreateItemInString < tableSquareHorizonSize){
        tableString[variableAlternateString].innerHTML += `<div class="item" id="id_${variableCreateItemInString}_${variableAlternateString}"></div>`
        variableCreateItemInString++;
    };
    variableAlternateString++;
};
const item = document.querySelectorAll('.item');


var state = {
    firstPositionActiveElement: {top: -40, left: 120},
    coordinatesAllFallElements: [],
    idActiveFigure: 0,
    activeElement: "",
    coordinatesActiveElement: {top: -40, left: 120},
    childOfActiveFigure: "",
    idActiveElement: 0,
    styleAllFigure: [],
    numberOfStyleFigure: 0,
    quantityDeleteString: 1,
};

while(idActiveFigure < allActiveFigure){
    createNewElement();
};
