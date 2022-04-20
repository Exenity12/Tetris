function startGame() {
  console.log("Start!");
  timer = setInterval(moveActiveFigure, 500);
  createNewElement();
};

function moveActiveFigure() {
  state.activeElement = document.querySelector(`#${"id_0" + state.idActiveFigure}`);
  state.childOfActiveFigure = state.activeElement.querySelectorAll(`.itemElementOfFigure`);
  state.coordinatesActiveElement.top += 40;
  if(checkingTheDropOfElement()){
    return;
  };
  state.activeElement.style.left = state.coordinatesActiveElement.left + "px";
  state.activeElement.style.top = state.coordinatesActiveElement.top + "px";
  if(state.childOfActiveFigure.length){
    if(checkingTheDrop()){
      return;
    };
  };
};

function moveLeft(){
  state.coordinatesActiveElement.left -= 40;
  spotItIsTable(40);
  state.activeElement.style.left = state.coordinatesActiveElement.left + "px";
}

function moveRight(){
  state.coordinatesActiveElement.left += 40;
  spotItIsTable(-40);
  state.activeElement.style.left = state.coordinatesActiveElement.left + "px";
}

function spotItIsTable(reRun) {
  if(state.coordinatesActiveElement.left > 360 || state.coordinatesActiveElement.left < 0){
    state.coordinatesActiveElement.left += reRun;
  };
};

function nextElement(){
  state.numberOfStyleFigure = 0;
  state.idActiveFigure++;
  state.coordinatesActiveElement = {top: -40, left: 120};
  deleteString();
};

function fillingTheArray(){
  let n = 0
  while(n < 4){
    state.coordinatesAllFallElements.push(state.childOfActiveFigure[n]);
    n++;
  };
};

function checkingTheDropOfElement(){
  state.idActiveElement = 0;
  while(state.idActiveElement < state.childOfActiveFigure.length){
    if(checkingFallTheElement()){
      return true;
    }; 
    state.idActiveElement++; 
  };
  return false;
};

function checkingFallTheElement(){
  if(state.childOfActiveFigure[state.idActiveElement].getBoundingClientRect().y >= 560){
    state.coordinatesActiveElement.top -= 40;
    fillingTheArray()
    nextElement();
    return true;
  } else {
    return false;
  };
};



function checkingTheDrop(){
  state.idActiveElement = 0;
  while(state.idActiveElement < state.childOfActiveFigure.length){
    var numberOfSearchItem = 0;
    while(numberOfSearchItem < state.coordinatesAllFallElements.length){
      if((state.childOfActiveFigure[state.idActiveElement].getBoundingClientRect().y == state.coordinatesAllFallElements[numberOfSearchItem].getBoundingClientRect().y &&
        state.childOfActiveFigure[state.idActiveElement].getBoundingClientRect().x == state.coordinatesAllFallElements[numberOfSearchItem].getBoundingClientRect().x)){
        state.coordinatesActiveElement.top -= 40;
        state.activeElement.style.top = state.coordinatesActiveElement.top + "px";
        fillingTheArray()
        nextElement();
        return true;
      };
      numberOfSearchItem++;
    }
  state.idActiveElement++;
  };
  return false;
};


function deleteString(){
  var numberOfFindString = 0;
  while(numberOfFindString < 15){
    newArray = state.coordinatesAllFallElements.filter(item => Math.round(item.getBoundingClientRect().y) == numberOfFindString * 40);
    if(newArray.length >= 10){
      newArray.forEach((item) => {item.classList = "deleteThis"});
      let h = 0;
      state.coordinatesAllFallElements.forEach((item) => {
        if(item.getBoundingClientRect().y < numberOfFindString * 40){
          item.style.top = 40 + "px";
        };
      });
    };
    numberOfFindString++;
  };
  deleteUsefullItem()
};


function deleteUsefullItem() {
  let q = 0;
  while(q < state.coordinatesAllFallElements.length){
    if(state.coordinatesAllFallElements[q].classList == "deleteThis"){
      state.coordinatesAllFallElements.splice(q, 1);
      q--;
    };
    q++;
  };
  state.coordinatesAllFallElements = state.coordinatesAllFallElements;
};


function moveTurn(){
  if(state.numberOfStyleFigure >= state.styleAllFigure[state.idActiveFigure].length){
    state.numberOfStyleFigure = 0;
  };
  state.activeElement.classList = state.styleAllFigure[state.idActiveFigure][state.numberOfStyleFigure];
  state.numberOfStyleFigure++;
}


document.addEventListener('keydown', function(event){
    if (event.code == "ArrowLeft") {
        moveLeft();
    }
});
document.addEventListener('keydown', function(event){
    if (event.code == "ArrowUp") {
        moveTurn();
    }
});
document.addEventListener('keydown', function(event){
    if (event.code == "ArrowRight") {
        moveRight();
    }
});










// while(h < state.coordinatesAllFallElements.length){
      //   if(state.coordinatesAllFallElements[h].getBoundingClientRect().y < numberOfFindString * 40){
      //     state.coordinatesAllFallElements[h].style.top = 40 + "px";
      //   };
      //   h++;
      // };


// state.coordinatesAllFallElements.forEach((item) => {
//         if(item.getBoundingClientRect().y < numberOfFindString * 40){
//           item.style.top = 40 + "px";
//         };
//       });