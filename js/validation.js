/* validation.js - Client-side validation and toast notifications */
document.addEventListener('DOMContentLoaded', () => {
  // Toast notification container
  const toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
  document.body.appendChild(toastContainer);

  window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      background: ${type === 'success' ? '#0B4F8C' : '#e53e3e'};
      color: #fff;
      padding: 12px 24px;
      border-radius: 50px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      font-family: 'Manrope', sans-serif;
      font-weight: 600;
      font-size: 0.9rem;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    toast.innerText = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // Form submit interceptors (skip forms with custom page-specific validation)
  const forms = document.querySelectorAll('form:not([data-no-global-validate])');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#e53e3e';
        } else {
          input.style.borderColor = 'var(--border-color)';
        }
      });

      if (isValid) {
        showToast('Thank you! Your request has been submitted successfully.');
        form.reset();
      } else {
        showToast('Please fill in all required fields.', 'error');
      }
    });
  });
});
