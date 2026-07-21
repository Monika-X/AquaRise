/* gallery.js - AquaRise Gallery Page Interactions */
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

  // ============ GALLERY FILTER ============
  const filterBtns = document.querySelectorAll('.filter-btn');
  const masonryItems = document.querySelectorAll('.masonry-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;

      masonryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ============ LIGHTBOX ============
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentIndex = 0;
  let lightboxItems = [];

  const viewBtns = document.querySelectorAll('.view-btn');
  viewBtns.forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const item = this.closest('.masonry-item');
      const allVisible = document.querySelectorAll('.masonry-item:not(.hidden)');
      lightboxItems = Array.from(allVisible).filter(el => {
        const img = el.querySelector('img');
        return img && img.getAttribute('src');
      });
      currentIndex = lightboxItems.indexOf(item);
      if (currentIndex === -1) currentIndex = 0;
      openLightbox();
    });
  });

  // Also click on image opens lightbox
  masonryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      if (this.classList.contains('hidden')) return;
      const allVisible = document.querySelectorAll('.masonry-item:not(.hidden)');
      lightboxItems = Array.from(allVisible).filter(el => {
        const img = el.querySelector('img');
        return img && img.getAttribute('src');
      });
      currentIndex = lightboxItems.indexOf(this);
      if (currentIndex === -1) currentIndex = 0;
      openLightbox();
    });
  });

  function openLightbox() {
    if (lightboxItems.length === 0) return;
    const item = lightboxItems[currentIndex];
    const img = item.querySelector('img');
    const label = item.querySelector('.masonry-label')?.innerText || '';
    const title = item.querySelector('h4')?.innerText || '';

    lightboxImg.src = img.getAttribute('src');
    lightboxCaption.textContent = title || label || 'AquaRise Gallery';
    lightboxCounter.textContent = `${currentIndex + 1} / ${lightboxItems.length}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateNavButtons();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigateLightbox(dir) {
    currentIndex += dir;
    if (currentIndex < 0) currentIndex = lightboxItems.length - 1;
    if (currentIndex >= lightboxItems.length) currentIndex = 0;
    const item = lightboxItems[currentIndex];
    const img = item.querySelector('img');
    const label = item.querySelector('.masonry-label')?.innerText || '';
    const title = item.querySelector('h4')?.innerText || '';

    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = img.getAttribute('src');
      lightboxCaption.textContent = title || label || 'AquaRise Gallery';
      lightboxCounter.textContent = `${currentIndex + 1} / ${lightboxItems.length}`;
      lightboxImg.style.opacity = 1;
    }, 150);
    updateNavButtons();
  }

  function updateNavButtons() {
    if (lightboxPrev) lightboxPrev.style.display = lightboxItems.length > 1 ? 'flex' : 'none';
    if (lightboxNext) lightboxNext.style.display = lightboxItems.length > 1 ? 'flex' : 'none';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

  // Close on overlay click
  lightbox?.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // ============ CAROUSEL ============
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  let currentSlide = 0;
  let autoSlideInterval;

  function goToSlide(index) {
    if (!track) return;
    currentSlide = index;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const sign = isRtl ? 1 : -1;
    
    track.style.transform = `translateX(${sign * currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoSlide(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  if (slides.length > 0) startAutoSlide();

  // ============ HERO BOOK TRIAL ============
  const bookTrialBtn = document.getElementById('gallery-book-trial');
  if (bookTrialBtn) {
    bookTrialBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Free trial booked! Our team will contact you to schedule.');
      } else {
        alert('Free trial booked! Our team will contact you to schedule.');
      }
    });
  }

  // ============ CTA BUTTONS ============
  const joinBtn = document.getElementById('gallery-join-btn');
  if (joinBtn) {
    joinBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Welcome to AquaRise! Your journey starts now.');
      } else {
        alert('Welcome to AquaRise! Your journey starts now.');
      }
    });
  }

  const contactBtn = document.getElementById('gallery-contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href && href !== '#') window.location.href = href;
    });
  }

});
