// maintenance.js - AquaRise Maintenance Page Interactions

document.addEventListener('DOMContentLoaded', function () {

  // ============ Scroll Reveal ============
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.2 });
  revealElements.forEach(el => revealObserver.observe(el));

  // ============ Countdown Timer (7 days from page load) ============
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  futureDate.setHours(9, 0, 0, 0);

  const updateCountdown = () => {
    const now = new Date();
    let diff = futureDate - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('count-days').textContent = String(days).padStart(2, '0');
    document.getElementById('count-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('count-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('count-seconds').textContent = String(seconds).padStart(2, '0');
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ============ Notify Form Validation ============
  const notifyForm = document.getElementById('notify-form');
  if (notifyForm) {
    const nameInput = document.getElementById('notify-name');
    const emailInput = document.getElementById('notify-email');
    const successMsg = document.getElementById('notify-success');
    const formContent = document.getElementById('notify-content');

    const validateField = (field) => {
      const val = field.value.trim();
      field.classList.remove('error');
      if (!val) { field.classList.add('error'); return false; }
      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { field.classList.add('error'); return false; }
      return true;
    };

    [nameInput, emailInput].forEach(f => {
      f.addEventListener('blur', () => validateField(f));
      f.addEventListener('input', function () { if (this.classList.contains('error')) validateField(this); });
    });

    notifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const validName = validateField(nameInput);
      const validEmail = validateField(emailInput);

      if (!validName || !validEmail) {
        window.showToast && window.showToast('Please fill in all fields correctly.', 'error');
        return;
      }

      const btn = this.querySelector('.btn-submit');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

      setTimeout(() => {
        notifyForm.reset();
        window.showToast && window.showToast('You\'ll be notified when we\'re back!', 'success');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-bell"></i> Notify Me';
      }, 1200);
    });
  }

  // ============ Refresh Button ============
  document.getElementById('refresh-btn')?.addEventListener('click', function (e) {
    e.preventDefault();
    location.reload();
  });
});
