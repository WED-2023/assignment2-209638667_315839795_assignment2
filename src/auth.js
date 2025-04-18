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
  document.getElementById('login_button').addEventListener('click', () => showScreen('login'));
  document.getElementById('signup_button').addEventListener('click', () => showScreen('signup'));
  
  // Users DB
  const users = [
    { username: 'p', password: 'testuser' } // default user
  ];
  
  // --- SIGN UP ---
  document.getElementById('signup_form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
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
    const username = document.querySelector('#login_form #username').value;
    const password = document.querySelector('#login_form #password').value;
  
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      alert('Invalid credentials.');
      return;
    }
  
    // Login success
    console.log('User logged in:', username);
    screens.menu.classList.remove('hidden');
    showScreen('config');
  });
  