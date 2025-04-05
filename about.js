
// Scroll-ზე ანიმაციის გააქტიურება Contact Info სექციისთვის
document.addEventListener('DOMContentLoaded', () => {
    const contactInfoSection = document.querySelector('#contact-info');
    const contactInfoTitle = document.querySelector('.contact-info-title');
    const contactInfoText = document.querySelector('.contact-info-text');
    const contactInfoMethods = document.querySelectorAll('.contact-info-method');
    const contactInfoSocials = document.querySelector('.contact-info-socials');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactInfoTitle.classList.add('animate');
                contactInfoText.classList.add('animate');
                contactInfoMethods.forEach(method => method.classList.add('animate'));
                contactInfoSocials.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(contactInfoSection);
});

// Hamburger Menu Toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('active');
});

// Particles.js for Background Effect
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#d4af37' },
        shape: { type: 'circle' },
        opacity: { value: 0.7, random: true },
        size: { value: 2, random: true },
        move: { enable: true, speed: 0.5, direction: 'none', random: true, out_mode: 'out' }
    },
    interactivity: {
        events: { 
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
        }
    }
});
