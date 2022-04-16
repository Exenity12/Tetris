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
  state.idActiveFigure++;
  state.coordinatesActiveElement = {top: -40, left: 120};
  // completionString();
  // deleteString();
  deleteString();
};

function fillingTheArray(){
  let n = 0
  while(n < 2){
    state.coordinatesAllFallElements.push(state.childOfActiveFigure[n]);
    n++;
  };
};

function checkingTheDropOfElement(){
  state.idActiveElement = 0;
  while(state.idActiveElement < state.childOfActiveFigure.length){
    if(state.childOfActiveFigure[state.idActiveElement].getBoundingClientRect().y >= 560){
      state.coordinatesActiveElement.top -= 40;
      fillingTheArray()
      nextElement();
      return true;
    }; 
    state.idActiveElement++; 
  };
  return false;
};

function checkingTheDrop(){
  state.idActiveElement = 0;
  while(state.idActiveElement < state.childOfActiveFigure.length){
    let b = 0;
    while(b < state.coordinatesAllFallElements.length){
      if((state.childOfActiveFigure[state.idActiveElement].getBoundingClientRect().y == state.coordinatesAllFallElements[b].getBoundingClientRect().y &&
        state.childOfActiveFigure[state.idActiveElement].getBoundingClientRect().x == state.coordinatesAllFallElements[b].getBoundingClientRect().x)){
        state.coordinatesActiveElement.top -= 40;
        state.activeElement.style.top = state.coordinatesActiveElement.top + "px";
        fillingTheArray()
        nextElement();
        return true;
      };
      b++;
    }
    state.idActiveElement++;
  };
  return false;
};

function deleteString(){
  let h = 0;
  while(h < 15){
    newArray = state.coordinatesAllFallElements.filter(item => Math.round(item.getBoundingClientRect().y) == h * 40);
    if(newArray.length >= 10){
      newArray.forEach((item) => {item.classList = "deleteThis"});
      state.coordinatesAllFallElements.forEach((item) => {
        if(item.getBoundingClientRect().y < h * 40){
          item.style.top = 40 + "px";
        };
      });
    };
    h++;
  };
};

