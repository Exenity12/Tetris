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
var tableSquareHorizonSize = 14;
var variableCreateStringInTable = 0;
var variableAlternateString = 0;


while(variableCreateStringInTable < tableSquareVertSize){
    theWholeTable.innerHTML += `<div class="string"></div>`;
    variableCreateStringInTable++;
};
const tableString = document.querySelectorAll('.string');


while(variableAlternateString < tableSquareVertSize) {
    let variableCreateItemInString = 0;
    while(variableCreateItemInString < tableSquareHorizonSize){
        tableString[variableAlternateString].innerHTML += `<div class="item" id="id_${variableCreateItemInString}_${variableAlternateString}">0</div>`
        variableCreateItemInString++;
    };
    variableAlternateString++;
};
const item = document.querySelectorAll('.item');


var state = {
    PositionActiveElementOne: {top: 0, left: 7},
    PositionActiveElementTwo: {top: 0, left: 8},
    coordinatesAllFallElements: [],
};
