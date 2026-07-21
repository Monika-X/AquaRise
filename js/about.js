/* about.js - AquaRise About Page Interactions */
document.addEventListener('DOMContentLoaded', () => {

  // ============ SCROLL REVEAL ============
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  checkReveal();
  window.addEventListener('scroll', checkReveal);

  // ============ COUNTER ANIMATION ============
  const counters = document.querySelectorAll('.story-stat h4[data-target]');
  let countersAnimated = false;

  function runCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const suffix = counter.dataset.suffix || '';
      let count = 0;
      const speed = target / 40;
      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count) + suffix;
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + suffix;
        }
      };
      updateCount();
    });
  }

  function checkCounters() {
    const statsWrap = document.querySelector('.story-stats');
    if (statsWrap && !countersAnimated) {
      const rect = statsWrap.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        runCounters();
      }
    }
  }

  checkCounters();
  window.addEventListener('scroll', checkCounters);

  // ============ TIMELINE ANIMATION ============
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });

  // ============ HERO CTA BUTTON ============
  const joinAcademyBtn = document.getElementById('join-academy-btn');
  if (joinAcademyBtn) {
    joinAcademyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Welcome to AquaRise! Our team will reach out to guide you.');
      } else {
        alert('Welcome to AquaRise! Our team will reach out to guide you.');
      }
    });
  }

  // ============ ACHIEVEMENT CTA BUTTONS ============
  const enrollNowBtn = document.getElementById('enroll-now-btn');
  if (enrollNowBtn) {
    enrollNowBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Enrollment started! Welcome to the AquaRise family.');
      } else {
        alert('Enrollment started! Welcome to the AquaRise family.');
      }
    });
  }

  const contactUsBtn = document.getElementById('contact-us-btn');
  if (contactUsBtn) {
    contactUsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const contactPage = this.getAttribute('href');
      if (contactPage && contactPage !== '#') {
        window.location.href = contactPage;
      }
    });
  }

});
