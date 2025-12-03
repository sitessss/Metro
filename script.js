window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');

    // Hide loading screen after a short delay to show the animation
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');

if (hamburger && menuOverlay) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menuOverlay.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (menuOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking outside
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {
            hamburger.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            hamburger.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

const assistantButton = document.getElementById('assistantButton');
const assistantPanel = document.getElementById('assistantPanel');
const closeAssistant = document.getElementById('closeAssistant');

if (assistantButton && assistantPanel) {
    assistantButton.addEventListener('click', () => {
        assistantPanel.classList.toggle('active');
    });

    if (closeAssistant) {
        closeAssistant.addEventListener('click', () => {
            assistantPanel.classList.remove('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (!assistantButton.contains(e.target) &&
            !assistantPanel.contains(e.target) &&
            assistantPanel.classList.contains('active')) {
            assistantPanel.classList.remove('active');
        }
    });
}
const observeElements = () => {
    const gameCards = document.querySelectorAll('.game-card');

    if (gameCards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, {
        threshold: 0.2
    });

    gameCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

const addPageTransitions = () => {
    const links = document.querySelectorAll('a:not([target="_blank"])');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Check if it's an internal link
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();

                // Fade out effect
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0';

                // Navigate after fade out
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
};

addPageTransitions();

const heroSection = document.querySelector('.hero-section, .detail-hero');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

const gameCards = document.querySelectorAll('.game-card');

gameCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s ease';
    });
});

const createCursorTrail = () => {
    let mouseX = 0;
    let mouseY = 0;
    let trails = [];

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function createTrail() {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: var(--metro-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${mouseX}px;
            top: ${mouseY}px;
            opacity: 0.5;
            animation: trailFade 0.5s ease-out forwards;
        `;

        document.body.appendChild(trail);
        trails.push(trail);

        setTimeout(() => {
            trail.remove();
            trails = trails.filter(t => t !== trail);
        }, 500);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes trailFade {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(style);

    let lastTrailTime = 0;
    document.addEventListener('mousemove', () => {
        const now = Date.now();
        if (now - lastTrailTime > 50) {
            createTrail();
            lastTrailTime = now;
        }
    });
};

const typeWriter = (element, text, speed = 100) => {
    if (!element) return;

    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
};

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    function createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${startX}px;
            top: -10px;
            animation: particleFall ${duration}s linear ${delay}s infinite;
            box-shadow: 0 0 ${size * 2}px rgba(212, 175, 55, 0.3);
        `;

        particleContainer.appendChild(particle);
    }

    for (let i = 0; i < 30; i++) {
        createParticle();
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFall {
            to {
                transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

setTimeout(createParticles, 2000);

// Console message for developers
console.log('%c Metro Series Website ', 'background: #d4af37; color: #0a0a0a; font-size: 20px; padding: 10px;');
console.log('%c Welcome to the Metro universe! ', 'color: #d4af37; font-size: 14px;');
console.log('%c Try the Konami code for a surprise! ', 'color: #8a8a8a; font-size: 12px;');

