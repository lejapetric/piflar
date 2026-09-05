// Sidebar controls (elementi se naložijo dinamično iz components/sidebar.html)
// Uporabimo event delegation, ker se elementi naložijo po DOMContentLoaded

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('mainContent');
    
    if (sidebar && overlay && mainContent) {
        sidebar.classList.add('open');
        overlay.classList.add('visible');
        if (window.innerWidth > 768) {
            mainContent.classList.add('shifted');
        }
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('mainContent');
    
    if (sidebar && overlay && mainContent) {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        mainContent.classList.remove('shifted');
    }
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

// Navigation - close sidebar when clicking a link (event delegation)
document.addEventListener('click', (e) => {
    const link = e.target.closest('.sidebar-nav a, .footer-section a');
    if (link) {
        const view = link.dataset.view;
        if (view) {
            e.preventDefault();
            // Check if router exists before calling
            if (typeof router !== 'undefined' && router.navigateAndClose) {
                router.navigateAndClose(view);
            } else if (typeof router !== 'undefined' && router.navigate) {
                router.navigate(view);
            }
            closeSidebar();
        }
    }
});

// Close sidebar on resize to desktop
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (sidebar && mainContent) {
        if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
            mainContent.classList.add('shifted');
        } else {
            mainContent.classList.remove('shifted');
        }
    }
});