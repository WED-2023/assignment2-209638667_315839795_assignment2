const screens = {
    welcome: document.getElementById('welcome'),
    login: document.getElementById('login'),
    signup: document.getElementById('signup'),
    config: document.getElementById('config_screen'),
    menu: document.getElementById('menu')
  };
  
  // Show only the given screen
  function showScreen(name) {
    Object.values(screens).forEach(el => el.classList.add('hidden'));
    if (screens[name]) screens[name].classList.remove('hidden');
  }
  
  // Button navigation
  document.getElementById('link_signup').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen('signup');
  });
  
  document.getElementById('link_login').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen('login');
  });
  
  document.getElementById('open_about_link').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('about').classList.remove('hidden');
  });
  
  
  // Users DB
  const users = [
    { username: 'p', password: 'testuser' } // default user
  ];
  
  // --- SIGN UP ---
  document.getElementById('signup_form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup_username').value;
    const password = document.getElementById('signup_password').value;
    const confirm = document.getElementById('confirm_password').value;
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
  
    // Basic validation
    if (password !== confirm) return alert('Passwords do not match.');
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password)) return alert('Password must be at least 8 characters and include letters and numbers.');
    if (/\d/.test(firstName) || /\d/.test(lastName)) return alert('Names cannot contain numbers.');
    if (!/\S+@\S+\.\S+/.test(email)) return alert('Invalid email.');
  
    // Check for existing username
    if (users.some(user => user.username === username)) return alert('Username already exists.');
  
    users.push({ username, password });
    alert('Signup successful! Please login.');
    showScreen('login');
  });
  
  // --- LOGIN ---
  document.getElementById('login_form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login_username').value;
    const password = document.getElementById('login_password').value;
  
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      alert('Invalid credentials.');
      return;
    }
  
    // Save user and clear score history
    window.loggedInUser = username;
    localStorage.setItem(`score_history_${username}`, JSON.stringify([]));
  
    showScreen('config');

    setLoginState(true);
  });

  document.getElementById('menu_logout_btn').addEventListener('click', () => {
    alert('Logged out.');
    setLoginState(false);
    closeMenu();
  });
  
  

  function setLoginState(isLoggedIn) {
    window.isLoggedIn = isLoggedIn;
  
    // Always refresh the menu to reflect login state
    refreshMenuVisibility();
  
    if (!isLoggedIn) {
      window.loggedInUser = null;
      showScreen('welcome');
    }
  }

  function refreshMenuVisibility() {
    const isLoggedIn = window.isLoggedIn === true;
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
        configBtn.classList.remove('hidden');
      }
      if (currentScreen !== 'welcome') {
        homeBtn.classList.remove('hidden');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setLoginState(!!window.loggedInUser);
  });
  
  
  
  document.addEventListener('DOMContentLoaded', () => {
    setLoginState(!!window.loggedInUser);
  
    document.getElementById('switch_to_login')?.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('login');
      refreshMenuVisibility();
    });
  
    document.getElementById('switch_to_signup')?.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('signup');
      refreshMenuVisibility();
    });
  });
  