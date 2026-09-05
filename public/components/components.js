// components.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ components.js se je zagnal');
    console.log('📍 Trenutna pot:', window.location.pathname);

    // ===== DOLOČIMO PRAVO POT DO KOMPONENT =====
    function getBasePath() {
        const path = window.location.pathname;
        console.log('🔍 Analiziram pot:', path);
        
        // Za korensko stran (/)
        if (path === '/' || path === '/index.html') {
            return 'public/';
        }
        else if (path.includes('/views/matematika/snov/')) {
            return '../../../public/';
        }
        else if (path.includes('/views/matematika/')) {
            return '../../public/';
        }
        else if (path.includes('/views/')) {
            return '../public/';
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
                console.log(`📄 Vsebina ${id}:`, data.substring(0, 200) + '...');
                
                const element = document.getElementById(id);
                if (element) {
                    element.innerHTML = data;
                    console.log(`✅ ${id} vstavljen v element`);
                    
                    if (id === 'sidebar') {
                        // Sidebar je privzeto skrit
                        element.style.display = 'none';
                        element.style.transform = 'translateX(-100%)';
                        console.log('📌 Sidebar nastavljen na skrit');
                    }
                } else {
                    console.error(`❌ Element z id "${id}" ne obstaja v DOM`);
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

    // ===== SIDEBAR KONTROLE =====
    function initSidebarControls() {
        console.log('🔄 Inicializiram sidebar kontrole');
        
        // ---------- GUMB ZA ODPIRANJE ----------
        const openBtn = document.getElementById('openSidebar');
        if (openBtn) {
            const newOpenBtn = openBtn.cloneNode(true);
            openBtn.parentNode.replaceChild(newOpenBtn, openBtn);
            
            newOpenBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log('🔄 Klik na openSidebar - odpiranje sidebarja');
                openSidebar();
            });
            console.log('✅ Gumb za odpiranje nastavljen');
        } else {
            console.warn('⚠️ Gumb #openSidebar ni najden');
        }

        // ---------- GUMB ZA ZAPIRANJE ----------
        const closeBtn = document.getElementById('closeSidebar');
        if (closeBtn) {
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            
            newCloseBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log('🔄 Klik na closeSidebar - zapiranje sidebarja');
                closeSidebar();
            });
            console.log('✅ Gumb za zapiranje nastavljen');
        } else {
            console.warn('⚠️ Gumb #closeSidebar ni najden');
        }

        // ---------- KLIK ZUNAJ SIDEBARJA ----------
        document.removeEventListener('click', window._sidebarOutsideClick);
        window._sidebarOutsideClick = function(e) {
            const sidebar = document.getElementById('sidebar');
            const openBtn = document.getElementById('openSidebar');
            
            if (!sidebar || !sidebar.classList.contains('open')) return;
            
            const isSidebar = sidebar.contains(e.target);
            const isOpenBtn = openBtn && openBtn.contains(e.target);
            const isCloseBtn = document.getElementById('closeSidebar') && document.getElementById('closeSidebar').contains(e.target);
            
            if (!isSidebar && !isOpenBtn && !isCloseBtn) {
                console.log('🔄 Klik zunaj sidebarja - zapiranje');
                closeSidebar();
            }
        };
        document.addEventListener('click', window._sidebarOutsideClick);
    }

    // ===== ODPIRANJE/ZAPIRANJE SIDEBAR =====
    function openSidebar() {
        console.log('🔄 Odpiram sidebar');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (sidebar) {
            if (sidebar.classList.contains('open')) {
                console.log('⚠️ Sidebar je že odprt');
                return;
            }
            
            // Najprej nastavimo display block
            sidebar.style.display = 'block';
            sidebar.style.transform = 'translateX(-100%)';
            
            // Počakamo na naslednji frame
            requestAnimationFrame(() => {
                sidebar.classList.add('open');
                console.log('✅ Sidebar dobil class "open"');
            });
            
            // Dodamo overlay
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.classList.add('visible');
            }
            
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
            if (!sidebar.classList.contains('open')) {
                console.log('⚠️ Sidebar je že zaprt');
                return;
            }
            
            sidebar.classList.remove('open');
            
            // Odstranimo overlay
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.classList.remove('visible');
            }
            
            setTimeout(() => {
                sidebar.style.display = 'none';
                sidebar.style.transform = 'translateX(-100%)';
                console.log('✅ Sidebar skrit');
            }, 350);
        }
        if (mainContent) mainContent.classList.remove('shifted');
    }

    // ===== INICIALIZACIJA SIDEBAR NAVIGACIJE =====
    function initSidebarNavigation() {
        console.log('🔄 Inicializiram sidebar navigacijo');
        const navLinks = document.querySelectorAll('.sidebar-nav a[data-view]');
        console.log(`Najdeno ${navLinks.length} povezav v sidebarju`);
        
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
        
        // Uporabi router ali pa kar direktna navigacija
        if (typeof router !== 'undefined' && router) {
            if (typeof router.navigate === 'function') {
                router.navigate(view);
            } else {
                window.location.href = path;
            }
        } else {
            window.location.href = path;
        }
    }

    // ===== NALOŽI VSE KOMPONENTE =====
    console.log('🚀 Začenjam nalaganje komponent...');
    console.log('📁 Base path:', basePath);
    
    Promise.all([
        loadComponent('header', 'components/header.html'),
        loadComponent('sidebar', 'components/sidebar.html'),
        loadComponent('footer', 'components/footer.html')
    ]).then(() => {
        console.log('✅ Vse komponente uspešno naložene!');
        
        initSidebarControls();
        initSidebarNavigation();
        updateDate();
        
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            console.log('📌 Sidebar element obstaja');
            console.log('📌 Vsebina sidebarja:', sidebar.innerHTML.substring(0, 200) + '...');
            
            const links = sidebar.querySelectorAll('.sidebar-nav a[data-view]');
            console.log(`✅ Sidebar inicializiran z ${links.length} povezavami`);
            
            sidebar.style.display = 'none';
            sidebar.style.transform = 'translateX(-100%)';
        } else {
            console.error('❌ Sidebar element NE OBSTAJA v DOM!');
        }
    }).catch(error => {
        console.error('❌ Napaka pri nalaganju komponent:', error);
    });

    // ===== TRENUTNI DATUM =====
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