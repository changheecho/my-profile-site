// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'animate-fadeInUp');
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation to skill badges and project cards
const skillBadges = document.querySelectorAll('.skill-badge');
const projectCards = document.querySelectorAll('.project-card');
const sections = document.querySelectorAll('section');

skillBadges.forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.animation = `fadeInUp 0.6s ease forwards`;
    badge.style.animationDelay = `${index * 0.05}s`;
    observer.observe(badge);
});

projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `fadeInUp 0.6s ease forwards`;
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

sections.forEach(section => {
    observer.observe(section);
});

// Add fadeInUp animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.classList.remove('text-blue-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-400');
        }
    });
});
