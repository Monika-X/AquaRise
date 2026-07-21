// signup.js - AquaRise Signup Page Interactions

document.addEventListener('DOMContentLoaded', function () {

  // ============ Scroll Reveal ============
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.15 });
  revealElements.forEach(el => revealObserver.observe(el));

  // ============ Password Toggle ============
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function () {
      const input = this.closest('.input-wrapper').querySelector('input');
      if (!input) return;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  });

  // ============ Password Strength Meter ============
  const passInput = document.getElementById('reg-password');
  const strengthBars = document.querySelectorAll('.strength-bar');
  const strengthText = document.getElementById('strength-text');

  if (passInput && strengthBars.length && strengthText) {
    passInput.addEventListener('input', function () {
      const val = this.value;
      const bars = strengthBars;
      let level = 0;

      if (val.length >= 6) level = 1;
      if (val.length >= 8 && /[A-Z]/.test(val) && /[a-z]/.test(val)) level = 2;
      if (val.length >= 10 && /[A-Z]/.test(val) && /[a-z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val)) level = 3;

      bars.forEach((bar, i) => {
        bar.className = 'strength-bar';
        if (i < level) {
          if (level === 1) bar.classList.add('weak');
          else if (level === 2) bar.classList.add('medium');
          else if (level === 3) bar.classList.add('strong');
        }
      });

      const labels = ['Weak', 'Medium', 'Strong'];
      strengthText.textContent = level > 0 ? labels[level - 1] : '';
      strengthText.style.color = level === 1 ? '#E63946' : level === 2 ? '#FFC857' : level === 3 ? '#2A9D8F' : 'transparent';
    });
  }

  // ============ Registration Form Validation ============
  const regForm = document.getElementById('register-form');
  if (regForm) {
    const fields = {
      name: { el: document.getElementById('reg-name'), error: document.getElementById('name-error'), validate: v => v.trim().length >= 2, msg: 'Please enter your full name (at least 2 characters).' },
      email: { el: document.getElementById('reg-email'), error: document.getElementById('email-error'), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
      phone: { el: document.getElementById('reg-phone'), error: document.getElementById('phone-error'), validate: v => /^[\d\s\-\+\(\)]{7,20}$/.test(v.trim()), msg: 'Please enter a valid phone number.' },
      age: { el: document.getElementById('reg-age'), error: document.getElementById('age-error'), validate: v => { const n = parseInt(v); return !isNaN(n) && n >= 3 && n <= 100; }, msg: 'Please enter a valid age between 3 and 100.' },
      program: { el: document.getElementById('reg-program'), error: document.getElementById('program-error'), validate: v => v !== '', msg: 'Please select a program.' },
      password: { el: document.getElementById('reg-password'), error: document.getElementById('password-error'), validate: v => v.length >= 6, msg: 'Password must be at least 6 characters.' },
      confirm: { el: document.getElementById('reg-confirm'), error: document.getElementById('confirm-error'), validate: v => v === passInput.value, msg: 'Passwords do not match.' }
    };
    const termsCheck = document.getElementById('agree-terms');
    const termsError = document.getElementById('terms-error');

    const validateField = (key) => {
      const f = fields[key];
      if (!f) return true;
      const val = f.el.value.trim();
      f.el.classList.remove('error');
      f.error.classList.remove('show');
      if (!f.validate(val)) { f.el.classList.add('error'); f.error.textContent = f.msg; f.error.classList.add('show'); return false; }
      return true;
    };

    const validateTerms = () => {
      termsCheck.classList.remove('error');
      termsError.classList.remove('show');
      if (!termsCheck.checked) { termsCheck.classList.add('error'); termsError.textContent = 'You must agree to the Terms & Conditions.'; termsError.classList.add('show'); return false; }
      return true;
    };

    // Blur events
    Object.keys(fields).forEach(k => {
      const f = fields[k];
      if (!f) return;
      f.el.addEventListener('blur', () => validateField(k));
      f.el.addEventListener('input', function () { if (this.classList.contains('error')) validateField(k); });
    });
    termsCheck.addEventListener('change', () => { if (termsCheck.classList.contains('error')) validateTerms(); });

    // Confirm password re-check on password change
    if (passInput) {
      passInput.addEventListener('input', function () {
        if (fields.confirm.el.value && fields.confirm.el.classList.contains('error')) validateField('confirm');
      });
    }

    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      Object.keys(fields).forEach(k => { if (!validateField(k)) valid = false; });
      if (!validateTerms()) valid = false;

      if (!valid) {
        window.showToast && window.showToast('Please fix the highlighted fields.', 'error');
        return;
      }

      const btn = this.querySelector('.signup-btn');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';

      setTimeout(() => {
        window.location.href = '../index.html';
        window.showToast && window.showToast('Account created successfully! Welcome to AquaRise.', 'success');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
      }, 2000);
    });
  }

  // ============ Smooth scroll for anchor links ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});
