document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙 Dark Mode';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.top = '10px';
    darkModeToggle.style.right = '10px';
    darkModeToggle.style.padding = '8px 13px';
    darkModeToggle.style.background = 'var(--primary)';
    darkModeToggle.style.color = 'white';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.borderRadius = '4px';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.zIndex = '1000';
    
    document.body.appendChild(darkModeToggle);
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️ Light Mode';
    }

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '☀️ Light Mode';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.innerHTML = '🌙 Dark Mode';
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // [Keep your existing form handling code]
});


// Scroller Effect for Previous Articles
const scrollers = document.querySelectorAll(".scroller");

if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach(scroller => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);
        /*IF ===scrollerInner.children=== IS USED, IT WILL LEAD TO AN HTML COLLECTION WHEN CONSOLE LOGGED. MEANING IF THE LIST IS MODIFIED, IT WILL RESULT TO AN ENDLESS LOOP (REPETITION) SO INCLUDE ===Array.from()===*/

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

// Navigation
function showArticle(articleId) {
  // Hide all article pages and the main article section
  document.querySelectorAll('.article-page').forEach(page => {
    page.style.display = 'none';
  });

  const mainArticle = document.querySelector('#article');
  if (mainArticle) {
    mainArticle.style.display = 'none'; // hide the main article list
  }

  // Show the requested article or contact page
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

// Back to article list
document.querySelectorAll('a[href="#articles"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Hide all article pages (including contact)
    document.querySelectorAll('.article-page').forEach(page => {
      page.style.display = 'none';
    });

    // Show the main article section again
    const mainArticle = document.querySelector('#article');
    if (mainArticle) {
      mainArticle.style.display = 'block';
      mainArticle.scrollIntoView({ behavior: 'smooth' });
    }
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

document.addEventListener('DOMContentLoaded', function() {
  const landingPage = document.getElementById('landingPage');
  const ctaButton = document.getElementById('ctaButton');
  const mainContent = document.getElementById('mainContent');
  const darkModeToggle = document.getElementById('darkModeToggle');

  // Add landing-active class to body initially
  document.body.classList.add('landing-active');

  // Show main content when CTA is clicked
  ctaButton.addEventListener('click', function() {
    landingPage.classList.add('hidden');
    mainContent.classList.add('visible');

    // Remove landing-active class to restore scrolling
    document.body.classList.remove('landing-active');

    // Reset body positioning
    document.body.style.position = 'static';
    document.body.style.height = 'auto';
    });
});
