import { square } from './square.js';

let clickCount = 1;
let continueGame = true;
let squaresHTML = '';
let crossCount = JSON.parse(localStorage.getItem('crossScore')) || 0;
let circleCount = JSON.parse(localStorage.getItem('circleScore')) || 0;
let resetButton = document.querySelector('.reset');
let drawCount = 0;
let draw = 0;

resetButton.addEventListener('click', () => {
  crossCount = 0;
  circleCount = 0;
  localStorage.removeItem('circleScore');
  localStorage.removeItem('crossScore');
  document.querySelector('.playerOne').innerHTML = `Player 1: ${crossCount}`;
  document.querySelector('.playerTwo').innerHTML = `Player 2: ${circleCount}`;
})

function playerTurn() {
  if (clickCount % 2 === 0) {
    document.querySelector('.hello').innerHTML = "Player Two";
  } else {
    document.querySelector('.hello').innerHTML = "Player One";
  }
}

square.forEach((selectedSquare) => {
  squaresHTML += `<div class="sq${selectedSquare.number} sq-js"></div>`;
});
document.querySelector('.game-div').innerHTML = squaresHTML;

function winCheck() {
  const squareOne = document.querySelector('.sq1').querySelector('img');
  const squareTwo = document.querySelector('.sq2').querySelector('img');
  const squareThree = document.querySelector('.sq3').querySelector('img');
  const squareFour = document.querySelector('.sq4').querySelector('img');
  const squareFive = document.querySelector('.sq5').querySelector('img');
  const squareSix = document.querySelector('.sq6').querySelector('img');
  const squareSeven = document.querySelector('.sq7').querySelector('img');
  const squareEight = document.querySelector('.sq8').querySelector('img');
  const squareNine = document.querySelector('.sq9').querySelector('img');

  const isCircle = (img) => img && img.src.includes('circle.svg');
  const isCross = (img) => img && img.src.includes('cross.svg');

  if (
    (squareOne && squareTwo && squareThree && isCircle(squareOne) && isCircle(squareTwo) && isCircle(squareThree)) ||
    (squareFour && squareFive && squareSix && isCircle(squareFour) && isCircle(squareFive) && isCircle(squareSix)) ||
    (squareSeven && squareEight && squareNine && isCircle(squareSeven) && isCircle(squareEight) && isCircle(squareNine)) ||
    (squareOne && squareFour && squareSeven && isCircle(squareOne) && isCircle(squareFour) && isCircle(squareSeven)) ||
    (squareTwo && squareFive && squareEight && isCircle(squareTwo) && isCircle(squareFive) && isCircle(squareEight)) ||
    (squareThree && squareSix && squareNine && isCircle(squareThree) && isCircle(squareSix) && isCircle(squareNine)) ||
    (squareOne && squareFive && squareNine && isCircle(squareOne) && isCircle(squareFive) && isCircle(squareNine)) ||
    (squareThree && squareFive && squareSeven && isCircle(squareThree) && isCircle(squareFive) && isCircle(squareSeven))
  ) {
    document.querySelector('.hello').innerHTML = 'Winner: Player 2';
    setTimeout(()=> {
      document.querySelector('.hello').innerHTML = 'Tic-Tac-Toe';
    },600)
    circleCount += 0.5;
    localStorage.setItem('circleScore' , JSON.stringify(circleCount));
    document.querySelector('.playerTwo').innerHTML = `Player 2: ${circleCount}`;
    drawCount = 0;
    return continueGame = false;
  } else if (
    (squareOne && squareTwo && squareThree && isCross(squareOne) && isCross(squareTwo) && isCross(squareThree)) ||
    (squareFour && squareFive && squareSix && isCross(squareFour) && isCross(squareFive) && isCross(squareSix)) ||
    (squareSeven && squareEight && squareNine && isCross(squareSeven) && isCross(squareEight) && isCross(squareNine)) ||
    (squareOne && squareFour && squareSeven && isCross(squareOne) && isCross(squareFour) && isCross(squareSeven)) ||
    (squareTwo && squareFive && squareEight && isCross(squareTwo) && isCross(squareFive) && isCross(squareEight)) ||
    (squareThree && squareSix && squareNine && isCross(squareThree) && isCross(squareSix) && isCross(squareNine)) ||
    (squareOne && squareFive && squareNine && isCross(squareOne) && isCross(squareFive) && isCross(squareNine)) ||
    (squareThree && squareFive && squareSeven && isCross(squareThree) && isCross(squareFive) && isCross(squareSeven))
  ) {
    document.querySelector('.hello').innerHTML = 'Winner: Player 1';
    setTimeout(()=> {
      document.querySelector('.hello').innerHTML = 'Tic-Tac-Toe';
    },1200)
    crossCount += 0.5;
    localStorage.setItem('crossScore' , JSON.stringify(crossCount));
    document.querySelector('.playerOne').innerHTML = `Player 1: ${crossCount}`;
    drawCount = 0;
    return continueGame = false;
  }
  else if(continueGame === true) {
    drawCount ++;
    draw = drawCount / 2;
    console.log(draw);
    if (draw == 9) {
      document.querySelector('.hello').innerHTML = 'Draw';  
    setTimeout(() => {
      document.querySelector('.hello').innerHTML = 'Tic-Tac-Toe'; 
    }, 1000);
    setTimeout(() => {
      const icons = document.querySelectorAll('.game-div img');
      icons.forEach((icon) => icon.parentNode.removeChild(icon));
      drawCount = 0;
      clickCount = 1;
      continueGame = true;
    } , 600)
    }
  }
}

function addIcon(clickedSquare) {

  if (clickCount % 2 === 0) {
    clickedSquare.innerHTML = `<img class="circle" id = squareImage src="circle.svg">`;
  } else (clickedSquare.innerHTML = `<img class="cross" id = squareImage src="cross.svg">`);  
   if (winCheck() === false) {
    setTimeout(() => {
    var images = document.getElementsByTagName('img');
    var l = images.length;
    for (var i = 0; i < l; i++) {
    images[0].parentNode.removeChild(images[0]);
  }continueGame = true}, 600);
   }
   else(continueGame = true);
}

document.querySelector('.playerOne').innerHTML = `Player 1: ${crossCount}`;
document.querySelector('.playerTwo').innerHTML = `Player 2: ${circleCount}`;

document.querySelectorAll('.sq-js').forEach((square) => {
  square.addEventListener('click', () => {
    if (square.innerHTML === '' && continueGame === true) {
      addIcon(square);
      clickCount++;
      playerTurn();
      winCheck();
    }
  });
});



