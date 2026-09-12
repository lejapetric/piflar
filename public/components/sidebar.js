// public/components/sidebar.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ public/components/sidebar.js se je zagnal');

    // ===== DROPDOWN LOGIKA ZA PREDMETE (Matematika, Fizika) =====
    const subjectHeaders = document.querySelectorAll('.subject-header');

    subjectHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const parent = this.closest('.subject-dropdown');
            const options = parent.querySelector('.subject-options');
            const arrow = this.querySelector('.dropdown-arrow');
            
            if (!options) return;
            
            // Zapri vse ostale predmete
            document.querySelectorAll('.subject-options').forEach(opt => {
                if (opt !== options) {
                    opt.classList.remove('open');
                    const otherArrow = opt.closest('.subject-dropdown').querySelector('.dropdown-arrow');
                    if (otherArrow) otherArrow.textContent = '▼';
                }
            });
            
            // Preklopi trenutni
            options.classList.toggle('open');
            if (arrow) {
                arrow.textContent = options.classList.contains('open') ? '▲' : '▼';
            }
        });
    });

    // ===== SNOV TOGGLE (Matematika) =====
    const snovToggles = document.querySelectorAll('.snov-toggle');

    snovToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const snovList = this.nextElementSibling;
            const arrow = this.querySelector('.dropdown-arrow');
            
            if (!snovList) return;
            
            snovList.classList.toggle('open');
            if (arrow) {
                arrow.textContent = snovList.classList.contains('open') ? '▼' : '▶';
            }
        });
    });

    // ===== NAVIGACIJA NA POVEZAVE =====
    // Uporabimo event delegation na sidebarju za vse povezave
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.addEventListener('click', function(e) {
            // Poišči kliknjeno povezavo
            const link = e.target.closest('a[href]');
            if (!link) return;
            
            // Prepreči, da bi se povezava odprla na običajen način
            e.preventDefault();
            
            const href = link.getAttribute('href');
            console.log('🔗 Navigiram na:', href);
            
            // Pojdi na povezavo
            if (href) {
                window.location.href = href;
            }
        });
    }

    console.log('✅ Sidebar inicializiran');
});