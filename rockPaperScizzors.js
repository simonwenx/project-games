const rockChoice = document.querySelector('.rock-image');
const paperChoice = document.querySelector('.paper-image');
const scissorsChoice = document.querySelector('.scissors-image');
const reset = document.querySelector('.reset');

let computerChoice = 0;
let score = JSON.parse(localStorage.getItem('score')) || {
draw : 0,
playerScore : 0,
computerScore : 0
};

let results = document.querySelector('.results')


document.querySelector('.playerOne').innerHTML = `Player : ${score.playerScore}`;
document.querySelector('.playerTwo').innerHTML = `Computer : ${score.computerScore}`;
winChecker();
resetScore();
document.querySelector('.result').innerHTML = 'Round Results';

function winChecker() {
  rockChoice.addEventListener('click' , () => {
    computerChoice = Math.random();
    if(computerChoice < 1/3) {
      results.innerHTML = 'You chose rock. Computer chose rock. Draw.';
      score.draw++;
    }
    else if(computerChoice < 2/3 && computerChoice > 1/3) {
      results.innerHTML = 'You chose rock. Computer chose paper. Computer wins.'
      score.computerScore++;
    }
    else if(computerChoice > 2/3 && computerChoice < 3/3) {
      results.innerHTML = 'You chose rock. Computer chose scissors. You win.'
      score.playerScore++;
    }
  document.querySelector('.playerOne').innerHTML = `Player : ${score.playerScore}`;
  document.querySelector('.playerTwo').innerHTML = `Computer : ${score.computerScore}`;
  localStorage.setItem('score' , JSON.stringify(score));
  });
  paperChoice.addEventListener('click' , () => {
    computerChoice = Math.random();
    if(computerChoice < 1/3) {
      results.innerHTML = 'You chose paper. Computer chose rock. You win.';
      score.playerScore++;
    }
    else if(computerChoice < 2/3 && computerChoice > 1/3) {
      results.innerHTML = 'You chose paper. Computer chose paper. Draw.'
      score.draw++;
    }
    else if(computerChoice > 2/3 && computerChoice < 3/3) {
      results.innerHTML = 'You chose paper. Computer chose scissors. Computer wins.'
      score.computerScore++;
    }
  document.querySelector('.playerOne').innerHTML = `Player : ${score.playerScore}`;
  document.querySelector('.playerTwo').innerHTML = `Computer : ${score.computerScore}`;
  localStorage.setItem('score' , JSON.stringify(score));
  })
  scissorsChoice.addEventListener('click' , () => {
    computerChoice = Math.random();
    if(computerChoice < 1/3) {
      results.innerHTML = 'You chose scissors. Computer chose rock. Computer wins.';
      score.computerScore++;
    }
    else if(computerChoice < 2/3 && computerChoice > 1/3) {
      results.innerHTML = 'You chose scissors. Computer chose paper. You win.'
      score.playerScore++;
    }
    else if(computerChoice > 2/3 && computerChoice < 3/3) {
      results.innerHTML = 'You chose scissors. Computer chose scissors. Draw.'
      score.draw++;
    }
  document.querySelector('.playerOne').innerHTML = `Player : ${score.playerScore}`;
  document.querySelector('.playerTwo').innerHTML = `Computer : ${score.computerScore}`;
  localStorage.setItem('score' , JSON.stringify(score));
  })
}
function resetScore() {
  reset.addEventListener('click' , () => {
    score.playerScore = 0;
    score.computerScore = 0;
    score.draw = 0;
    localStorage.removeItem('score');
    document.querySelector('.playerOne').innerHTML = `Player : ${score.playerScore}`;
    document.querySelector('.playerTwo').innerHTML = `Computer : ${score.computerScore}`;
  })
}
