// Sidebar controls
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('mainContent');

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    if (window.innerWidth > 768) {
        mainContent.classList.add('shifted');
    }
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    mainContent.classList.remove('shifted');
}

// Use event delegation for sidebar controls
document.addEventListener('click', (e) => {
    if (e.target.id === 'openSidebar') {
        openSidebar();
    }
    if (e.target.id === 'closeSidebar' || e.target.closest('#closeSidebar')) {
        closeSidebar();
    }
    if (e.target.id === 'overlay') {
        closeSidebar();
    }
});

// Navigation - close sidebar when clicking a link
document.querySelectorAll('.sidebar-nav a, .footer-section a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        if (view) {
            // Check if router exists before calling
            if (typeof router !== 'undefined' && router.navigateAndClose) {
                router.navigateAndClose(view);
            } else {
                // Fallback: just navigate
                if (typeof router !== 'undefined' && router.navigate) {
                    router.navigate(view);
                }
            }
            closeSidebar();
        }
    });
});

// Close sidebar on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
        // Optionally close on resize or just handle mainContent
        mainContent.classList.add('shifted');
    } else {
        mainContent.classList.remove('shifted');
    }
});