/* services.js - AquaRise Services Page Interactions */
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

  // ============ ENROLL NOW BUTTONS ============
  const enrollBtns = document.querySelectorAll('.enroll-now-btn');
  enrollBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const program = this.closest('.beginner-content, .ia-card, .specialized-card, .camps-item')
        ?.querySelector('h2, h3, h4')?.innerText || 'this program';
      if (typeof window.showToast === 'function') {
        window.showToast(`Enrolled in ${program}! Welcome to AquaRise.`);
      } else {
        alert(`Enrolled in ${program}! Welcome to AquaRise.`);
      }
    });
  });

  // ============ READ MORE BUTTONS ============
  const readMoreBtns = document.querySelectorAll('.read-more-btn');
  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const program = this.closest('.ia-card')?.querySelector('h3')?.innerText || 'this program';
      if (typeof window.showToast === 'function') {
        window.showToast(`Viewing details for ${program}. More information coming soon!`);
      } else {
        alert(`Viewing details for ${program}. More information coming soon!`);
      }
    });
  });

  // ============ HERO BUTTONS ============
  const bookTrialBtn = document.getElementById('book-trial-btn-hero');
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

  const viewProgramsBtn = document.getElementById('view-programs-btn-hero');
  if (viewProgramsBtn) {
    viewProgramsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('beginner-program')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ============ CAMPS & COMPETITIVE BUTTONS ============
  const joinCampBtn = document.getElementById('join-camp-btn');
  if (joinCampBtn) {
    joinCampBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Camp registration started! Get ready for an amazing summer at AquaRise.');
      } else {
        alert('Camp registration started! Get ready for an amazing summer at AquaRise.');
      }
    });
  }

  const becomeAthleteBtn = document.getElementById('become-athlete-btn');
  if (becomeAthleteBtn) {
    becomeAthleteBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Your athlete journey begins! Our coaches will guide you to the podium.');
      } else {
        alert('Your athlete journey begins! Our coaches will guide you to the podium.');
      }
    });
  }

  // ============ CTA BUTTONS ============
  const ctaEnrollBtn = document.getElementById('cta-enroll-btn');
  if (ctaEnrollBtn) {
    ctaEnrollBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Enrollment started! Welcome to the AquaRise family.');
      } else {
        alert('Enrollment started! Welcome to the AquaRise family.');
      }
    });
  }

  const ctaContactBtn = document.getElementById('cta-contact-btn');
  if (ctaContactBtn) {
    ctaContactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const contactPage = this.getAttribute('href');
      if (contactPage && contactPage !== '#') {
        window.location.href = contactPage;
      }
    });
  }

});
