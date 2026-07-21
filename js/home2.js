/* home2.js - AquaRise Home2 Interactions */
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
  const counters = document.querySelectorAll('.hero2-stat-card h4[data-target]');
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
    const statsWrap = document.querySelector('.hero2-stats');
    if (statsWrap && !countersAnimated) {
      const rect = statsWrap.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        runCounters();
      }
    }
  }

  checkCounters();
  window.addEventListener('scroll', checkCounters);

  // ============ TIMETABLE RESERVE BUTTONS ============
  const reserveBtns = document.querySelectorAll('.reserve-seat-btn');
  reserveBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const batchName = this.closest('.timetable-card')?.querySelector('h3')?.innerText || 'this batch';
      if (typeof window.showToast === 'function') {
        window.showToast(`Seat reserved for ${batchName}! We will contact you shortly.`);
      } else {
        alert(`Seat reserved for ${batchName}! We will contact you shortly.`);
      }
    });
  });

  // ============ ENROLL BUTTONS (Age Programs) ============
  const enrollBtns = document.querySelectorAll('.enroll-btn');
  enrollBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const program = this.closest('.age-card')?.querySelector('.age-label')?.innerText || 'this program';
      if (typeof window.showToast === 'function') {
        window.showToast(`Enrolled in ${program} program! Welcome to AquaRise.`);
      } else {
        alert(`Enrolled in ${program} program! Welcome to AquaRise.`);
      }
    });
  });

  // ============ JOIN NOW BUTTONS (Skill Levels) ============
  const joinBtns = document.querySelectorAll('.skill-join-btn');
  joinBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const level = this.closest('.skill-card')?.querySelector('h3')?.innerText || 'this level';
      if (typeof window.showToast === 'function') {
        window.showToast(`You joined ${level}! Let's start swimming.`);
      } else {
        alert(`You joined ${level}! Let's start swimming.`);
      }
    });
  });

  // ============ MEMBERSHIP JOIN BUTTONS ============
  const membershipBtns = document.querySelectorAll('.membership-join-btn');
  membershipBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const plan = this.closest('.membership-card')?.querySelector('h3')?.innerText || 'this plan';
      if (typeof window.showToast === 'function') {
        window.showToast(`You selected the ${plan}. Welcome to AquaRise!`);
      } else {
        alert(`You selected the ${plan}. Welcome to AquaRise!`);
      }
    });
  });

  // ============ COMPETITION CTA BUTTON ============
  const championBtn = document.getElementById('champion-btn');
  if (championBtn) {
    championBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Your journey to becoming a champion starts now! We will contact you.');
      } else {
        alert('Your journey to becoming a champion starts now! We will contact you.');
      }
    });
  }

  // ============ HERO BUTTONS ============
  const viewProgramsBtn = document.getElementById('view-programs-btn');
  if (viewProgramsBtn) {
    viewProgramsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('skill-levels')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const bookAssessmentBtn = document.getElementById('book-assessment-btn');
  if (bookAssessmentBtn) {
    bookAssessmentBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('Assessment booked! Our team will reach out to schedule your session.');
      } else {
        alert('Assessment booked! Our team will reach out to schedule your session.');
      }
    });
  }

});
