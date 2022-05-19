var arrayString = [];
var arrayTable = [];
var speedGame = 400;
var x;
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
  state.positionActiveElement.forEach((item) => {
    arrayTable[item.top][item.left].innerHTML = activeElement;
  });
  timer = setTimeout(moveActiveFigure, speedGame);
};
 
function moveActiveFigure() {
  if(gameIsTrue){
    return;
  };
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
  timer = setTimeout(moveActiveFigure, speedGame);
};


function checkDropOnAnotherElement(){
  state.coordinatesAllFallElements.forEach((fall) => {
    if(state.positionActiveElement.find((active) => active.top == fall.top && active.left == fall.left)){
      state.positionActiveElement.forEach((item) => {
        item.top--;
        arrayTable[item.top][item.left].innerHTML = activeElement;
        state.coordinatesAllFallElements.push(item);
        informationOfNewElement();
      });
      fallFigure();
      return;
    };
  })
};




function nextElement() {
  if(state.positionActiveElement.find((item) => item.top == 14)){
    state.positionActiveElement.forEach((item) => {
      state.coordinatesAllFallElements.push(item);
      informationOfNewElement();
    });
    fallFigure();
  };
}


function fallFigure() {
  let numberString = tableSquareVertSize;
  while(numberString > 0){
    newArray = state.coordinatesAllFallElements.filter(item => item.top == numberString);
    if(newArray.length >= 14){
      counterNumber++;
      counter.innerHTML = counterNumber;
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
      numberString++;
    };
    numberString--;
  };
};



function moveLeft() {
  let isCollision = false;
  state.coordinatesAllFallElements.forEach((arrayItem) => {
    isCollision = state.positionActiveElement
      .find((item) => (item.left == 0)
        || ((item.left - 1) == arrayItem.left && item.top == arrayItem.top)
      );
  })
  if(isCollision){
    return
  };
  state.positionActiveElement.forEach((active) => {
    arrayTable[active.top][active.left].innerHTML = noneActiveElement;
    active.left--;
  });
  draw();
};


let previousState;
function draw(){
  // добавить проверку с previousState и отрисовать изминившиеся
  // перебрать элементы coordinatesAllFallElements и отобразить их в аррау табле
  // сохранить coordinatesAllFallElements в previousState
  state.positionActiveElement.forEach((active) => {
    arrayTable[active.top][active.left].innerHTML = activeElement;
  });
}


function moveRight() {
  state.coordinatesAllFallElements.forEach((i) => {
    if(state.positionActiveElement.find((item) => ((item.left + 1) == 14) || ((item.left + 1) == i.left && item.top == i.top))){
      state.positionActiveElement.forEach((item) => {
        item.left--;
      });
    };
  })
  state.positionActiveElement.forEach((active) => {
    arrayTable[active.top][active.left].innerHTML = noneActiveElement;
    active.left++;
  });
  draw();
};

function moveDown(){
  t = [];
  state.positionActiveElement.forEach((u) => t.push(u.top))
  t.sort(function (a, b) {
    return a - b;
  })
  x = t[3];
  moveWhileDown();
  while(x < 13){
    state.positionActiveElement.forEach((active) => {
      arrayTable[active.top][active.left].innerHTML = noneActiveElement;
      active.top++;
    });
    moveWhileDown();
    x++;
  };
  draw();
};


function moveWhileDown(){
  state.positionActiveElement.forEach((active) => {
    state.coordinatesAllFallElements.forEach((item) => {
      if(active.left == item.left && active.top == (item.top - 1)){
        x += 14;
      };
    });
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
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

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
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].top -= 2;
            state.positionActiveElement[3].left -= 2;
            state.directionActiveFigure--;
          }
        })
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
        if(item.top >= 14){
          state.positionActiveElement.forEach((item) => item.top-=1)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].top -= 2;
            state.positionActiveElement[3].left += 2;
            state.directionActiveFigure--;
          }
        })
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
      state.positionActiveElement[3].left -= 2;

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].top += 2;
            state.positionActiveElement[3].left += 2;
            state.directionActiveFigure--;
          }
        })
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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].top += 2;
            state.positionActiveElement[3].left -= 2;
            state.directionActiveFigure--;
          }
        })
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].top--;
            state.positionActiveElement[3].left++;
            state.directionActiveFigure--;
          }
        })
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].top++;
            state.positionActiveElement[3].left++;
            state.directionActiveFigure--;
          }
        })
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })


      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].top++;
            state.positionActiveElement[3].left--;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })


      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].top--;
            state.positionActiveElement[3].left--;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })


      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].top -= 2;
            state.directionActiveFigure--;
          }
        })
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })


      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].left += 2;
            state.directionActiveFigure--;
          }
        })
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].top += 2;
            state.directionActiveFigure--;
          }
        })
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })


      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].left -= 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].left += 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].top += 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].left -= 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].top -= 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })


      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].top -= 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].left += 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].top += 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].left -= 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].left += 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top--;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top++;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].top += 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left++;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left--;
            state.positionActiveElement[3].left -= 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
        }
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top >= 15){
          state.positionActiveElement.forEach((item) => item.top--)
          return
        }
      })

      state.positionActiveElement.forEach((item) => {
        state.coordinatesAllFallElements.forEach((i) => {
          if(i.top == item.top && i.left == item.left){
            console.log("greate");
            state.positionActiveElement[0].top++;
            state.positionActiveElement[0].left--;
            state.positionActiveElement[2].top--;
            state.positionActiveElement[2].left++;
            state.positionActiveElement[3].top -= 2;
            state.directionActiveFigure--;
          }
        })
      })

      state.positionActiveElement.forEach((item) => {
        if(item.top <= 0){
          state.positionActiveElement.forEach((item) => item.top++)
        }
      })

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
  state.positionActiveElement.forEach((active) => {
    state.coordinatesAllFallElements.find((item) => {
      if(active.top == item.top && active.left == item.left){
        clearTime();
      }
    })
  })
}



document.addEventListener('keyup', function(event){
    if (event.code == "ArrowLeft") {
        moveLeft();
    }
});
document.addEventListener('keyup', function(event){
    if (event.code == "ArrowUp") {
        moveTurn();
    }
});
document.addEventListener('keyup', function(event){
    if (event.code == "ArrowRight") {
        moveRight();
    }
});
document.addEventListener('keyup', function(event){
    if (event.code == "ArrowDown") {
        moveDown()
    }
});