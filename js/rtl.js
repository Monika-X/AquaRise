/* rtl.js - RTL/LTR Toggle Management */
document.addEventListener('DOMContentLoaded', () => {
  const rtlToggleBtn = document.getElementById('rtl-toggle');
  const savedDir = localStorage.getItem('aquarise_dir') || 'ltr';

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('aquarise_dir', dir);
    if (rtlToggleBtn) {
      rtlToggleBtn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      rtlToggleBtn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    }
  }

  applyDirection(savedDir);

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(nextDir);
    });
  }
});
