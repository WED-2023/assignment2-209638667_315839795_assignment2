import './config.js';
import './auth.js';
import './modal_window.js';

// Ensure the DOM is fully loaded before accessing elements
window.addEventListener('DOMContentLoaded', () => {
  // Start at welcome screen
  document.getElementById('welcome').classList.remove('hidden'); 

  // Get DOM elements for About modal
  const openAboutBtn = document.getElementById('open_about_btn');
  const aboutModal = document.getElementById('about');
  const closeAboutBtn = document.getElementById('close_about_btn');

  // Make sure all elements exist before adding listeners
  if (openAboutBtn && aboutModal && closeAboutBtn) {
    // Open the modal
    openAboutBtn.addEventListener('click', () => {
      aboutModal.classList.remove('hidden');
    });

    // Close modal on X button click
    closeAboutBtn.addEventListener('click', () => {
      aboutModal.classList.add('hidden');
    });

    // Close modal on click outside modal content
    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) {
        aboutModal.classList.add('hidden');
      }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        aboutModal.classList.add('hidden');
      }
    });
  } else {
    console.warn('Modal elements not found. Check your HTML IDs.');
  }
});
