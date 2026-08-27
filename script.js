document.addEventListener('DOMContentLoaded', function() {
  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      const currentText = this.textContent.trim();
      if (currentText.includes('ES')) {
        this.innerHTML = '[ EN <span class="lang-separator">|</span> ES ]';
      } else {
        this.innerHTML = '[ ES <span class="lang-separator">|</span> EN ]';
      }
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === '#inicio')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});