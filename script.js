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
        mainArticle.style.display = 'flex';
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

// Confetti effect
document.addEventListener('DOMContentLoaded', function() {
    initConfetti();
});

function initConfetti() {
    const confettiBtn = document.getElementById('confetti-btn');
    if (!confettiBtn) {
        console.warn('Confetti button not found');
        return;
    }

    confettiBtn.addEventListener('click', function(e) {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Create confetti container
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

        // Confetti colors
        const colors = [
            '#4361ee', // Primary color
            '#f72585', // Secondary color
            '#4cc9f0', // Light blue
            '#7209b7', // Purple
            '#3a0ca3'  // Dark blue
        ];

        // Create 100 pieces of confetti
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                createConfettiPiece(container, colors, viewportWidth, viewportHeight);
            }, i * 20);
        }

        // Remove container after animation completes
        setTimeout(() => {
            container.remove();
        }, 3000);
    });
}

function createConfettiPiece(container, colors, viewportWidth, viewportHeight) {
    const size = Math.random() * 10 + 5; // Random size between 5-15px
    const particle = document.createElement('div');
    
    // Set initial styles
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    particle.style.left = `${Math.random() * viewportWidth}px`;
    particle.style.top = '-10px';
    particle.style.transformOrigin = 'center center';
    
    container.appendChild(particle);

    // Animation properties
    const animationDuration = 2000 + Math.random() * 1000;
    const endX = (Math.random() - 0.5) * viewportWidth;
    const endY = viewportHeight + 10;
    const rotation = Math.random() * 360;

    // Create animation
    const animation = particle.animate([
        { 
            transform: 'translate(0, 0) rotate(0deg)',
            opacity: 1 
        },
        { 
            transform: `translate(${endX}px, ${endY}px) rotate(${rotation}deg)`,
            opacity: 0 
        }
    ], {
        duration: animationDuration,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
    });

    // Clean up after animation
    animation.onfinish = () => particle.remove();
}
