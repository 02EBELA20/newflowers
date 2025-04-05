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

// Smooth scroll for navigation and external page redirects
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Check if the link is an in-page anchor (starts with #)
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // For external pages (e.g., shop.html, about.html), allow default behavior
    });
});

// Carousel functionality (for index.html) - Horizontal Carousel
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const carouselItems = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        let currentIndex = 0;
        const totalItems = carouselItems.length;
        const itemWidth = carouselItems[0].offsetWidth + 40; // 350px (width) + 40px (margin)

        // Clone items for infinite scroll
        const clonesPerSide = Math.ceil(window.innerWidth / itemWidth) + 1;
        for (let i = 0; i < clonesPerSide; i++) {
            carouselItems.forEach(item => {
                const cloneStart = item.cloneNode(true);
                const cloneEnd = item.cloneNode(true);
                carousel.appendChild(cloneStart);
                carousel.insertBefore(cloneEnd, carouselItems[0]);
            });
        }

        // Update total items after cloning
        const updatedItems = document.querySelectorAll('.carousel-item');
        const updatedTotalItems = updatedItems.length;

        // Set initial position to start with the first original item in the center
        carousel.style.transition = 'none';
        currentIndex = clonesPerSide; // Start at the first original item (after left clones)
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        // Function to update carousel and highlight the center item
        function updateCarousel() {
            // Apply the transform to move the carousel
            carousel.style.transition = 'transform 0.5s ease-in-out';
            carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

            // Highlight the center item
            const centerIndex = currentIndex;
            updatedItems.forEach((item, index) => {
                if (index === centerIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            // Infinite scroll logic
            if (currentIndex <= 0) {
                setTimeout(() => {
                    carousel.style.transition = 'none';
                    currentIndex = totalItems;
                    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                    updateCarousel(); // Re-apply styles after repositioning
                }, 500);
            } else if (currentIndex >= totalItems + clonesPerSide - 1) {
                setTimeout(() => {
                    carousel.style.transition = 'none';
                    currentIndex = clonesPerSide;
                    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                    updateCarousel(); // Re-apply styles after repositioning
                }, 500);
            }
        }

        // Next button
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });

        // Previous button
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });

        // Initial update to set the correct styles
        updateCarousel();
    }
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-toggle').textContent = '+';
            });

            // Toggle the clicked item
            if (!isActive) {
                item.classList.add('active');
                toggle.textContent = '-';
            }
        });
    });
});

// Mobile Offer Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const offerItems = document.querySelectorAll('.offer-item');
    const mobileOfferBtn = document.querySelector('.mobile-offer-btn');
  
    if (mobileOfferBtn && window.innerWidth <= 768) {
      let currentOfferIndex = 0;
      offerItems[currentOfferIndex].classList.add('active');
  
      mobileOfferBtn.addEventListener('click', () => {
        offerItems[currentOfferIndex].classList.remove('active');
        currentOfferIndex = (currentOfferIndex + 1) % offerItems.length;
        offerItems[currentOfferIndex].classList.add('active');
      });
    }
});