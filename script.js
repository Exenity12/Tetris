var arrayString = [];
var arrayTable = [];
informationOfNewElement();

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
  state.positionActiveElement.forEach((item) => {
    arrayTable[item.top][item.left].innerHTML = noneActiveElement;
    item.top++;
  });
  if(checkDropOnAnotherElement()){
    return;
  };
  state.positionActiveElement.forEach((item) => {
    arrayTable[item.top][item.left].innerHTML = activeElement;
  });
  nextElement();
};


function checkDropOnAnotherElement(){
  if(state.positionActiveElement.find((item) => arrayTable[item.top][item.left].innerHTML == activeElement)){
    state.positionActiveElement.forEach((item) => {
      item.top--;
      arrayTable[item.top][item.left].innerHTML = activeElement;
      state.coordinatesAllFallElements.push(item);
      informationOfNewElement();
    });
    fall();
    return;
  };
};




function nextElement() {
  if(state.positionActiveElement.find((item) => item.top == 14)){
    state.positionActiveElement.forEach((item) => {
      state.coordinatesAllFallElements.push(item);
      informationOfNewElement();
    });
    fall();
  };
}


function fall() {
  let numberString = tableSquareVertSize;
  while(numberString > 0){
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
        arrayTable[numberString][deleteOne].innerHTML = noneActiveElement;
        deleteOne++;
      };
      let moveString = 0;
      state.coordinatesAllFallElements.sort((prev, next) => next.top - prev.top);
      while(moveString < state.coordinatesAllFallElements.length){
        if(state.coordinatesAllFallElements[moveString].top < numberString){
          arrayTable[state.coordinatesAllFallElements[moveString].top][state.coordinatesAllFallElements[moveString].left].innerHTML = noneActiveElement;
          state.coordinatesAllFallElements[moveString].top++;
          arrayTable[state.coordinatesAllFallElements[moveString].top][state.coordinatesAllFallElements[moveString].left].innerHTML = activeElement;
        };
        moveString++;
      };
    };
    numberString--;
  };
};


function moveLeft() {
  state.positionActiveElement.forEach((item) => {
    arrayTable[item.top][item.left].innerHTML = noneActiveElement;
    item.left--;
  });
  if(state.positionActiveElement.find((item) => item.left == -1 || arrayTable[item.top][item.left].innerHTML == activeElement)){
    state.positionActiveElement.forEach((item) => {
      item.left++;
    });
  };
  state.positionActiveElement.forEach((item) => {
    arrayTable[item.top][item.left].innerHTML = activeElement;
  });
};


function moveRight() {
  state.positionActiveElement.forEach((item) => {
    arrayTable[item.top][item.left].innerHTML = noneActiveElement;
    item.left++;
  });
  if(state.positionActiveElement.find((item) => item.left == 14 || arrayTable[item.top][item.left].innerHTML == activeElement)){
    state.positionActiveElement.forEach((item) => {
      item.left--;
    });
  };
  state.positionActiveElement.forEach((item) => {
    arrayTable[item.top][item.left].innerHTML = activeElement;
  });
};


function moveTurn(){
  state.directionActiveFigure++;
  if(state.directionActiveFigure >= 4){
    state.directionActiveFigure = 0;
  };


  if(state.shapeActiveFigure == "snake"){
    if(state.directionActiveFigure == 0){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].top += 2;
      state.positionActiveElement[3].left += 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 1){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].top +=2;
      state.positionActiveElement[3].left -=2;

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 2){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].top -= 2;
      state.positionActiveElement[3].left -= 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 3){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].top -= 2;
      state.positionActiveElement[3].left +=2;

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    };



  } else if(state.shapeActiveFigure == "pyramid"){
    if(state.directionActiveFigure == 0){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].top++;
      state.positionActiveElement[3].left--;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 1){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].top--;
      state.positionActiveElement[3].left--;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 2){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].top--;
      state.positionActiveElement[3].left++;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 3){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].top++;
      state.positionActiveElement[3].left++;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    };



  } else if(state.shapeActiveFigure == "lightning"){
    if(state.directionActiveFigure == 0){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].top += 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 1){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].left -= 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 2){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].top -= 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 3){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].left += 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    };



  } else if(state.shapeActiveFigure == "reverseLightning"){
    if(state.directionActiveFigure == 0){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].left -= 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 1){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].top -= 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 2){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].left += 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 3){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].top += 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    };


  } else if(state.shapeActiveFigure == "horse"){
    if(state.directionActiveFigure == 0){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].top += 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 1){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].left -= 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 2){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].top -= 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 3){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].left += 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    };


  } else if(state.shapeActiveFigure == "reverseHorse"){
    if(state.directionActiveFigure == 0){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].left -= 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 1){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top++; 
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top--;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].top -= 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 2){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left--;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left++;
      state.positionActiveElement[3].left += 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    } else if(state.directionActiveFigure == 3){
      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = noneActiveElement;
      });

      state.positionActiveElement[0].top--;
      state.positionActiveElement[0].left++;
      state.positionActiveElement[2].top++;
      state.positionActiveElement[2].left--;
      state.positionActiveElement[3].top += 2;

      state.positionActiveElement.forEach((item) => {
        if(item.left <= -1){
          state.positionActiveElement.forEach((item) => item.left++)
        }
      })
      state.positionActiveElement.forEach((item) => {
        if(item.left >= 14){
          state.positionActiveElement.forEach((item) => item.left--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        arrayTable[item.top][item.left].innerHTML = activeElement;
      });
    };
  };
};






function informationOfNewElement(){
  let activeFigure = getRandomIntInclusive(0, 6);
  if(activeFigure == 0){
    state.positionActiveElement = [{top: 0, left: 7}, {top: 0, left: 8}, {top: 0, left: 9}, {top: 0, left: 10}];
    state.directionActiveFigure = 0;
    state.shapeActiveFigure =  "snake";

  } else if(activeFigure == 1){
    state.positionActiveElement = [{top: 0, left: 7}, {top: 0, left: 8}, {top: 1, left: 7}, {top: 1, left: 8}];
    state.directionActiveFigure = 0;
    state.shapeActiveFigure =  "square";

  } else if(activeFigure == 2){
    state.positionActiveElement = [{top: 0, left: 7}, {top: 0, left: 8}, {top: 0, left: 9}, {top: 1, left: 8}];
    state.directionActiveFigure = 0;
    state.shapeActiveFigure =  "pyramid";

  } else if(activeFigure == 3){
    state.positionActiveElement = [{top: 0, left: 7}, {top: 0, left: 8}, {top: 1, left: 8}, {top: 1, left: 9}];
    state.directionActiveFigure = 0;
    state.shapeActiveFigure =  "lightning";

  } else if(activeFigure == 4){
    state.positionActiveElement = [{top: 0, left: 8}, {top: 0, left: 7}, {top: 1, left: 7}, {top: 1, left: 6}];
    state.directionActiveFigure = 0;
    state.shapeActiveFigure =  "reverseLightning";

  } else if(activeFigure == 5){
    state.positionActiveElement = [{top: 0, left: 7}, {top: 0, left: 8}, {top: 0, left: 9}, {top: 1, left: 9}];
    state.directionActiveFigure = 0;
    state.shapeActiveFigure =  "horse";

  } else if(activeFigure == 6){
    state.positionActiveElement = [{top: 0, left: 9}, {top: 0, left: 8}, {top: 0, left: 7}, {top: 1, left: 7}];
    state.directionActiveFigure = 0;
    state.shapeActiveFigure =  "reverseHorse";
  };
}
