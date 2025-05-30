document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initDarkMode();
    initScroller();
    initNavigation();
    initBackToTop();
    initLandingPage();
    initDynamicYear();
});

// Dark Mode Toggle - Improved with better state management
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.innerHTML = '🌙 Dark Mode';
    darkModeToggle.className = 'dark-mode-toggle';
    
    // Apply styles via CSS class instead of inline styles
    document.body.appendChild(darkModeToggle);
    
    // Check for saved preference or system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode === 'enabled' || (!savedMode && prefersDark)) {
        enableDarkMode(darkModeToggle);
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            enableDarkMode(darkModeToggle);
        } else {
            disableDarkMode(darkModeToggle);
        }
    });
}

function enableDarkMode(toggle) {
    toggle.innerHTML = '☀️ Light Mode';
    localStorage.setItem('darkMode', 'enabled');
    document.body.classList.add('dark-mode');
}

function disableDarkMode(toggle) {
    toggle.innerHTML = '🌙 Dark Mode';
    localStorage.setItem('darkMode', 'disabled');
    document.body.classList.remove('dark-mode');
}

// Scroller Effect - Optimized with IntersectionObserver
function initScroller() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scrollers = document.querySelectorAll(".scroller:not([data-animated])");
    
    scrollers.forEach(scroller => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateScroller(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(scroller);
    });
}

function animateScroller(scroller) {
    scroller.setAttribute('data-animated', 'true');
    const scrollerInner = scroller.querySelector(".scroller__inner");
    if (!scrollerInner) return;

    const scrollerContent = Array.from(scrollerInner.children);
    const fragment = document.createDocumentFragment();
    
    scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", "true");
        fragment.appendChild(duplicatedItem);
    });

    scrollerInner.appendChild(fragment);
}

// Navigation - Improved with event delegation
function initNavigation() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        
        if (href?.startsWith('#article-')) {
            e.preventDefault();
            showArticle(href);
        } else if (href === '#contact') {
            e.preventDefault();
            showArticle('#contact');
        } else if (href === '#articles') {
            e.preventDefault();
            showMainArticles();
        }
    });
}

function showArticle(articleId) {
    // Hide all article pages
    document.querySelectorAll('.article-page').forEach(page => {
        page.style.display = 'none';
    });

    // Hide main article section
    const mainArticle = document.querySelector('#article');
    if (mainArticle) mainArticle.style.display = 'none';

    // Show target article
    const target = document.querySelector(articleId);
    if (target) {
        target.style.display = 'block';
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showMainArticles() {
    document.querySelectorAll('.article-page').forEach(page => {
        page.style.display = 'none';
    });

    const mainArticle = document.querySelector('#article');
    if (mainArticle) {
        mainArticle.style.display = 'block';
        mainArticle.scrollIntoView({ behavior: 'smooth' });
    }
}

// Back to Top - Optimized with throttling
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;

    const handleScroll = throttle(() => {
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Landing Page - Improved with better transitions
function initLandingPage() {
    const landingPage = document.getElementById('landingPage');
    const ctaButton = document.getElementById('ctaButton');
    const mainContent = document.getElementById('mainContent');
    if (!landingPage || !ctaButton || !mainContent) return;

    document.body.classList.add('landing-active');
    mainContent.style.display = 'none';

    ctaButton.addEventListener('click', () => {
        landingPage.style.opacity = '0';
        landingPage.style.pointerEvents = 'none';
        
        setTimeout(() => {
            landingPage.style.display = 'none';
            mainContent.style.display = 'block';
            document.body.classList.remove('landing-active');
        }, 300); // Match this with your CSS transition duration
    });
}

// Dynamic Year - Simple utility
function initDynamicYear() {
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Utility function for throttling
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Optional: Confetti effect with better performance
function initConfetti() {
    const confettiBtn = document.getElementById('confetti-btn');
    if (!confettiBtn) return;

    confettiBtn.addEventListener('click', (e) => {
        // Get button position to center the confetti
        const btnRect = confettiBtn.getBoundingClientRect();
        const centerX = btnRect.left + btnRect.width / 2;
        const centerY = btnRect.top + btnRect.height / 2;
        
        createConfettiBurst(centerX, centerY);
    });
}

function createConfettiBurst(centerX, centerY) {
    const colors = [
        '#4361ee', // Your primary color
        '#f72585', // Your secondary color
        '#4cc9f0', // A light blue
        '#7209b7', // A purple
        '#3a0ca3'  // A dark blue
    ];
    
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    const particleCount = 100;
    const angleIncrement = (Math.PI * 2) / particleCount;
    
    for (let i = 0; i < particleCount; i++) {
        createConfettiParticle(container, colors, centerX, centerY, angleIncrement * i);
    }

    setTimeout(() => {
        container.remove();
    }, 3000);
}

function createConfettiParticle(container, colors, centerX, centerY, angle) {
    const size = Math.random() * 10 + 5;
    const particle = document.createElement('div');
    
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.transformOrigin = 'center center';
    
    // Random shape (50% chance to be square)
    if (Math.random() > 0.5) {
        particle.style.borderRadius = '0';
    }
    
    container.appendChild(particle);

    // Calculate movement with some randomness
    const velocity = 2 + Math.random() * 3;
    const distance = 50 + Math.random() * 100;
    const rotation = Math.random() * 360;
    
    const xMovement = Math.cos(angle) * distance;
    const yMovement = Math.sin(angle) * distance;
    
    const animation = particle.animate([
        { 
            transform: `translate(0, 0) rotate(0deg)`,
            opacity: 1 
        },
        { 
            transform: `translate(${xMovement}px, ${yMovement}px) rotate(${rotation}deg)`,
            opacity: 0 
        }
    ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
    });

    animation.onfinish = () => particle.remove();
}
