function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var gameIsTrue = false;

function clearTime() {
    console.log("Game over");
    var z = clearInterval(timer);
    gameIsTrue = true;
};

const counter = document.querySelector('.counter');
counterNumber = 0;
const theWholeTable = document.querySelector('.table');
var tableSquareVertSize = 15;
var tableSquareHorizonSize = 14;
var variableCreateStringInTable = 0;
var variableAlternateString = 0;

var noneActiveElement = '<div class="noneActiveElement"></div>'
var activeElement = '<div class="activeElement"></div>'

while(variableCreateStringInTable < tableSquareVertSize){
    theWholeTable.innerHTML += `<div class="string"></div>`;
    variableCreateStringInTable++;
};
const tableString = document.querySelectorAll('.string');


while(variableAlternateString < tableSquareVertSize) {
    let variableCreateItemInString = 0;
    while(variableCreateItemInString < tableSquareHorizonSize){
        tableString[variableAlternateString].innerHTML += `<div class="item" id="id_${variableCreateItemInString}_${variableAlternateString}">${noneActiveElement}</div>`
        variableCreateItemInString++;
    };
    variableAlternateString++;
};
const item = document.querySelectorAll('.item');


var state = {
    positionActiveElement: "",
    coordinatesAllFallElements: [{top: 15, left: 15}],
    directionActiveFigure: 0,
    shapeActiveFigure: "snake",
};


