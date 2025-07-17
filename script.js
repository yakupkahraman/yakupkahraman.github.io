// Bottom navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item:not(.social-item)');
    const socialItems = document.querySelectorAll('.social-item');
    const sections = document.querySelectorAll('.section');

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    const logo = document.querySelector('.logo');

    // Check for saved theme preference or default to dark theme
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.className = 'hgi hgi-stroke hgi-sun-01';
        logo.src = 'assets/logo-dark.png';
    } else {
        themeIcon.className = 'hgi hgi-stroke hgi-moon-02';
        logo.src = 'assets/logo-light.png';
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', function () {
        body.classList.toggle('light-theme');

        if (body.classList.contains('light-theme')) {
            themeIcon.className = 'hgi hgi-stroke hgi-sun-01';
            logo.src = 'assets/logo-dark.png';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.className = 'hgi hgi-stroke hgi-moon-02';
            logo.src = 'assets/logo-light.png';
            localStorage.setItem('theme', 'dark');
        }
    });

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
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1
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