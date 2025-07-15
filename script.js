// Bottom navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item:not(.social-item)');
    const socialItems = document.querySelectorAll('.social-item');
    const sections = document.querySelectorAll('.section');

    // Function to show specific section
    function showSection(targetSection) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const section = document.getElementById(targetSection);
        if (section) {
            section.classList.add('active');
        }

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

    // Add click event listeners to navigation items (only for sections)
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            if (targetSection) {
                showSection(targetSection);
            }
        });
    });

    // Social items don't need section navigation - they work as external links
    socialItems.forEach(item => {
        item.addEventListener('click', function() {
            // Social items will use their href attributes naturally
        });
    });

    // Show home section by default
    showSection('home');
});

// Smooth animations for section transitions
function addSectionTransition() {
    const style = document.createElement('style');
    style.textContent = `
        .section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .section.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations
addSectionTransition();