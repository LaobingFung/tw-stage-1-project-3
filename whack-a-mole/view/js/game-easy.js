window.onload = function() {
  const Holes = document.querySelectorAll('.hole');
  const ScoreBoard = document.querySelector('.score');
  const Moles = document.querySelectorAll('.mole');
  const StartBtn = document.getElementById('start_btn');
  let titleH1 = document.getElementById('title');
  let lastHole;
  let timeUp = false;
  let score = 0;
  let gameTime = 10000;
  let moleWait;
  let gameTimeCountDown;
  StartBtn.addEventListener('click', function() {
    showBtnAnimation();
    startGame();
  }, false);

  function showBtnAnimation() {
    event.preventDefault();
    StartBtn.classList.add('animate');
    setTimeout(() => {
      StartBtn.classList.remove('animate');
      StartBtn.style.display = 'none';
    }, 700);
  }

  function startGame() {
    resetScoreAndTime();
    peep();
    gameTimeCountDown = setTimeout(() => {
      StartBtn.innerText = 'Replay';
      StartBtn.style.display = 'inline-block';
      timeUp = true;
      clearTimeout(moleWait);
    }, gameTime)
  }

  function resetScoreAndTime() {
    score = 0;
    ScoreBoard.innerText = score;
    clearTimeout(gameTimeCountDown);
    timeUp = false;
  }

  function peep() {
    if (!timeUp) {
      clearTimeout(moleWait);
      const time = randomTime(200, 1000);
      const hole = randomHole(Holes);
      comeOutAndStop(hole, time);
    }
  }

  function randomTime(min, max) {
    return time = min + Math.floor(Math.random() * (max - min));
  }

  function randomHole(Holes) {
    let newHole = Math.floor(Math.random() * 6);
    while (newHole === lastHole) {
      newHole = Math.floor(Math.random() * 6);
    }
    lastHole = newHole;
    return Holes[newHole];
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
    ScoreBoard.innerText = score;
  }
  Moles.forEach(mole => mole.addEventListener('click', function(e) {
    let hole = Holes[lastHole];
    hole.classList.remove('up');
    hitAndScore();
    peep();
  }));
};