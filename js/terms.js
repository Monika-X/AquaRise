// terms.js - AquaRise Terms & Conditions Page Interactions

document.addEventListener('DOMContentLoaded', function () {

  // ============ Scroll Reveal ============
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.15 });
  revealElements.forEach(el => revealObserver.observe(el));

  // ============ Sticky TOC Active Section ============
  const tocLinks = document.querySelectorAll('.terms-toc a');
  const sections = document.querySelectorAll('.terms-block');

  if (tocLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });
    sections.forEach(s => sectionObserver.observe(s));
  }

  // ============ Smooth scroll for TOC links ============
  document.querySelectorAll('.terms-toc a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ============ Smooth scroll for other anchors ============
  document.querySelectorAll('a[href^="#"]:not(.terms-toc a)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ============ Agreement Checkbox + CTA Reveal ============
  const agreeCheckbox = document.getElementById('agree-terms');
  const hiddenCta = document.getElementById('terms-cta-reveal');

  if (agreeCheckbox && hiddenCta) {
    agreeCheckbox.addEventListener('change', function () {
      if (this.checked) {
        hiddenCta.classList.add('show');
        hiddenCta.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        hiddenCta.classList.remove('show');
      }
    });
  }
});
