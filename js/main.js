/* main.js - Core UI Interactions */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // User Profile Dropdown Toggle (Mobile)
  const userBtn = document.querySelector('.user-btn');
  const userProfile = document.querySelector('.user-profile');
  if (userBtn && userProfile) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userProfile.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!userProfile.contains(e.target)) {
        userProfile.classList.remove('active');
      }
    });
  }

  // Back To Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active Link Highlight
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link, .user-dropdown a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPage === href.split('/').pop()) {
      link.classList.add('active');
    }
  });

  // Animated Counter for Stats
  const statValues = document.querySelectorAll('.stat-number');
  let animated = false;

  function runCounters() {
    statValues.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      let count = 0;
      const speed = target / 50;
      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count) + (counter.dataset.suffix || '');
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + (counter.dataset.suffix || '');
        }
      };
      updateCount();
    });
  }

  window.addEventListener('scroll', () => {
    const statsElem = document.querySelector('.stats-floating');
    if (statsElem && !animated) {
      const pos = statsElem.getBoundingClientRect().top;
      if (pos < window.innerHeight) {
        runCounters();
        animated = true;
      }
    }
  });

  // Testimonial Carousel Auto Slide
  const testimonials = [
    {
      name: "Sophia Martinez",
      role: "Parent & Adult Swimmer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      review: "AquaRise completely transformed my swimming technique! The certified coaches are patient, encouraging, and the Olympic-grade pool facilities are unmatched in the city.",
      stars: 5
    },
    {
      name: "Marcus Vance",
      role: "Triathlete Competitor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      review: "The competitive training program provided me with precision stroke analysis and stamina drills. I shaved 4 seconds off my personal best thanks to Coach Liam!",
      stars: 5
    },
    {
      name: "Elena Rostova",
      role: "Aqua Fitness Enthusiast",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      review: "Cleanest water, luxury amenities, and top safety standards! The women's batch gave me complete comfort and flexibility for my daily workouts.",
      stars: 5
    }
  ];

  let currentTestimonialIndex = 0;
  const testimonialContainer = document.getElementById('testimonial-card-content');

  function renderTestimonial(index) {
    if (!testimonialContainer) return;
    const t = testimonials[index];
    const starsHtml = '<i class="fas fa-star"></i>'.repeat(t.stars);
    testimonialContainer.style.opacity = 0;
    setTimeout(() => {
      testimonialContainer.innerHTML = `
        <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar">
        <div class="rating">${starsHtml}</div>
        <p class="testimonial-text">"${t.review}"</p>
        <div class="testimonial-author">
          <h4>${t.name}</h4>
          <span>${t.role}</span>
        </div>
      `;
      testimonialContainer.style.opacity = 1;
    }, 200);
  }

  renderTestimonial(0);

  setInterval(() => {
    if (testimonialContainer) {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      renderTestimonial(currentTestimonialIndex);
    }
  }, 5000);
});
