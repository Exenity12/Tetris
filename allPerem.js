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



while(idActiveFigure < allActiveFigure){
    createNewElement();
};

function createNewElement() {
    let random = getRandomIntInclusive(0, 1);
    let nextFigure;
    if(random){
        nextFigure = "horizontallyFigure";
    } else {
        nextFigure = "verticallyFigure";
    };
    allActiveElement.innerHTML += `
    <div class="${nextFigure}" id="id_0${idActiveFigure}">
        <div class="itemElementOfFigure"></div>
        <div class="itemElementOfFigure"></div>
    </div>
    `;
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
};
