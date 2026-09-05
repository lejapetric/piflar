// router.js - Enostaven SPA router
class Router {
    constructor() {
        this.routes = {};
        this.currentView = null;
    }

    addRoute(name, view, title) {
        this.routes[name] = { view, title };
    }

    async navigate(viewName) {
        const route = this.routes[viewName];
        if (!route) {
            console.error(`Route ${viewName} not found`);
            return;
        }

        this.currentView = viewName;
        
        // Update URL
        history.pushState({ view: viewName }, '', `#${viewName}`);
        
        // Update page title
        document.title = `${route.title} - Matematika na Maturi`;
        
        // Update header title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = route.title;
        }

        // Load view
        const viewContainer = document.getElementById('viewContainer');
        if (viewContainer) {
            try {
                // Try to load view from public/views/ folder
                const viewPath = `views/${route.view}.html`;
                const response = await fetch(viewPath);
                
                if (response.ok) {
                    viewContainer.innerHTML = await response.text();
                } else {
                    // Fallback to home view if not found
                    const fallbackResponse = await fetch('views/home.html');
                    if (fallbackResponse.ok) {
                        viewContainer.innerHTML = await fallbackResponse.text();
                    } else {
                        viewContainer.innerHTML = '<div class="view"><h2>Vsebina ni najdena</h2></div>';
                    }
                }
                
                // Bind view interactions
                if (typeof window.bindViewInteractions === 'function') {
                    window.bindViewInteractions(viewName);
                }
                
                // Update active link in sidebar
                this.updateActiveLink(viewName);
                
            } catch (error) {
                console.error('Error loading view:', error);
                viewContainer.innerHTML = '<div class="view"><h2>Napaka pri nalaganju vsebine</h2></div>';
            }
        }
    }

    updateActiveLink(viewName) {
        // Remove active class from all links
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current view link
        const activeLink = document.querySelector(`.sidebar-nav a[data-view="${viewName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    navigateAndClose(viewName) {
        this.navigate(viewName);
        // Close sidebar is handled in components.js
    }
}

// Create global router instance
const router = new Router();
window.router = router;