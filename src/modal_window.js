window.addEventListener('DOMContentLoaded', () => {
    const openAboutBtn = document.getElementById('open_about_btn');
    const aboutModal = document.getElementById('about');
    const closeAboutBtn = document.getElementById('close_about_btn');
  
    if (openAboutBtn && aboutModal) {
      openAboutBtn.addEventListener('click', () => {
        aboutModal.classList.remove('hidden');
      });
    }
  
    if (closeAboutBtn && aboutModal) {
      closeAboutBtn.addEventListener('click', () => {
        aboutModal.classList.add('hidden');
      });
    }

      // Close modal when clicking outside the content box
  if (aboutModal) {
    aboutModal.addEventListener('click', (e) => {
      // Only close if the click target is the overlay itself
      if (e.target === aboutModal) {
        aboutModal.classList.add('hidden');
      }
    });
  }

  });
  