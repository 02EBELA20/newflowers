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
    // Pagination for Bouquet Grid
    const setupPagination = () => {
        const bouquetGrid = document.querySelector('#bouquetGrid');
        const bouquetItems = document.querySelectorAll('.special-bouquet-item');
        const prevPageBtn = document.querySelector('.prev-page');
        const nextPageBtn = document.querySelector('.next-page');
        const currentPageSpan = document.querySelector('#currentPage');
        const totalPagesSpan = document.querySelector('#totalPages');
        const paginationSection = document.querySelector('.pagination');

        // Dynamically set items per page based on screen width
        const isMobile = window.innerWidth <= 768;
        const itemsPerPage = isMobile ? 4 : 8; // 4 items per page on mobile, 8 on desktop
        const totalItems = bouquetItems.length;
        let totalPages = Math.ceil(totalItems / itemsPerPage);
        let currentPage = 1;

        // Update total pages
        totalPagesSpan.textContent = totalPages;

        // Hide pagination if only one page
        if (totalPages <= 1) {
            paginationSection.classList.add('hidden');
        } else {
            paginationSection.classList.remove('hidden');
        }

        const updateGrid = () => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            bouquetItems.forEach((item, index) => {
                if (index >= startIndex && index < endIndex) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
            });

            // Update current page display
            currentPageSpan.textContent = currentPage;

            // Enable/disable buttons
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === totalPages;
        };

        // Initial update
        updateGrid();

        // Pagination button events
        nextPageBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateGrid();
                // Scroll to the top of the special offers section
                document.querySelector('#special-offers').scrollIntoView({ behavior: 'smooth' });
            }
        });

        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateGrid();
                // Scroll to the top of the special offers section
                document.querySelector('#special-offers').scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Update pagination on window resize
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 768;
            const newItemsPerPage = newIsMobile ? 4 : 8;
            const newTotalPages = Math.ceil(totalItems / newItemsPerPage);
            if (newItemsPerPage !== itemsPerPage || newTotalPages !== totalPages) {
                totalPages = newTotalPages;
                totalPagesSpan.textContent = totalPages;
                currentPage = 1; // Reset to first page on resize
                updateGrid();
                if (totalPages <= 1) {
                    paginationSection.classList.add('hidden');
                } else {
                    paginationSection.classList.remove('hidden');
                }
            }
        });
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
        if (!horizontalModal || !horizontalItems.length || !horizontalModalImage || !horizontalModalTitle || 
            !horizontalModalDescription || !horizontalModalOldPrice || !horizontalModalNewPrice || 
            !horizontalModalBtn || !horizontalCloseModal) {
            console.warn('Modal elements not found.');
            return;
        }

        // Open modal on item click
        horizontalItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img')?.src || '';
                const title = item.querySelector('h3')?.textContent || 'Bouquet';
                const description = item.querySelector('p')?.textContent || 'A beautiful arrangement.';
                const oldPrice = item.querySelector('.old-price')?.textContent || '';
                const newPrice = item.querySelector('.new-price')?.textContent || '';
                const btnLink = item.querySelector('.luxury-btn')?.href || '#';

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

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && horizontalModal.style.display === 'flex') {
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

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    };

    // Initialize functionality
    setupPagination();
    setupModal();
    setupHamburgerMenu();
});