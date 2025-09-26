/* DOM element*/
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form');

const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }
};

const toggleMobileMenu = () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
};

const handleContactForm = (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  if (!name || !email || !subject || !message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }
  
  showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
  contactForm.reset();
  
  console.log('Contact form submitted:', { name, email, subject, message });
};

const updateThemeIcon = (theme) => {
  if (theme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
};

const showNotification = (message, type) => {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ${type === 'success' ? 'background-color: #10b981;' : 'background-color: #ef4444;'}
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme on page load
  initTheme();
  
  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Hamburger menu event listener
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }
  
  // Contact form event listener
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  // Close mobile menu when clicking on nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});


