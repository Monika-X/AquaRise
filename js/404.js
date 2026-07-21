// 404.js - AquaRise 404 Page Interactions

document.addEventListener('DOMContentLoaded', function () {

  // ============ Scroll Reveal ============
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.2 });
  revealElements.forEach(el => revealObserver.observe(el));

  // ============ Search Box UI ============
  const searchInput = document.getElementById('error-search-input');
  const searchBtn = document.querySelector('.error-search-box .search-btn');
  if (searchInput && searchBtn) {
    const doSearch = () => {
      const val = searchInput.value.trim();
      if (val) {
        window.showToast && window.showToast('Search is currently unavailable. Please try our navigation menu.', 'info');
      } else {
        window.showToast && window.showToast('Please enter a search term.', 'error');
      }
    };
    searchBtn.addEventListener('click', doSearch);
    searchInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSearch(); });
  }

  // ============ Smooth scroll ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});
