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