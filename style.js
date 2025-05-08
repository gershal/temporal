// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Check for saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Navigation
function showArticle(articleId) {
  // Hide all article pages and contact
  document.querySelectorAll('.article-page').forEach(page => {
    page.style.display = 'none';
  });
  
  // Show requested article
  const target = document.querySelector(articleId);
  if (target) {
    target.style.display = 'block';
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Set up article navigation
document.querySelectorAll('a[href^="#article-"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showArticle(link.getAttribute('href'));
  });
});

// Contact page navigation
document.querySelectorAll('a[href="#contact"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showArticle('#contact');
  });
});

// Back to articles
document.querySelectorAll('a[href="#articles"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#articles').scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.article-page').forEach(page => {
      page.style.display = 'none';
    });
  });
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  contactForm.reset();
});

// Enhanced Form Handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
e.preventDefault();

// Get form values
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const subject = document.getElementById('subject').value;
const message = document.getElementById('message').value;
const newsletter = document.getElementById('newsletter').checked;

// Simple validation
if (!name || !email || !message) {
  alert('Please fill in all required fields');
  return;
}

// In a real app, you would send this data to a server
console.log('Form submitted:', { name, email, subject, message, newsletter });

// Show success message
const successMessage = document.createElement('div');
successMessage.className = 'alert';
successMessage.innerHTML = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
  <p>Thank you for your message! We'll get back to you soon.</p>
`;

this.parentNode.insertBefore(successMessage, this.nextSibling);
this.reset();

// Scroll to success message
setTimeout(() => {
  successMessage.scrollIntoView({ behavior: 'smooth' });
}, 100);
});
