// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        hamburger.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') navMenu.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target))
                navMenu.classList.remove('active');
        }, true);
    }

    // Animate fade-in and deluxe-in elements when they enter the viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                if(entry.target.classList.contains('deluxe-in')) {
                    entry.target.classList.add('animated');
                } else {
                    entry.target.classList.add('fade-in-visible');
                }
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.fade-in, .deluxe-in').forEach(el => {
        observer.observe(el);
    });

    // Animate gallery images on scroll
    document.querySelectorAll('.gallery-grid img').forEach((img, i) => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.94)';
        setTimeout(() => {
            img.style.transition = 'opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.9s cubic-bezier(.4,0,.2,1)';
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 400 + i*120);
    });

    // Service cards hover effect for touch devices
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('touchstart', () => {
            card.classList.add('hovered');
        });
        card.addEventListener('touchend', () => {
            card.classList.remove('hovered');
        });
    });
});

// ---- Luxury Animation/Effects Integration ----

// Cursor and Trails
let mouseX = 0, mouseY = 0;
let trailPositions = [];
let trails = [];
const cursor = document.querySelector('.cursor');

// Create cursor and trails
function initializeCursor() {
    if (!cursor) return;
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trails.push(trail);
        trailPositions.push({x: 0, y: 0});
    }
}
function updateCursor() {
    if (!cursor || trails.length === 0) return;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    trailPositions[0] = {x: mouseX, y: mouseY};
    for (let i = 1; i < trails.length; i++) {
        trailPositions[i].x += (trailPositions[i-1].x - trailPositions[i].x) * 0.3;
        trailPositions[i].y += (trailPositions[i-1].y - trailPositions[i].y) * 0.3;
        trails[i].style.left = trailPositions[i].x + 'px';
        trails[i].style.top = trailPositions[i].y + 'px';
        trails[i].style.opacity = (trails.length - i) / trails.length * 0.5;
    }
    requestAnimationFrame(updateCursor);
}
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = particle.style.height = Math.random() * 4 + 1 + 'px';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particlesContainer.appendChild(particle);
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 17000);
        }, i * 120);
    }
}

// Glass element hover interaction
function initializeGlassElements() {
    const glassElements = document.querySelectorAll('.glass-element');
    glassElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.background = 'rgba(255,255,255,0.13)';
            element.style.borderColor = 'rgba(212,175,55,0.3)';
            element.style.transform = 'scale(1.08) translateY(-7px)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.background = 'rgba(255,255,255,0.05)';
            element.style.borderColor = 'rgba(255,255,255,0.1)';
            element.style.transform = 'scale(1) translateY(0px)';
        });
    });
}

// Entrance fade-in-up for main content
function initializeEntranceAnimation() {
    document.querySelectorAll('main > section, .hero, .about, .gallery, .contact').forEach((el,i) => {
        el.classList.add('fade-in-up');
        el.style.animationDelay = (0.15 + i*0.08) + 's';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCursor();
    initializeGlassElements();
    initializeEntranceAnimation();
    updateCursor();
    createParticles();
    setInterval(createParticles, 12000);
});