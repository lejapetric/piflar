// components.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ components.js se je zagnal');

    // ===== NALAGANJE KOMPONENT =====
    function loadComponent(id, file) {
        console.log(`📥 Nalagam ${id} iz ${file}`);
        return fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log(`✅ ${id} naložen, dolžina: ${data.length} znakov`);
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = data;
                    if (id === 'sidebar') {
                        initSidebarControls();
                    }
                    if (id === 'header') {
                        initHeaderControls();
                    }
                    if (id === 'footer') {
                        initFooterLinks();
                    }
                } else {
                    console.error(`❌ Element z id "${id}" ne obstaja`);
                }
                return true;
            })
            .catch(error => {
                console.error(`❌ Napaka pri nalaganju ${file}:`, error);
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = `<p style="color: red; padding: 20px; text-align: center;">❌ Napaka pri nalaganju komponente ${id}</p>`;
                }
                return false;
            });
    }

    // ===== INICIALIZACIJA HEADER KONTROL =====
    function initHeaderControls() {
        console.log('🔄 Inicializiram header kontrole');
        const openBtn = document.getElementById('openSidebar');
        if (openBtn) {
            console.log('✅ Gumb za odpiranje najden');
            openBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('🔄 Klik na openSidebar');
                openSidebar();
            });
        } else {
            console.warn('⚠️ Gumb #openSidebar ni najden');
        }
    }

    // ===== INICIALIZACIJA FOOTER POVEZAV =====
    function initFooterLinks() {
        console.log('🔄 Inicializiram footer povezave');
        document.querySelectorAll('.footer-section a[data-view]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const view = this.dataset.view;
                if (view) {
                    navigateTo(view);
                    closeSidebar();
                }
            });
        });
    }

    // ===== SIDEBAR KONTROLE =====
    function initSidebarControls() {
        console.log('🔄 Inicializiram sidebar kontrole');
        
        const closeBtn = document.getElementById('closeSidebar');
        if (closeBtn) {
            console.log('✅ Gumb za zapiranje najden');
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('🔄 Klik na closeSidebar');
                closeSidebar();
            });
        } else {
            console.warn('⚠️ Gumb #closeSidebar ni najden');
        }

        document.querySelectorAll('.sidebar-nav a[data-view]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const view = this.dataset.view;
                if (view) {
                    navigateTo(view);
                    closeSidebar();
                }
            });
        });

        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                console.log('🔄 Klik na overlay');
                closeSidebar();
            });
        }
    }

    // ===== ODPIRANJE/ZAPIRANJE SIDEBAR =====
    function openSidebar() {
        console.log('🔄 Odpiram sidebar');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mainContent = document.getElementById('mainContent');
        
        if (sidebar) {
            sidebar.classList.add('open');
            console.log('✅ Sidebar dobil class "open"');
        } else {
            console.error('❌ Sidebar element ne obstaja');
        }
        if (overlay) overlay.classList.add('visible');
        if (mainContent && window.innerWidth > 768) {
            mainContent.classList.add('shifted');
        }
    }

    function closeSidebar() {
        console.log('🔄 Zapiram sidebar');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const mainContent = document.getElementById('mainContent');
        
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('visible');
        if (mainContent) mainContent.classList.remove('shifted');
    }

    // ===== NAVIGACIJA =====
    function navigateTo(view) {
        console.log(`🔄 Navigacija na: ${view}`);
        if (typeof router !== 'undefined') {
            if (router.navigateAndClose) {
                router.navigateAndClose(view);
            } else if (router.navigate) {
                router.navigate(view);
            }
        } else {
            window.location.hash = view;
        }
        
        document.querySelectorAll('.sidebar-nav a[data-view]').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.view === view) {
                link.classList.add('active');
            }
        });
    }

    // ===== NALOŽI VSE KOMPONENTE =====
    console.log('🚀 Začenjam nalaganje komponent...');
    
    // SPREMEMBA: dodana "public/" pot
    Promise.all([
        loadComponent('header', 'public/components/header.html'),
        loadComponent('sidebar', 'public/components/sidebar.html'),
        loadComponent('footer', 'public/components/footer.html')
    ]).then(() => {
        console.log('✅ Vse komponente uspešno naložene!');
        initHeaderControls();
        initSidebarControls();
        initFooterLinks();
        updateDate();
    });

    // ===== RESIZE DOGODEK =====
    window.addEventListener('resize', function() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        if (sidebar && sidebar.classList.contains('open') && window.innerWidth > 768) {
            if (mainContent) mainContent.classList.add('shifted');
        } else {
            if (mainContent) mainContent.classList.remove('shifted');
        }
    });

    // ===== TRENUTNI DATUM V HEADERJU =====
    function updateDate() {
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            const now = new Date();
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            dateElement.textContent = now.toLocaleDateString('sl-SI', options);
        }
    }

    // ===== GLOBALNE FUNKCIJE =====
    window.openSidebar = openSidebar;
    window.closeSidebar = closeSidebar;
    window.navigateTo = navigateTo;
});