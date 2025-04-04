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

// Combined Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Horizontal Carousel
    const setupHorizontalCarousel = () => {
        const carouselContainer = document.querySelector('.carousel-container');
        const horizontalItems = document.querySelectorAll('.special-bouquet-item');
        const horizontalPrevBtn = document.querySelector('.prev-btn');
        const horizontalNextBtn = document.querySelector('.next-btn');
        const horizontalModal = document.querySelector('#fullscreenModal');
        const horizontalModalImage = document.querySelector('.modal-image');
        const horizontalModalTitle = document.querySelector('.modal-title');
        const horizontalModalDescription = document.querySelector('.modal-description');
        const horizontalModalOldPrice = document.querySelector('.modal-old-price');
        const horizontalModalNewPrice = document.querySelector('.modal-new-price');
        const horizontalModalBtn = document.querySelector('.modal-luxury-btn');
        const horizontalCloseModal = document.querySelector('.close-modal');
        let horizontalCurrentIndex = 0;
        const horizontalTotalItems = horizontalItems.length;
        const visibleItems = 2;

        // Check if elements exist
        if (!carouselContainer || !horizontalItems.length || !horizontalPrevBtn || !horizontalNextBtn) {
            console.warn('Horizontal carousel elements not found.');
            return;
        }

        const itemWidth = horizontalItems[0].offsetWidth + 15;

        const updateHorizontalCarousel = () => {
            carouselContainer.style.transform = `translateX(-${horizontalCurrentIndex * itemWidth}px)`;
        };

        // Auto-scroll every 5 seconds
        let horizontalAutoScroll = setInterval(() => {
            if (horizontalCurrentIndex < horizontalTotalItems - visibleItems) {
                horizontalCurrentIndex++;
            } else {
                horizontalCurrentIndex = 0;
            }
            updateHorizontalCarousel();
        }, 5000);

        // Pause on hover
        carouselContainer.addEventListener('mouseenter', () => clearInterval(horizontalAutoScroll));
        carouselContainer.addEventListener('mouseleave', () => {
            horizontalAutoScroll = setInterval(() => {
                if (horizontalCurrentIndex < horizontalTotalItems - visibleItems) {
                    horizontalCurrentIndex++;
                } else {
                    horizontalCurrentIndex = 0;
                }
                updateHorizontalCarousel();
            }, 5000);
        });

        // Navigation buttons
        horizontalNextBtn.addEventListener('click', () => {
            if (horizontalCurrentIndex < horizontalTotalItems - visibleItems) {
                horizontalCurrentIndex++;
                updateHorizontalCarousel();
            }
        });

        horizontalPrevBtn.addEventListener('click', () => {
            if (horizontalCurrentIndex > 0) {
                horizontalCurrentIndex--;
                updateHorizontalCarousel();
            }
        });

        // Swipe support
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
                if (diffX > 0 && horizontalCurrentIndex < horizontalTotalItems - visibleItems) {
                    horizontalCurrentIndex++;
                } else if (diffX < 0 && horizontalCurrentIndex > 0) {
                    horizontalCurrentIndex--;
                }
                updateHorizontalCarousel();
                horizontalIsDragging = false;
            }
        });

        carouselContainer.addEventListener('touchend', () => {
            horizontalIsDragging = false;
        });

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

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(horizontalAutoScroll);
        });
    };

    // 3D Circular Carousel
    const setupCircularCarousel = () => {
        const carousel3D = document.querySelector('.carousel-3d');
        const circularItems = document.querySelectorAll('.carousel-item');
        const circularPrevBtn = document.querySelector('.prev-btn');
        const circularNextBtn = document.querySelector('.next-btn');
        const cardDetails = document.querySelector('.card-details');
        const circularModal = document.querySelector('#fullscreenModal');
        const circularModalImage = document.querySelector('.modal-image');
        const circularModalTitle = document.querySelector('.modal-title');
        const circularModalDescription = document.querySelector('.modal-description');
        const circularModalOldPrice = document.querySelector('.modal-old-price');
        const circularModalNewPrice = document.querySelector('.modal-new-price');
        const circularModalBtn = document.querySelector('.modal-luxury-btn');
        const circularCloseModal = document.querySelector('.close-modal');
        const circularTotalItems = circularItems.length;
        let circularCurrentIndex = 0;

        const cardData = [
            { discount: '20% OFF', title: "Valentine's Day Special", description: 'A romantic bouquet of red roses, perfect for your loved one.', oldPrice: '$150', newPrice: '$120', link: 'contact.html' },
            { discount: '10% OFF', title: 'Orchid Elegance', description: 'An exquisite arrangement of orchids for a touch of luxury.', oldPrice: '$150', newPrice: '$135', link: 'contact.html' },
            { discount: '15% OFF', title: 'Mixed Bloom Delight', description: 'A vibrant mix of flowers to brighten any occasion.', oldPrice: '$130', newPrice: '$110', link: 'contact.html' }
        ];

        // Check if elements exist
        if (!carousel3D || !circularItems.length || !circularPrevBtn || !circularNextBtn || !cardDetails) {
            console.warn('Circular carousel elements not found.');
            return;
        }

        // Position items in a circle
        const radius = 150;
        const angleStep = 360 / circularTotalItems;
        circularItems.forEach((item, index) => {
            const angle = index * angleStep;
            item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        });

        // Update carousel and details
        const updateCircularCarousel = () => {
            const angle = circularCurrentIndex * -angleStep;
            carousel3D.style.transform = `rotateY(${angle}deg)`;

            // Update card details
            const data = cardData[circularCurrentIndex];
            cardDetails.querySelector('.discount-badge').textContent = data.discount;
            cardDetails.querySelector('h3').textContent = data.title;
            cardDetails.querySelector('p').textContent = data.description;
            cardDetails.querySelector('.old-price').textContent = data.oldPrice;
            cardDetails.querySelector('.new-price').textContent = data.newPrice;
            cardDetails.querySelector('.luxury-btn').href = data.link;
        };

        // Auto-rotate every 3 seconds
        let circularAutoRotate = setInterval(() => {
            circularCurrentIndex = (circularCurrentIndex + 1) % circularTotalItems;
            updateCircularCarousel();
        }, 3000);

        // Pause on hover
        carousel3D.addEventListener('mouseenter', () => clearInterval(circularAutoRotate));
        carousel3D.addEventListener('mouseleave', () => {
            circularAutoRotate = setInterval(() => {
                circularCurrentIndex = (circularCurrentIndex + 1) % circularTotalItems;
                updateCircularCarousel();
            }, 3000);
        });

        // Navigation buttons
        circularNextBtn.addEventListener('click', () => {
            circularCurrentIndex = (circularCurrentIndex + 1) % circularTotalItems;
            updateCircularCarousel();
        });

        circularPrevBtn.addEventListener('click', () => {
            circularCurrentIndex = (circularCurrentIndex - 1 + circularTotalItems) % circularTotalItems;
            updateCircularCarousel();
        });

        // Swipe support
        let circularStartX, circularIsDragging = false;
        carousel3D.addEventListener('touchstart', (e) => {
            circularStartX = e.touches[0].clientX;
            circularIsDragging = true;
        });

        carousel3D.addEventListener('touchmove', (e) => {
            if (!circularIsDragging) return;
            const currentX = e.touches[0].clientX;
            const diffX = circularStartX - currentX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    circularCurrentIndex = (circularCurrentIndex + 1) % circularTotalItems;
                } else {
                    circularCurrentIndex = (circularCurrentIndex - 1 + circularTotalItems) % circularTotalItems;
                }
                updateCircularCarousel();
                circularIsDragging = false;
            }
        });

        carousel3D.addEventListener('touchend', () => {
            circularIsDragging = false;
        });

        // Open modal on item click
        circularItems.forEach(item => {
            item.addEventListener('click', () => {
                const index = item.dataset.index;
                const data = cardData[index];
                circularModalImage.src = item.querySelector('img').src;
                circularModalTitle.textContent = data.title;
                circularModalDescription.textContent = data.description;
                circularModalOldPrice.textContent = data.oldPrice;
                circularModalNewPrice.textContent = data.newPrice;
                circularModalBtn.href = data.link;

                circularModal.style.display = 'flex';
            });
        });

        // Close modal
        circularCloseModal.addEventListener('click', () => {
            circularModal.style.display = 'none';
        });

        circularModal.addEventListener('click', (e) => {
            if (e.target === circularModal) {
                circularModal.style.display = 'none';
            }
        });

        // Initial update
        updateCircularCarousel();

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(circularAutoRotate);
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

    // Initialize both carousels and hamburger menu
    setupHorizontalCarousel();
    setupCircularCarousel();
    setupHamburgerMenu();
});