// faq.js - AquaRise FAQ Page Interactions

document.addEventListener('DOMContentLoaded', function () {

  // ============ Scroll Reveal ============
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.15 });
  revealElements.forEach(el => revealObserver.observe(el));

  // ============ Accordion ============
  const accordions = document.querySelectorAll('.faq-accordion');
  accordions.forEach(container => {
    const items = container.querySelectorAll('.faq-item');
    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Close all others in this accordion
        items.forEach(other => other.classList.remove('active'));

        if (!isActive) item.classList.add('active');
      });
    });
  });

  // ============ Search ============
  const searchInput = document.getElementById('faq-search');
  const searchCount = document.getElementById('search-count');
  const noResults = document.getElementById('faq-no-results');

  if (searchInput) {
    // Combine all accordion items across all accordions
    const allItems = document.querySelectorAll('.popular-section .faq-item, .facilities-faq-grid .faq-item, .programs-faq-section .faq-item');
    const allPfCards = document.querySelectorAll('.pf-card');

    const filterItems = (term) => {
      const q = term.toLowerCase().trim();
      let visibleCount = 0;
      let totalCount = 0;

      // Filter accordion items
      document.querySelectorAll('.faq-accordion, .facilities-faq-grid').forEach(container => {
        const items = container.querySelectorAll('.faq-item');
        items.forEach(item => {
          totalCount++;
          const text = item.textContent.toLowerCase();
          if (!q || text.includes(q)) {
            item.style.display = '';
            visibleCount++;
          } else {
            item.style.display = 'none';
            item.classList.remove('active');
          }
        });
      });

      // Filter pf-cards
      allPfCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (searchCount) searchCount.textContent = visibleCount + ' results';
      if (noResults) noResults.style.display = visibleCount === 0 && q ? 'block' : 'none';
    };

    searchInput.addEventListener('input', function () { filterItems(this.value); });
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
