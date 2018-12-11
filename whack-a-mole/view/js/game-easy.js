window.onload = function() {
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  const startBtn = document.getElementById('start_btn');
  let titleH1 = document.getElementById('title');
  let lastHole;
  let timeUp = false;
  let score = 0;
  let gameTime = 10000;
  let moleWait;
  let gameTimeCountDown;
  startBtn.addEventListener('click', function() {
    showBtnAnimation();
    startGame();
  }, false);

  function showBtnAnimation() {
    event.preventDefault();
    startBtn.classList.add('animate');
    setTimeout(() => {
      startBtn.classList.remove('animate');
      startBtn.style.display = 'none';
    }, 700);
  }

  function startGame() {
    resetScoreAndTime();
    peep();
    gameTimeCountDown = setTimeout(() => {
      startBtn.innerText = 'Replay';
      startBtn.style.display = 'inline-block';
      timeUp = true;
      clearTimeout(moleWait);
    }, gameTime)
  }

  function resetScoreAndTime() {
    score = 0;
    scoreBoard.innerText = score;
    clearTimeout(gameTimeCountDown);
    timeUp = false;
  }

  function peep() {
    if (!timeUp) {
      clearTimeout(moleWait);
      const time = randomTime(600, 1000);
      const hole = randomHole(holes);
      comeOutAndStop(hole, time);
    }
  }

  function randomTime(min, max) {
    return time = min + Math.floor(Math.random() * (max - min));
  }

  function randomHole(holes) {
    let newHole = Math.floor(Math.random() * 6);
    while (newHole === lastHole) {
      newHole = Math.floor(Math.random() * 6);
    }
    lastHole = newHole;
    return holes[newHole];
  }

  function comeOutAndStop(hole, time) {
    hole.classList.add('up');
    moleWait = setTimeout(function() {
      hole.classList.remove('up');
      peep();
    }, time);
  }

  function hitAndScore() {
    score += 1;
    scoreBoard.innerText = score;
  }
  moles.forEach(mole => mole.addEventListener('click', function(e) {
    let hole = holes[lastHole];
    hole.classList.remove('up');
    hitAndScore();
    peep();
  }));
};