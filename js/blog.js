/* blog.js - AquaRise Blog Page Interactions */
document.addEventListener('DOMContentLoaded', () => {

  // ============ SCROLL REVEAL ============
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  function checkReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 60) el.classList.add('visible');
    });
  }
  checkReveal();
  window.addEventListener('scroll', checkReveal);

  // ============ SIDEBAR SEARCH & FILTER ============
  const searchForm = document.getElementById('sidebar-search-form');
  const searchInput = document.getElementById('sidebar-search-input');
  
  function filterCards(query) {
    const allCards = document.querySelectorAll('.blog-card, .news-card, .featured-card');
    query = query.toLowerCase();
    allCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      if (text.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      filterCards(query);
      document.getElementById('latest-articles')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    searchInput.addEventListener('input', function(e) {
      filterCards(this.value.trim());
    });
  }

  // Category Filtering
  const categoryLinks = document.querySelectorAll('.sidebar-categories a, .sidebar-tags a, .blog-cat-card');
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      let filterText = this.innerText.trim();
      
      if (!filterText) return;
      
      if (searchInput) searchInput.value = filterText;
      filterCards(filterText);
      
      // Scroll to articles
      document.getElementById('latest-articles')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ============ SIDEBAR POST CLICK ============

  const sidebarPosts = document.querySelectorAll('.sidebar-post');
  sidebarPosts.forEach(post => {
    post.addEventListener('click', function() {
      const title = this.querySelector('.sp-title')?.innerText || 'this post';
      if (typeof window.showToast === 'function') {
        window.showToast(`Opening "${title}"`);
      }
    });
  });

  // ============ NEWSLETTER FORM ============
  const newsletterForm = document.getElementById('blog-newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('newsletter-name');
      const email = document.getElementById('newsletter-email');
      let valid = true;

      if (!name.value.trim()) {
        name.style.borderColor = '#ef4444';
        valid = false;
      } else {
        name.style.borderColor = 'rgba(255,255,255,0.2)';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        email.style.borderColor = '#ef4444';
        valid = false;
      } else {
        email.style.borderColor = 'rgba(255,255,255,0.2)';
      }

      if (valid) {
        if (typeof window.showToast === 'function') {
          window.showToast('Thank you for subscribing to AquaRise newsletter!');
        } else {
          alert('Thank you for subscribing to AquaRise newsletter!');
        }
        newsletterForm.reset();
      } else {
        if (typeof window.showToast === 'function') {
          window.showToast('Please fill in all fields correctly.', 'error');
        } else {
          alert('Please fill in all fields correctly.');
        }
      }
    });
  }

  // ============ EXPLORE ARTICLES HERO BUTTON ============
  const exploreBtn = document.getElementById('explore-articles-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('latest-articles')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ============ NEWSLETTER CTA BUTTONS ============
  const viewProgramsBtn = document.getElementById('blog-view-programs');
  if (viewProgramsBtn) {
    viewProgramsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Redirecting to programs page...');
      }
      setTimeout(() => { window.location.href = 'services.html'; }, 500);
    });
  }

  const contactBtn = document.getElementById('blog-contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href && href !== '#') window.location.href = href;
    });
  }

});
