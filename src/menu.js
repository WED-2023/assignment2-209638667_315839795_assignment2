const menuToggle = document.getElementById('menu_toggle');
const menu = document.getElementById('menu');

// 👉 OPEN: Remove 'hidden', then wait a frame before adding 'active'
function openMenu() {
    // Fire a global event to notify that the menu has opened
    document.dispatchEvent(new Event('menuOpened'));
  
    // Then open the sidebar
    menu.classList.remove('hidden');
    requestAnimationFrame(() => {
      menu.classList.add('active');
    });
  }
  

// 👉 CLOSE: Remove 'active', then wait for transition before hiding
function closeMenu() {
  menu.classList.remove('active');
  setTimeout(() => {
    menu.classList.add('hidden');
  }, 300); // should match the CSS transition duration
}

// 👉 Toggle logic
menuToggle.addEventListener('click', () => {
  if (menu.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

  

// ESC closes menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      closeMenu();
    }
  });
  
  // Click any menu button → close sidebar
  function showOnly(id) {
    document.querySelectorAll('#content > div').forEach(div => {
      div.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
  }
  
  document.getElementById('nav_welcome').addEventListener('click', () => {
    showOnly('welcome');
    closeMenu();
    refreshMenuVisibility();
  });
  
  document.getElementById('nav_game').addEventListener('click', () => {
    showOnly('game_screen');
    closeMenu();
    refreshMenuVisibility();
  });
  
  document.getElementById('nav_config').addEventListener('click', () => {
    showOnly('config_screen');
    closeMenu();
    refreshMenuVisibility();
  });
  
  document.getElementById('nav_about').addEventListener('click', () => {
    document.getElementById('about').classList.remove('hidden');
    closeMenu();
    refreshMenuVisibility();
  });

  document.getElementById('menu_login_btn').addEventListener('click', () => {
    showOnly('login');
    closeMenu();
    refreshMenuVisibility();
  });
  
  document.getElementById('menu_signup_btn').addEventListener('click', () => {
    showOnly('signup');
    closeMenu();
    refreshMenuVisibility();
  });
  
  
  
  
  function refreshMenuVisibility() {
    const isLoggedIn = window.isLoggedIn === true; // temporary check
    const currentScreen = [...document.querySelectorAll('#content > div')]
      .find(div => !div.classList.contains('hidden'))?.id;
  
    const loginBtn = document.getElementById('menu_login');
    const signupBtn = document.getElementById('menu_signup');
    const logoutBtn = document.getElementById('menu_logout');
    const gameBtn = document.getElementById('nav_game');
    const configBtn = document.getElementById('nav_config');
    const homeBtn = document.getElementById('nav_welcome');
  
    // Hide all first
    loginBtn.classList.add('hidden');
    signupBtn.classList.add('hidden');
    logoutBtn.classList.add('hidden');
    gameBtn.classList.add('hidden');
    configBtn.classList.add('hidden');
    homeBtn.classList.add('hidden');
  
    if (!isLoggedIn) {
      loginBtn.classList.remove('hidden');
      signupBtn.classList.remove('hidden');
    } else {
      if (currentScreen !== 'game_screen' && currentScreen !== 'config_screen') {
        logoutBtn.classList.remove('hidden');
        configBtn.classList.remove('hidden'); // renamed as "Start Game"
      }
      if (currentScreen !== 'welcome') {
        homeBtn.classList.remove('hidden');
      }
    }
  }

  document.getElementById('logo').addEventListener('click', () => {
    showOnly('welcome');
    refreshMenuVisibility();
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    refreshMenuVisibility();
  });

  // Play Now button logic
document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('welcome_play_btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (window.isLoggedIn) {
          showOnly('config_screen');
        } else {
          showOnly('login');
        }
      });
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    refreshMenuVisibility();
  
    const playBtn = document.getElementById('welcome_play_btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (window.isLoggedIn) {
          showOnly('config_screen');
        } else {
          showOnly('login');
        }
      });
    }
  
    const homeFromLogin = document.getElementById('home_from_login');
    if (homeFromLogin) {
      homeFromLogin.addEventListener('click', () => {
        showOnly('welcome');
        refreshMenuVisibility();
      });
    }
  
    const homeFromSignup = document.getElementById('home_from_signup');
    if (homeFromSignup) {
      homeFromSignup.addEventListener('click', () => {
        showOnly('welcome');
        refreshMenuVisibility();
      });
    }
  });
  
  
  
  
  