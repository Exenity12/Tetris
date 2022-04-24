var arrayString = [];
var arrayTable = [];

function startGame() {
  console.log("Start!");
  let petem = 0;
  while(petem < tableSquareVertSize){
    let mepet = 0;
    var arrayString = [];
    while(mepet < tableSquareHorizonSize){
      arrayString.push(document.querySelector(`#id_${mepet}_${petem}`))
      mepet++;
    };
    arrayTable.push(arrayString);
    petem++;
  }
  timer = setInterval(moveActiveFigure, 500);
};

function moveActiveFigure() {
  arrayTable[state.PositionActiveElementOne.top][state.PositionActiveElementOne.left].innerHTML = "0";
  arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML = "0";
  state.PositionActiveElementOne.top++;
  state.PositionActiveElementTwo.top++;
  if(checkDropOnAnotherElement()){
    return;
  };
  arrayTable[state.PositionActiveElementOne.top][state.PositionActiveElementOne.left].innerHTML = "1";
  arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML = "1";
  nextElement();
};


function checkDropOnAnotherElement(){
  if(arrayTable[state.PositionActiveElementOne.top][state.PositionActiveElementOne.left].innerHTML == "1" || arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML == "1"){
    state.PositionActiveElementOne.top--;
    state.PositionActiveElementTwo.top--;
    arrayTable[state.PositionActiveElementOne.top][state.PositionActiveElementOne.left].innerHTML = "1";
    arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML = "1";
    state.coordinatesAllFallElements.push(state.PositionActiveElementOne);
    state.coordinatesAllFallElements.push(state.PositionActiveElementTwo);
    state.PositionActiveElementOne = {top: 0, left: 7};
    state.PositionActiveElementTwo = {top: 0, left: 8};
    return;
  };
};


 

function nextElement() {
  if(state.PositionActiveElementOne.top == 14 || state.PositionActiveElementTwo.top == 14){
    state.coordinatesAllFallElements.push(state.PositionActiveElementOne);
    state.coordinatesAllFallElements.push(state.PositionActiveElementTwo);
    state.PositionActiveElementOne = {top: 0, left: 7};
    state.PositionActiveElementTwo = {top: 0, left: 8};
    fall();
  };
}


function fall() {
  let numberString = 0;
  while(numberString < tableSquareVertSize){
    newArray = state.coordinatesAllFallElements.filter(item => item.top == numberString);
    if(newArray.length >= 14){
      console.log(numberString, " удалить эту строку");
      let numberElement = 0;
      while(numberElement < state.coordinatesAllFallElements.length){
        if(state.coordinatesAllFallElements[numberElement].top == numberString){
          state.coordinatesAllFallElements.splice(numberElement, 1);
          numberElement--;
        };
        numberElement++;
      };
      let deleteOne = 0;
      while(deleteOne < tableSquareHorizonSize){
        arrayTable[numberString][deleteOne].innerHTML = "0";
        deleteOne++;
      };
      let moveString = 0;
      while(moveString < state.coordinatesAllFallElements.length){
        if(state.coordinatesAllFallElements[moveString].top <= numberString){
          arrayTable[state.coordinatesAllFallElements[moveString].top][state.coordinatesAllFallElements[moveString].left].innerHTML = "0";
          state.coordinatesAllFallElements[moveString].top++;
          arrayTable[state.coordinatesAllFallElements[moveString].top][state.coordinatesAllFallElements[moveString].left].innerHTML = "1";
        };
        moveString++;
      };
    };
    numberString++;
  };
};


function moveLeft() {
  arrayTable[state.PositionActiveElementOne.top][state.PositionActiveElementOne.left].innerHTML = "0";
  arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML = "0";
  state.PositionActiveElementOne.left--;
  state.PositionActiveElementTwo.left--;
  if(state.PositionActiveElementOne.left == -1 || arrayTable[state.PositionActiveElementOne.top][state.PositionActiveElementOne.left].innerHTML == "1"){
    state.PositionActiveElementOne.left++;
    state.PositionActiveElementTwo.left++;
  };
  arrayTable[state.PositionActiveElementOne.top][state.PositionActiveElementOne.left].innerHTML = "1";
  arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML = "1";
};

function moveRight() {
  arrayTable[state.PositionActiveElementOne.top][state.PositionActiveElementOne.left].innerHTML = "0";
  arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML = "0";
  state.PositionActiveElementOne.left++;
  state.PositionActiveElementTwo.left++;
  if(state.PositionActiveElementTwo.left == 14 || arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML == "1"){
    state.PositionActiveElementOne.left--;
    state.PositionActiveElementTwo.left--;
  };
  arrayTable[state.PositionActiveElementOne.top][state.PositionActiveElementOne.left].innerHTML = "1";
  arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML = "1";
};


function moveTurn(){
  arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML = "0";
  state.PositionActiveElementTwo.left--;
  state.PositionActiveElementTwo.top++;
  arrayTable[state.PositionActiveElementTwo.top][state.PositionActiveElementTwo.left].innerHTML = "0";
}













