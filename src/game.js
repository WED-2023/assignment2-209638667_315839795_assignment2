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
let alienDirection = 1;
let alienSpeed = 6;
let alienMoveInterval;
let lastEnemyBullet = null;
let speedUps = 0;
let isGameOver = false;


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
  startAlienMovement();
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
  if (isGameOver) return;
  startAlienShooting();
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
  
      // Every 5 seconds, increase alien speed (up to 4x)
      if (timeRemaining % 5 === 0 && speedUps < 4) {
        alienSpeed += 0.5;
        speedUps++;
      }
  
      if (timeRemaining <= 0) {
        clearInterval(gameTimer);
        clearInterval(alienMoveInterval);
        endGame('time');
      }
    }, 1000);
    if (isGameOver) return;
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
        return;
      }
      bullet.style.bottom = `${newBottom}px`;
  
      // Collision check
      const bulletRect = bullet.getBoundingClientRect();
      const aliens = Array.from(document.getElementsByClassName('alien_ship'));
      for (const alien of aliens) {
        const alienRect = alien.getBoundingClientRect();
        if (
          bulletRect.left < alienRect.right &&
          bulletRect.right > alienRect.left &&
          bulletRect.top < alienRect.bottom &&
          bulletRect.bottom > alienRect.top
        ) {
          const row = parseInt(alien.dataset.row);
          const points = [5, 10, 15, 20][row];
          score += points;
          updateUI();
          alien.remove();
          bullet.remove();
          clearInterval(interval);
  
          // Check if all aliens are dead
          if (document.getElementsByClassName('alien_ship').length === 0) {
            endGame('win');
          }
          return;
        }
        if (isGameOver) {
            bullet.remove();
            clearInterval(interval);
            return;
          }
      }
    }, 16);
  }
  

function spawnAliens() {
  const rows = 4;
  const cols = 5;
  const spacingX = 60;
  const spacingY = 50;
  const rowColors = ['blue', 'green', 'orange', 'red'];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const alien = document.createElement('img');
      alien.src = 'assets/alien_ship.svg';
      alien.className = 'alien_ship';
      alien.dataset.row = row;
      alien.style.position = 'absolute';
      alien.style.width = '50px';
      alien.style.left = `${col * spacingX + 60}px`;
      alien.style.top = `${row * spacingY + 50}px`;
      alien.style.filter = `drop-shadow(0 0 4px ${rowColors[row]})`;
      gameArea.appendChild(alien);
    }
  }
}

function startAlienMovement() {
  alienMoveInterval = setInterval(() => {
    const aliens = Array.from(document.getElementsByClassName('alien_ship'));
    if (aliens.length === 0) return;

    let moveDown = false;
    const bounds = aliens.map(a => a.getBoundingClientRect());
    const leftMost = Math.min(...bounds.map(b => b.left));
    const rightMost = Math.max(...bounds.map(b => b.right));

    if (rightMost + alienSpeed >= gameArea.getBoundingClientRect().right ||
        leftMost - alienSpeed <= gameArea.getBoundingClientRect().left) {
      alienDirection *= -1;
      moveDown = true;
    }

    aliens.forEach(alien => {
      const currentLeft = parseInt(alien.style.left);
      alien.style.left = `${currentLeft + alienSpeed * alienDirection}px`;
      if (moveDown) {
        const currentTop = parseInt(alien.style.top);
        alien.style.top = `${currentTop + 10}px`;
      }
    });
  }, 200);
}

function startAlienShooting() {
    setInterval(() => {
      if (isGameOver) return;
  
      // Only shoot if last bullet is 75% down or gone
      if (lastEnemyBullet) {
        const b = lastEnemyBullet.getBoundingClientRect();
        const area = gameArea.getBoundingClientRect();
        const distance = b.top - area.top;
        if (distance < area.height * 0.75) return;
      }
  
      const aliens = Array.from(document.getElementsByClassName('alien_ship'));
      if (aliens.length === 0) return;
  
      const randomAlien = aliens[Math.floor(Math.random() * aliens.length)];
      const bullet = document.createElement('img');
      bullet.src = 'assets/alien-gray-junk-svgrepo-com.svg';
      bullet.className = 'enemy_bullet';
      bullet.style.position = 'absolute';
      bullet.style.width = '15px';
      bullet.style.top = `${randomAlien.offsetTop + 30}px`;
      bullet.style.left = `${randomAlien.offsetLeft + 20}px`;
      bullet.style.filter = 'drop-shadow(0 0 5px lime)';
      gameArea.appendChild(bullet);
      lastEnemyBullet = bullet;
  
      const interval = setInterval(() => {
        if (isGameOver) {
          bullet.remove();
          clearInterval(interval);
          return;
        }
  
        const newTop = bullet.offsetTop + 6;
        if (newTop > gameArea.offsetHeight) {
          bullet.remove();
          clearInterval(interval);
          return;
        }
  
        bullet.style.top = `${newTop}px`;
  
        // Check collision with player
        const bulletRect = bullet.getBoundingClientRect();
        const playerRect = playerShip.getBoundingClientRect();
        if (
          bulletRect.left < playerRect.right &&
          bulletRect.right > playerRect.left &&
          bulletRect.top < playerRect.bottom &&
          bulletRect.bottom > playerRect.top
        ) {
          lives--;
          updateUI();
          bullet.remove();
          clearInterval(interval);
          if (lives === 0) {
            endGame('lose');
          }
        }
      }, 16);
    }, 800); // check every 0.8s for possible shot
  }

function endGame(reason) {
    isGameOver = true;
    clearInterval(gameTimer);
    clearInterval(alienMoveInterval);
  
    let message = '';
    if (reason === 'time') {
      message = score < 100 ? `You can do better! Score: ${score}` : 'Winner!';
    } else if (reason === 'win') {
      message = 'Champion!';
    } 
    else if (reason === 'lose') {
        message = 'You Lost!';
    }
  
    alert(message);
  }