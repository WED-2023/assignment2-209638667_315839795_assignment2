# Spaceships - The Game

An interactive web-based arcade game where you control a spaceship, dodge enemy fire, and eliminate alien ships — built using HTML5, CSS3, and vanilla JavaScript.

---

## 🚀 Features

- **User Authentication**:
  - Sign Up and Login with basic validation (username, password, email).
  - Session managed in browser memory.

- **Configurable Game Settings**:
  - Choose your spaceship color.
  - Select your own shooting key (letter or Spacebar).
  - Set custom game duration.

- **Gameplay Mechanics**:
  - Move using Arrow keys.
  - Shoot aliens using your selected shooting key.
  - Aliens move horizontally and shoot bullets randomly.
  - Three lives system: lose all and the game ends.
  - Score points based on alien row position (higher rows = more points).

- **Background Music and Sound Effects**:
  - Background music plays during gameplay.
  - Sound effects for player hitting alien and taking damage.

- **Pause and Resume**:
  - Game automatically pauses when opening the hamburger menu.
  - "Game Paused" overlay appears.
  - Resumes exactly from the same state.

- **Score Tracking**:
  - Top 10 highest scores saved per player.
  - Current game's score is highlighted at the end screen.

- **Responsive Design**:
  - Minimum resolution support for 1366x768 screens.
  - Adapted for laptops and standard desktop displays.

- **About Section**:
  - Modal window explaining game features, technologies used, and project challenges.

---

## 🛠 Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with custom responsive media queries)
  - Vanilla JavaScript (modular ES6 imports)

- **Design Tools**:
  - Canva (logo design)
  - Google Fonts (Space Mono font)

---

## 🎮 How to Play

1. Login or sign up for a new account.
2. Configure your spaceship settings.
3. Start the game and destroy as many alien ships as you can!
4. Avoid enemy bullets — you only have 3 lives!
5. Finish the game by surviving until the timer ends or eliminating all aliens.
6. View your top scores after each game.

---

## 📦 Project Structure

```
📂 assignment2-209638667_315839795_assignment2/
├── 📁 assets/
│   ├── 📁 images/
│   │   ├── spaceship.png
│   │   ├── alien.png
│   │   └── background.jpg
│   ├── 📁 sounds/
│   │   ├── background-music.mp3
│   │   ├── shoot.wav
│   │   └── explosion.wav
├── 📁 css/
│   ├── styles.css
│   └── responsive.css
├── 📁 js/
│   ├── auth.js
│   ├── game.js
│   ├── config.js
│   ├── modal.js
│   └── menu.js
├── index.html
├── README.md
└── LICENSE
```
---

## 🧩 Bonus Features Implemented

- Pause and Resume without resetting the game state.
- Shooting cooldown to prevent spam firing.
- Custom scoreboard with ranking numbers and current game highlight.
- Smooth menu transitions and responsive UI.
- Clean modular code separation (`auth`, `game`, `config`, `modal`, `menu`).

---

## 🧠 Challenges and Learnings

- Managing complex game state (pause/resume, shooting intervals, bullet behavior).
- Preventing exploits like infinite shooting by adding fire cooldowns.
- Building a responsive design that scales properly across devices.
- Managing DOM dynamically with hundreds of moving elements (bullets, ships).

---

## 📎 Authors

- **Tomer Rothman** - [315839795]
- **May-tal Wexler Rothman** - [209638667]

---

## 🔗 Project Link

[👉 View the Spaceships Game Project Here](https://wed-2023.github.io/assignment2-209638667_315839795_assignment2/)

---
