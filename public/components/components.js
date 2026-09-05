// components.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ components.js se je zagnal');
    console.log('📍 Trenutna pot:', window.location.pathname);

    // ===== DOLOČIMO PRAVO POT DO KOMPONENT =====
    function getBasePath() {
        const path = window.location.pathname;
        console.log('🔍 Analiziram pot:', path);
        
        if (path.includes('/views/matematika/snov/')) {
            return '../../../';
        }
        else if (path.includes('/views/matematika/')) {
            return '../../';
        }
        else if (path.includes('/views/')) {
            return '../';
        }
        else if (path.includes('/public/')) {
            return '';
        }
        else {
            return 'public/';
        }
    }

    const basePath = getBasePath();
    console.log('📁 Uporabljam basePath:', basePath);

    // ===== NALAGANJE KOMPONENT =====
    function loadComponent(id, file) {
        const fullPath = basePath + file;
        console.log(`📥 Nalagam ${id} iz ${fullPath}`);
        return fetch(fullPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} - ${fullPath}`);
                }
                return response.text();
            })
            .then(data => {
                console.log(`✅ ${id} naložen, dolžina: ${data.length} znakov`);
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = data;
                    
                    if (id === 'sidebar') {
                        // Sidebar je privzeto skrit
                        element.style.display = 'none';
                        element.style.transform = 'translateX(-100%)';
                        setTimeout(() => {
                            initSidebarControls();
                            initSidebarNavigation();
                        }, 50);
                    }
                    if (id === 'header') {
                        setTimeout(() => {
                            initHeaderControls();
                        }, 50);
                    }
                    if (id === 'footer') {
                        setTimeout(() => {
                            initFooterLinks();
                        }, 50);
                    }
                } else {
                    console.error(`❌ Element z id "${id}" ne obstaja`);
                }
                return true;
            })
            .catch(error => {
                console.error(`❌ Napaka pri nalaganju ${fullPath}:`, error);
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
            const newOpenBtn = openBtn.cloneNode(true);
            openBtn.parentNode.replaceChild(newOpenBtn, openBtn);
            
            newOpenBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log('🔄 Klik na openSidebar - odpiranje sidebarja');
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
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                const view = this.dataset.view;
                if (view) {
                    navigateTo(view);
                    closeSidebar();
                }
            });
        });
    }

    // ===== INICIALIZACIJA SIDEBAR NAVIGACIJE =====
    function initSidebarNavigation() {
        console.log('🔄 Inicializiram sidebar navigacijo');
        const navLinks = document.querySelectorAll('.sidebar-nav a[data-view]');
        console.log(`📊 Najdeno ${navLinks.length} povezav v sidebarju`);
        
        navLinks.forEach(link => {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const view = this.dataset.view;
                console.log(`🔄 Klik na sidebar povezavo: ${view}`);
                
                if (view) {
                    document.querySelectorAll('.sidebar-nav a[data-view]').forEach(l => {
                        l.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    navigateTo(view);
                    closeSidebar();
                }
            });
        });
    }

    // ===== SIDEBAR KONTROLE =====
    function initSidebarControls() {
        console.log('🔄 Inicializiram sidebar kontrole');
        
        // Gumb za zapiranje
        const closeBtn = document.getElementById('closeSidebar');
        if (closeBtn) {
            console.log('✅ Gumb za zapiranje najden');
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            
            newCloseBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log('🔄 Klik na closeSidebar - zapiranje sidebarja');
                closeSidebar();
            });
        } else {
            console.warn('⚠️ Gumb #closeSidebar ni najden');
        }

        // Klik na karkoli zunaj sidebarja zapre sidebar
        document.addEventListener('click', function(e) {
            const sidebar = document.getElementById('sidebar');
            const openBtn = document.getElementById('openSidebar');
            
            // Če sidebar ni odprt, ne naredimo nič
            if (!sidebar || !sidebar.classList.contains('open')) return;
            
            // Preverimo, ali je klik na sidebar ali na gumb za odpiranje
            const isSidebar = sidebar.contains(e.target);
            const isOpenBtn = openBtn && openBtn.contains(e.target);
            
            // Če klik ni na sidebar in ni na gumb za odpiranje, zapremo sidebar
            if (!isSidebar && !isOpenBtn) {
                console.log('🔄 Klik zunaj sidebarja - zapiranje');
                closeSidebar();
            }
        });
    }

    // ===== ODPIRANJE/ZAPIRANJE SIDEBAR =====
    function openSidebar() {
        console.log('🔄 Odpiram sidebar');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (sidebar) {
            // Najprej nastavimo display block in odstranimo transform
            sidebar.style.display = 'block';
            sidebar.style.transform = 'translateX(-100%)';
            
            // Počakamo na naslednji frame, da se display aplicira
            requestAnimationFrame(() => {
                // Nato dodamo class open, ki sproži animacijo
                sidebar.classList.add('open');
                console.log('✅ Sidebar dobil class "open"');
            });
            
            if (mainContent && window.innerWidth > 768) {
                mainContent.classList.add('shifted');
            }
        } else {
            console.error('❌ Sidebar element ne obstaja');
        }
    }

    function closeSidebar() {
        console.log('🔄 Zapiram sidebar');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (sidebar) {
            // Odstranimo class open
            sidebar.classList.remove('open');
            // Počakamo, da se animacija konča, nato skrijemo sidebar
            setTimeout(() => {
                sidebar.style.display = 'none';
                sidebar.style.transform = 'translateX(-100%)';
                console.log('✅ Sidebar skrit');
            }, 350); // Malo daljši čas za boljšo animacijo
        }
        if (mainContent) mainContent.classList.remove('shifted');
    }

    // ===== NAVIGACIJA =====
    function navigateTo(view) {
        console.log(`🔄 Navigacija na: ${view}`);
        
        const viewMap = {
            'home': 'domov',
            'logic': 'logika',
            'sets': 'mnozice',
            'numbers': 'stevila',
            'algebra': 'algebra',
            'powers': 'potence',
            'functions': 'funkcije',
            'geometry': 'geometrija',
            'shapes': 'oblike',
            'vectors': 'vektorji',
            'coordinates': 'koordinate',
            'sequences': 'zaporedja',
            'calculus': 'analiza',
            'integrals': 'integrali',
            'combinatorics': 'kombinatorika',
            'probability': 'verjetnost',
            'statistics': 'statistika'
        };
        
        const folderName = viewMap[view] || view;
        let path = `views/matematika/snov/${folderName}/`;
        console.log(`📁 Navigiram na: ${path}`);
        
        if (typeof router !== 'undefined' && router) {
            if (typeof router.navigateAndClose === 'function') {
                router.navigateAndClose(view);
            } else if (typeof router.navigate === 'function') {
                router.navigate(view);
            } else {
                window.location.href = path;
            }
        } else {
            window.location.href = path;
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
    
    Promise.all([
        loadComponent('header', 'components/header.html'),
        loadComponent('sidebar', 'components/sidebar.html'),
        loadComponent('footer', 'components/footer.html')
    ]).then(() => {
        console.log('✅ Vse komponente uspešno naložene!');
        initHeaderControls();
        initSidebarControls();
        initSidebarNavigation();
        initFooterLinks();
        updateDate();
        
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            const links = sidebar.querySelectorAll('.sidebar-nav a[data-view]');
            console.log(`✅ Sidebar inicializiran z ${links.length} povezavami`);
            // Sidebar je privzeto skrit
            sidebar.style.display = 'none';
            sidebar.style.transform = 'translateX(-100%)';
        }
    }).catch(error => {
        console.error('❌ Napaka pri nalaganju komponent:', error);
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
    window.reinitSidebar = function() {
        initSidebarControls();
        initSidebarNavigation();
        console.log('✅ Sidebar ponovno inicializiran');
    };
});