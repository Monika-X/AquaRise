// login.js - AquaRise Login Page Interactions

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

  // ============ Login Form Validation ============
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const successOverlay = document.getElementById('login-success');
    const loginContent = document.getElementById('login-content');

    const validateEmail = () => {
      const value = emailInput.value.trim();
      emailInput.classList.remove('error');
      emailError.classList.remove('show');
      if (!value) { emailInput.classList.add('error'); emailError.textContent = 'Email address is required.'; emailError.classList.add('show'); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { emailInput.classList.add('error'); emailError.textContent = 'Please enter a valid email address.'; emailError.classList.add('show'); return false; }
      return true;
    };

    const validatePassword = () => {
      const value = passwordInput.value.trim();
      passwordInput.classList.remove('error');
      passwordError.classList.remove('show');
      if (!value) { passwordInput.classList.add('error'); passwordError.textContent = 'Password is required.'; passwordError.classList.add('show'); return false; }
      if (value.length < 6) { passwordInput.classList.add('error'); passwordError.textContent = 'Password must be at least 6 characters.'; passwordError.classList.add('show'); return false; }
      return true;
    };

    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => { if (emailInput.classList.contains('error')) validateEmail(); });
    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', () => { if (passwordInput.classList.contains('error')) validatePassword(); });

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const validEmail = validateEmail();
      const validPass = validatePassword();

      if (!validEmail || !validPass) {
        window.showToast && window.showToast('Please fix the highlighted fields.', 'error');
        return;
      }

      const loginBtn = this.querySelector('.login-btn');
      loginBtn.disabled = true;
      loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';

      setTimeout(() => {
        window.location.href = '../index.html';
        window.showToast && window.showToast('Welcome back! Redirecting to your dashboard...', 'success');
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-lock"></i> Sign In';
      }, 1800);
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
