// Bottom navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item:not(.social-item)');
    const socialItems = document.querySelectorAll('.social-item');
    const sections = document.querySelectorAll('.section');

    // Theme toggle functionality removed as per user request

    // Add click event listeners to navigation items (only for sections)
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            if (targetSection) {
                // Smooth scroll to section
                const section = document.getElementById(targetSection);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Update active state
                updateActiveNavItem(targetSection);
            }
        });
    });

    // Function to update active navigation item
    function updateActiveNavItem(targetSection) {
        // Update navigation active state (only for section nav items)
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to current nav item
        const activeNavItem = document.querySelector(`[data-section="${targetSection}"]:not(.social-item)`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }

    // Intersection Observer for scroll-based navigation highlighting and animations
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px', // Trigger when section is more central
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveNavItem(sectionId);

                // Add fade-in animation
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Social items don't need section navigation - they work as external links
    socialItems.forEach(item => {
        item.addEventListener('click', function () {
            // Social items will use their href attributes naturally
        });
    });

    // Set initial active state for home section
    updateActiveNavItem('home');

    // Make home section visible immediately
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('fade-in');
    }
});