// booking.js - AquaRise Booking Page Interactions

document.addEventListener('DOMContentLoaded', function () {

  // ============ Scroll Reveal ============
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============ Date Picker: Set min date to today ============
  const startDateInput = document.getElementById('start-date');
  if (startDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    startDateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
  }

  // ============ Program Selection Buttons ============
  const selectProgramBtns = document.querySelectorAll('.select-program-btn');
  const programSelect = document.getElementById('program-select');

  selectProgramBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const program = this.getAttribute('data-program');
      if (programSelect) {
        programSelect.value = program;
        programSelect.dispatchEvent(new Event('change'));
        if (typeof window.showToast === 'function') {
          window.showToast(`Program "${program}" selected! Fill in your details below.`, 'success');
        }
      }
      updateBookingSummary();
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ============ Batch Selection Buttons ============
  const selectBatchBtns = document.querySelectorAll('.select-batch-btn');
  const batchSelect = document.getElementById('batch-select');

  selectBatchBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const batch = this.getAttribute('data-batch');
      if (batchSelect) {
        batchSelect.value = batch;
        batchSelect.dispatchEvent(new Event('change'));
        if (typeof window.showToast === 'function') {
          window.showToast(`Batch "${batch}" selected! Complete your booking now.`, 'success');
        }
      }
      updateBookingSummary();
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ============ Booking Summary Update ============
  function updateBookingSummary() {
    const summaryList = document.getElementById('booking-summary');
    if (!summaryList) return;

    const program = programSelect ? programSelect.value : '';
    const batch = batchSelect ? batchSelect.value : '';

    let html = '';
    if (program) {
      html += `<li><i class="fas fa-check-circle" style="color:var(--secondary-color)"></i> <strong>Program:</strong> ${program}</li>`;
    } else {
      html += `<li><i class="fas fa-check"></i> No program selected yet</li>`;
    }
    if (batch) {
      html += `<li><i class="fas fa-check-circle" style="color:var(--secondary-color)"></i> <strong>Batch:</strong> ${batch}</li>`;
    } else {
      html += `<li><i class="fas fa-check"></i> No batch selected yet</li>`;
    }

    summaryList.innerHTML = html;

    const cards = summaryList.closest('.form-side-card')?.querySelectorAll('ul li');
  }

  if (programSelect) {
    programSelect.addEventListener('change', updateBookingSummary);
  }
  if (batchSelect) {
    batchSelect.addEventListener('change', updateBookingSummary);
  }

  // ============ Booking Form Validation ============
  const bookingForm = document.getElementById('booking-form-element');
  if (bookingForm) {
    const successMsg = document.getElementById('form-success');
    const formFields = bookingForm.querySelectorAll('input, select, textarea');

    const validateField = (field) => {
      const value = field.value.trim();
      field.classList.remove('error');

      if (field.hasAttribute('required') && !value) { field.classList.add('error'); return false; }
      if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { field.classList.add('error'); return false; }
      if (field.type === 'tel' && value && !/^[\d\s\-\+\(\)]{7,20}$/.test(value)) { field.classList.add('error'); return false; }
      if (field.type === 'number' && value && (isNaN(value) || parseInt(value) < 1 || parseInt(value) > 120)) { field.classList.add('error'); return false; }
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
      field.addEventListener('change', () => { if (field.classList.contains('error')) validateField(field); });
    });

    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateAll()) {
        const firstError = this.querySelector('.error');
        if (firstError) {
          firstError.focus();
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (typeof window.showToast === 'function') {
          window.showToast('Please correct the highlighted fields before submitting.', 'error');
        }
        return;
      }

      const submitBtn = this.querySelector('.btn-submit');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

      setTimeout(() => {
        bookingForm.reset(); updateBookingSummary();
        if (typeof window.showToast === 'function') {
          window.showToast('Booking confirmed! Check your email for program details.', 'success');
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Confirm Booking';
      }, 1800);
    });

    // Reset button
    const resetBtn = bookingForm.querySelector('.btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        bookingForm.reset();
        formFields.forEach(f => f.classList.remove('error'));
        updateBookingSummary();
        if (typeof window.showToast === 'function') {
          window.showToast('Form has been reset.', 'info');
        }
      });
    }
  }

  // ============ Pricing Button Handlers ============
  const pricingBtns = document.querySelectorAll('.pricing-btn');
  pricingBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const plan = this.getAttribute('data-plan');
      if (typeof window.showToast === 'function') {
        window.showToast(`You selected the ${plan}. Our team will contact you for enrollment.`, 'success');
      }
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

  // ============ Active link highlight on scroll ============
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // ============ Set default date value ============
  if (startDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    if (!startDateInput.value) {
      startDateInput.value = `${yyyy}-${mm}-${dd}`;
    }
  }

});
