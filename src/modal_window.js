window.addEventListener('DOMContentLoaded', () => {
  const openAboutBtn = document.getElementById('open_about_btn');
  const aboutModal = document.getElementById('about');
  const closeAboutBtn = document.getElementById('close_about_btn');

  // Open modal
  if (openAboutBtn && aboutModal) {
    openAboutBtn.addEventListener('click', () => {
      aboutModal.classList.remove('hidden');
    });
  }

  // Close modal with X button
  if (closeAboutBtn && aboutModal) {
    closeAboutBtn.addEventListener('click', () => {
      aboutModal.classList.add('hidden');
    });
  }

  // Close modal when clicking outside content
  if (aboutModal) {
    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) {
        aboutModal.classList.add('hidden');
      }
    });
  }

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !aboutModal.classList.contains('hidden')) {
      aboutModal.classList.add('hidden');
    }
  });
});

const aboutModal = document.getElementById('about');

// Listen for menuOpened event to close the modal
document.addEventListener('menuOpened', () => {
  if (aboutModal && !aboutModal.classList.contains('hidden')) {
    aboutModal.classList.add('hidden');
  }
});

