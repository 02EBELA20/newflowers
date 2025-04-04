// Particles.js initialization (unchanged)
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#d4af37' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#d4af37', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

document.addEventListener('DOMContentLoaded', () => {
    // Horizontal Carousel
    const setupHorizontalCarousel = () => {
        const carouselContainer = document.querySelector('.carousel-container');
        const horizontalItems = document.querySelectorAll('.special-bouquet-item');
        const horizontalPrevBtn = document.querySelector('.prev-btn');
        const horizontalNextBtn = document.querySelector('.next-btn');
        let horizontalCurrentIndex = 0;
        const horizontalTotalItems = horizontalItems.length;

        // Check if elements exist
        if (!carouselContainer || !horizontalItems.length || !horizontalPrevBtn || !horizontalNextBtn) {
            console.warn('Horizontal carousel elements not found.');
            return;
        }

        // Calculate visible items based on screen width
        const updateVisibleItems = () => {
            const containerWidth = carouselContainer.parentElement.offsetWidth;
            const itemWidth = 200 + 20; // Card width (200px) + gap (20px)
            const visibleItems = window.innerWidth <= 768 ? 2 : Math.floor(containerWidth / itemWidth);
            return Math.max(1, visibleItems); // Ensure at least 1 item is visible
        };

        let visibleItems = updateVisibleItems();
        const itemWidth = 200 + 20; // Card width (200px) + gap (20px)

        const updateHorizontalCarousel = () => {
            // Update the transform for sliding
            carouselContainer.style.transform = `translateX(-${horizontalCurrentIndex * itemWidth}px)`;

            // Determine which cards are visible
            horizontalItems.forEach((item, index) => {
                if (index >= horizontalCurrentIndex && index < horizontalCurrentIndex + visibleItems) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
            });

            console.log(`Current Index: ${horizontalCurrentIndex}, Visible Items: ${visibleItems}, Total Items: ${horizontalTotalItems}`);
        };

        // Navigation buttons: Infinite looping
        horizontalNextBtn.addEventListener('click', () => {
            horizontalCurrentIndex++;
            if (horizontalCurrentIndex >= horizontalTotalItems) {
                horizontalCurrentIndex = 0; // Loop back to the first card
            }
            updateHorizontalCarousel();
        });

        horizontalPrevBtn.addEventListener('click', () => {
            horizontalCurrentIndex--;
            if (horizontalCurrentIndex < 0) {
                horizontalCurrentIndex = horizontalTotalItems - 1; // Loop to the last card
            }
            updateHorizontalCarousel();
        });

        // Swipe support: Infinite looping
        let horizontalStartX, horizontalIsDragging = false;
        carouselContainer.addEventListener('touchstart', (e) => {
            horizontalStartX = e.touches[0].clientX;
            horizontalIsDragging = true;
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            if (!horizontalIsDragging) return;
            const currentX = e.touches[0].clientX;
            const diffX = horizontalStartX - currentX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    horizontalCurrentIndex++;
                    if (horizontalCurrentIndex >= horizontalTotalItems) {
                        horizontalCurrentIndex = 0; // Loop back to the first card
                    }
                } else {
                    horizontalCurrentIndex--;
                    if (horizontalCurrentIndex < 0) {
                        horizontalCurrentIndex = horizontalTotalItems - 1; // Loop to the last card
                    }
                }
                updateHorizontalCarousel();
                horizontalIsDragging = false;
            }
        });

        carouselContainer.addEventListener('touchend', () => {
            horizontalIsDragging = false;
        });

        // Update visible items on resize
        window.addEventListener('resize', () => {
            visibleItems = updateVisibleItems();
            // Ensure the current index doesn't exceed the maximum
            if (horizontalCurrentIndex >= horizontalTotalItems) {
                horizontalCurrentIndex = 0;
            }
            updateHorizontalCarousel();
        });

        // Initial update
        updateHorizontalCarousel();
    };

    // Modal Functionality
    const setupModal = () => {
        const horizontalItems = document.querySelectorAll('.special-bouquet-item');
        const horizontalModal = document.querySelector('#fullscreenModal');
        const horizontalModalImage = document.querySelector('.modal-image');
        const horizontalModalTitle = document.querySelector('.modal-title');
        const horizontalModalDescription = document.querySelector('.modal-description');
        const horizontalModalOldPrice = document.querySelector('.modal-old-price');
        const horizontalModalNewPrice = document.querySelector('.modal-new-price');
        const horizontalModalBtn = document.querySelector('.modal-luxury-btn');
        const horizontalCloseModal = document.querySelector('.close-modal');

        // Check if elements exist
        if (!horizontalModal || !horizontalItems.length) {
            console.warn('Modal elements not found.');
            return;
        }

        // Open modal on item click
        horizontalItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('p').textContent;
                const oldPrice = item.querySelector('.old-price').textContent;
                const newPrice = item.querySelector('.new-price').textContent;
                const btnLink = item.querySelector('.luxury-btn').href;

                horizontalModalImage.src = imgSrc;
                horizontalModalTitle.textContent = title;
                horizontalModalDescription.textContent = description;
                horizontalModalOldPrice.textContent = oldPrice;
                horizontalModalNewPrice.textContent = newPrice;
                horizontalModalBtn.href = btnLink;

                horizontalModal.style.display = 'flex';
            });
        });

        // Close modal
        horizontalCloseModal.addEventListener('click', () => {
            horizontalModal.style.display = 'none';
        });

        horizontalModal.addEventListener('click', (e) => {
            if (e.target === horizontalModal) {
                horizontalModal.style.display = 'none';
            }
        });
    };

    // Hamburger Menu Toggle
    const setupHamburgerMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (!hamburger || !navLinks) {
            console.warn('Hamburger menu elements not found.');
            return;
        }

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    };

    // Initialize functionality
    setupHorizontalCarousel();
    setupModal();
    setupHamburgerMenu();
});