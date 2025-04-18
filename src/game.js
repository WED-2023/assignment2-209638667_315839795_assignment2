// game.js - handles player, aliens, bullets, UI

let playerShip;
let gameArea;
let config;
let moveX = 0;
let moveY = 0;
const speed = 5;
let score = 0;
let lives = 3;
let gameTimer;
let timeRemaining;

export function initGame(cfg) {
  config = cfg;
  playerShip = document.getElementById('player_ship');
  gameArea = document.getElementById('game_area');

  // Reset stats
  score = 0;
  lives = 3;
  timeRemaining = config.gameTime * 60; // in seconds
  updateUI();

  // Style ship
  playerShip.style.filter = `drop-shadow(0 0 5px ${config.shipColor})`;

  // Start position
  const areaWidth = gameArea.offsetWidth;
  const minX = areaWidth * 0.2;
  const maxX = areaWidth * 0.6;
  const startX = Math.random() * (maxX - minX) + minX;
  playerShip.style.left = `${startX}px`;
  playerShip.style.bottom = `10px`;

  // Listeners
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  // Start game loop
  requestAnimationFrame(updateMovement);
  spawnAliens();
  startTimer();
}

function handleKeyDown(e) {
  switch (e.key) {
    case 'ArrowLeft': moveX = -speed; break;
    case 'ArrowRight': moveX = speed; break;
    case 'ArrowUp': moveY = speed; break;
    case 'ArrowDown': moveY = -speed; break;
    case config.shootKey: firePlayerBullet(); break;
    case ' ': if (config.shootKey === 'Space') firePlayerBullet(); break;
  }
}

function handleKeyUp(e) {
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) moveX = 0;
  if (['ArrowUp', 'ArrowDown'].includes(e.key)) moveY = 0;
}

function updateMovement() {
  const newLeft = playerShip.offsetLeft + moveX;
  const newBottom = parseInt(playerShip.style.bottom) + moveY;
  const maxY = gameArea.offsetHeight * 0.4;

  if (newLeft >= 0 && newLeft + playerShip.offsetWidth <= gameArea.offsetWidth) {
    playerShip.style.left = `${newLeft}px`;
  }
  if (newBottom >= 0 && newBottom <= maxY) {
    playerShip.style.bottom = `${newBottom}px`;
  }

  requestAnimationFrame(updateMovement);
}

function updateUI() {
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('lives').textContent = `Lives: ${lives}`;
  const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
  const seconds = (timeRemaining % 60).toString().padStart(2, '0');
  document.getElementById('timer').textContent = `Time: ${minutes}:${seconds}`;
}

function startTimer() {
  gameTimer = setInterval(() => {
    timeRemaining--;
    updateUI();
    if (timeRemaining <= 0) {
      clearInterval(gameTimer);
      endGame('time');
    }
  }, 1000);
}

function firePlayerBullet() {
  const bullet = document.createElement('img');
  bullet.src = 'assets/heart-svgrepo-com.svg';
  bullet.className = 'player_bullet';
  bullet.style.position = 'absolute';
  bullet.style.left = `${playerShip.offsetLeft + playerShip.offsetWidth / 2 - 5}px`;
  bullet.style.bottom = `${parseInt(playerShip.style.bottom) + 50}px`;
  bullet.style.width = '15px';
  bullet.style.filter = 'drop-shadow(0 0 5px red)';
  gameArea.appendChild(bullet);

  const interval = setInterval(() => {
    const newBottom = parseInt(bullet.style.bottom) + 10;
    if (newBottom > gameArea.offsetHeight) {
      bullet.remove();
      clearInterval(interval);
    } else {
      bullet.style.bottom = `${newBottom}px`;
    }
  }, 16);
}

function spawnAliens() {
  const rows = 4;
  const cols = 5;
  const spacingX = 80;
  const spacingY = 60;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const alien = document.createElement('img');
        alien.src = 'assets/alien_ship.svg';
        alien.className = 'alien_ship';
        alien.style.position = 'absolute';
        alien.style.width = '50px';
        alien.style.left = `${col * spacingX + 60}px`;
        alien.style.top = `${row * spacingY + 50}px`;
        const rowColors = ['blue', 'lime', 'red', 'purple']; // bottom to top (score: 5,10,15,20)
        alien.dataset.row = row; // for scoring later
        alien.style.filter = `drop-shadow(0 0 4px ${rowColors[row]})`;
        gameArea.appendChild(alien);
    }
  }
}

function endGame(reason) {
  alert(reason === 'time' ? 'Time is up!' : 'You lost!');
  // TODO: Show scoreboard, results, restart option
}
