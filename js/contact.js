// contact.js - AquaRise Contact Page Interactions

document.addEventListener('DOMContentLoaded', function () {

  // ============ Scroll Reveal ============
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============ Contact Form Validation ============
  const contactForm = document.getElementById('enquiry-form');
  if (contactForm) {
    const successMsg = document.getElementById('form-success');
    const formFields = contactForm.querySelectorAll('input, select, textarea');

    const validateField = (field) => {
      const value = field.value.trim();
      field.classList.remove('error');

      if (field.hasAttribute('required') && !value) { field.classList.add('error'); return false; }
      if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { field.classList.add('error'); return false; }
      if (field.type === 'tel' && value && !/^[\d\s\-\+\(\)]{7,20}$/.test(value)) { field.classList.add('error'); return false; }
      if (field.id === 'agree-terms' && !field.checked) { field.classList.add('error'); return false; }

      return true;
    };

    const validateAll = () => {
      let valid = true;
      formFields.forEach(f => { if (!validateField(f)) valid = false; });
      return valid;
    };

    formFields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => { if (field.classList.contains('error')) validateField(field); });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateAll()) {
        window.showToast && window.showToast('Please correct the highlighted fields.', 'error');
        return;
      }

      // Simulate submission
      const submitBtn = this.querySelector('.btn-submit');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        contactForm.reset();
        window.showToast && window.showToast('Enquiry submitted successfully! We\'ll contact you soon.', 'success');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Enquiry';
      }, 1500);
    });

    // Reset button
    const resetBtn = contactForm.querySelector('.btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        contactForm.reset();
        formFields.forEach(f => f.classList.remove('error'));
        window.showToast && window.showToast('Form has been reset.', 'info');
      });
    }
  }

  // ============ FAQ Item Hover Effect ============
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.borderColor = 'var(--secondary-color)';
    });
    item.addEventListener('mouseleave', function () {
      this.style.borderColor = '';
    });
  });

  // ============ Smooth scroll for anchor links ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
