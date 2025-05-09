import { initGame } from './game.js';

const configScreen = document.getElementById('config_screen');
const configForm = document.getElementById('config_form');
const shootKeyBtn = document.getElementById('set_shoot_key_btn');
const shootKeyDisplay = document.getElementById('shoot_key_display');
const shootKeyInput = document.getElementById('shoot_key');
const gameScreen = document.getElementById('game_screen');

// --- Shooting Key Logic ---

shootKeyInput.addEventListener('focus', () => {
  shootKeyInput.placeholder = 'Press any key...';

  const keyListener = (event) => {
    const key = event.key;
    const isLetter = /^[a-zA-Z]$/.test(key);
    const isSpace = event.code === 'Space';

    if (isLetter || isSpace) {
      const finalKey = isSpace ? 'Space' : key.toUpperCase();
      shootKeyInput.value = finalKey;
      shootKeyInput.placeholder = 'Press a key';
      document.removeEventListener('keydown', keyListener);
      shootKeyInput.blur(); // Remove focus after choosing key
    } else {
      shootKeyInput.value = '';
      shootKeyInput.placeholder = 'Only letters or Space. Try again.';
    }
  };

  document.addEventListener('keydown', keyListener);
});


// --- Submit and Start Game ---
configForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const shootKey = shootKeyInput.value;
  const gameTime = parseInt(document.getElementById('game_time').value);
  const shipColor = document.getElementById('ship_color').value;

  if (!shootKey) {
    alert('Please select a shooting key.');
    return;
  }

  if (isNaN(gameTime) || gameTime < 2) {
    alert('Game time must be at least 2 minutes.');
    return;
  }

  window.gameConfig = {
    shootKey,
    gameTime,
    shipColor
  };

  configScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  initGame(window.gameConfig);
});
