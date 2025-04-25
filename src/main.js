import './config.js';
import './auth.js';
import './modal_window.js';
import './menu.js';

// Start at welcome screen
document.getElementById('welcome').classList.remove('hidden');

// Prevent space scroll
document.addEventListener('keydown', (event) => {
    const configScreen = document.getElementById('config_screen');
    const gameScreen = document.getElementById('game_screen');
  
    const isConfigVisible = configScreen && !configScreen.classList.contains('hidden');
    const isGameVisible = gameScreen && !gameScreen.classList.contains('hidden');
  
    if ((isConfigVisible || isGameVisible) && event.code === 'Space') {
      event.preventDefault();
    }
  });

  
  
