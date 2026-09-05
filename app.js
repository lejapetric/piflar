// API service za komunikacijo z backendom
const mathApi = {
    async solveQuadratic(a, b, c) {
        const response = await fetch('/api/math/quadratic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a, b, c })
        });
        if (!response.ok) throw new Error('API error');
        return response.json();
    },

    async arithmeticSequence(a1, d, n) {
        const response = await fetch('/api/math/arithmetic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a1, d, n })
        });
        if (!response.ok) throw new Error('API error');
        return response.json();
    },

    async geometricSequence(a1, q, n) {
        const response = await fetch('/api/math/geometric', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a1, q, n })
        });
        if (!response.ok) throw new Error('API error');
        return response.json();
    },

    async factorial(n) {
        const response = await fetch('/api/math/factorial', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ n })
        });
        if (!response.ok) throw new Error('API error');
        return response.json();
    },

    async combination(n, k) {
        const response = await fetch('/api/math/combination', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ n, k })
        });
        if (!response.ok) throw new Error('API error');
        return response.json();
    },

    async pythagorean(a, b) {
        const response = await fetch('/api/math/pythagorean', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a, b })
        });
        if (!response.ok) throw new Error('API error');
        return response.json();
    },

    async distance(x1, y1, x2, y2) {
        const response = await fetch('/api/math/distance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ x1, y1, x2, y2 })
        });
        if (!response.ok) throw new Error('API error');
        return response.json();
    }
};

// Make mathApi available globally
window.mathApi = mathApi;

// Load header, footer and sidebar components
async function loadComponents() {
    try {
        // Load header
        const headerResponse = await fetch('components/header.html');
        if (headerResponse.ok) {
            const headerHtml = await headerResponse.text();
            document.getElementById('headerContainer').innerHTML = headerHtml;
            
            // Update date after header is loaded
            updateDate();
        }

        // Load footer
        const footerResponse = await fetch('components/footer.html');
        if (footerResponse.ok) {
            const footerHtml = await footerResponse.text();
            document.getElementById('footerContainer').innerHTML = footerHtml;
        }

        // Load sidebar
        const sidebarResponse = await fetch('components/sidebar.html');
        if (sidebarResponse.ok) {
            const sidebarHtml = await sidebarResponse.text();
            document.getElementById('sidebarContainer').innerHTML = sidebarHtml;
        }
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Update date in header
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        dateElement.textContent = now.toLocaleDateString('sl-SI', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
}

// Initialize router with routes
document.addEventListener('DOMContentLoaded', async () => {
    // Load header, footer and sidebar first
    await loadComponents();

    // Define routes
    router.addRoute('home', 'home', 'Matematika na Maturi');
    router.addRoute('logic', 'logika', '1. Logika');
    router.addRoute('sets', 'mnozice', '2. Množice');
    router.addRoute('numbers', 'stevila', '3. Številske množice');
    router.addRoute('algebra', 'algebra', '4. Algebra');
    router.addRoute('powers', 'potence', '5. Potence in koreni');
    router.addRoute('functions', 'funkcije', '6. Funkcije');
    router.addRoute('geometry', 'geometrija', '7. Geometrija');
    router.addRoute('shapes', 'oblike', '8. Liki in telesa');
    router.addRoute('vectors', 'vektorji', '9. Vektorji');
    router.addRoute('coordinates', 'koordinate', '10. Koordinate');
    router.addRoute('sequences', 'zaporedja', '11. Zaporedja');
    router.addRoute('calculus', 'analiza', '12. Diferencialni račun');
    router.addRoute('integrals', 'integrali', '13. Integrali');
    router.addRoute('combinatorics', 'kombinatorika', '14. Kombinatorika');
    router.addRoute('probability', 'verjetnost', '15. Verjetnost');
    router.addRoute('statistics', 'statistika', '16. Statistika');

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.view) {
            router.navigate(e.state.view);
        }
    });

    // Initial navigation
    const initialView = 'home';
    router.navigate(initialView);

    // Bind view interactions
    window.bindViewInteractions = bindViewInteractions;
});

function bindViewInteractions(view) {
    // Bind interactions based on the current view
    switch (view) {
        case 'algebra':
            bindAlgebraInteractions();
            break;
        case 'sequences':
            bindSequenceInteractions();
            break;
        case 'combinatorics':
            bindCombinatoricsInteractions();
            break;
        case 'geometry':
            bindGeometryInteractions();
            break;
    }
}

// Algebra interactions
function bindAlgebraInteractions() {
    const solveBtn = document.getElementById('solveQuadratic');
    if (solveBtn) {
        const newSolveBtn = solveBtn.cloneNode(true);
        solveBtn.parentNode.replaceChild(newSolveBtn, solveBtn);
        
        newSolveBtn.addEventListener('click', async () => {
            const a = parseFloat(document.getElementById('quadA').value);
            const b = parseFloat(document.getElementById('quadB').value);
            const c = parseFloat(document.getElementById('quadC').value);
            const result = document.getElementById('quadResult');

            if (isNaN(a) || isNaN(b) || isNaN(c)) {
                result.textContent = 'Prosim vnesite veljavna števila.';
                result.className = 'result-box error';
                return;
            }

            try {
                const data = await mathApi.solveQuadratic(a, b, c);
                if (data.type === 'real') {
                    result.textContent = `Rešitvi: ${data.solutions.join(', ')}`;
                } else {
                    result.textContent = 'Ni realnih rešitev (diskriminanta < 0)';
                }
                result.className = 'result-box success';
            } catch (error) {
                result.textContent = 'Napaka pri izračunu.';
                result.className = 'result-box error';
            }
        });
    }
}

// Sequence interactions
function bindSequenceInteractions() {
    // Arithmetic sequence
    const arithBtn = document.getElementById('calcArithmetic');
    if (arithBtn) {
        const newArithBtn = arithBtn.cloneNode(true);
        arithBtn.parentNode.replaceChild(newArithBtn, arithBtn);
        
        newArithBtn.addEventListener('click', async () => {
            const a1 = parseFloat(document.getElementById('arithA1').value);
            const d = parseFloat(document.getElementById('arithD').value);
            const n = parseInt(document.getElementById('arithN').value);
            const result = document.getElementById('arithResult');

            if (isNaN(a1) || isNaN(d) || isNaN(n) || n < 1) {
                result.textContent = 'Prosim vnesite veljavna števila.';
                result.className = 'result-box error';
                return;
            }

            try {
                const data = await mathApi.arithmeticSequence(a1, d, n);
                result.innerHTML = `
                    <div><strong>Členi:</strong> ${data.terms.join(', ')}</div>
                    <div><strong>Vsota:</strong> ${data.sum}</div>
                    <div><strong>${n}. člen:</strong> ${data.nthTerm}</div>
                `;
                result.className = 'result-box success';
            } catch (error) {
                result.textContent = 'Napaka pri izračunu.';
                result.className = 'result-box error';
            }
        });
    }

    // Geometric sequence
    const geomBtn = document.getElementById('calcGeometric');
    if (geomBtn) {
        const newGeomBtn = geomBtn.cloneNode(true);
        geomBtn.parentNode.replaceChild(newGeomBtn, geomBtn);
        
        newGeomBtn.addEventListener('click', async () => {
            const a1 = parseFloat(document.getElementById('geomA1').value);
            const q = parseFloat(document.getElementById('geomQ').value);
            const n = parseInt(document.getElementById('geomN').value);
            const result = document.getElementById('geomResult');

            if (isNaN(a1) || isNaN(q) || isNaN(n) || n < 1) {
                result.textContent = 'Prosim vnesite veljavna števila.';
                result.className = 'result-box error';
                return;
            }

            try {
                const data = await mathApi.geometricSequence(a1, q, n);
                result.innerHTML = `
                    <div><strong>Členi:</strong> ${data.terms.join(', ')}</div>
                    <div><strong>Vsota:</strong> ${data.sum}</div>
                    <div><strong>${n}. člen:</strong> ${data.nthTerm}</div>
                `;
                result.className = 'result-box success';
            } catch (error) {
                result.textContent = 'Napaka pri izračunu.';
                result.className = 'result-box error';
            }
        });
    }
}

// Combinatorics interactions
function bindCombinatoricsInteractions() {
    // Factorial
    const factBtn = document.getElementById('calcFactorial');
    if (factBtn) {
        const newFactBtn = factBtn.cloneNode(true);
        factBtn.parentNode.replaceChild(newFactBtn, factBtn);
        
        newFactBtn.addEventListener('click', async () => {
            const n = parseInt(document.getElementById('factN').value);
            const result = document.getElementById('factResult');

            if (isNaN(n) || n < 0) {
                result.textContent = 'Prosim vnesite nenegativno celo število.';
                result.className = 'result-box error';
                return;
            }

            try {
                const data = await mathApi.factorial(n);
                result.textContent = `${n}! = ${data.result}`;
                result.className = 'result-box success';
            } catch (error) {
                result.textContent = 'Napaka pri izračunu.';
                result.className = 'result-box error';
            }
        });
    }

    // Combination
    const combBtn = document.getElementById('calcCombination');
    if (combBtn) {
        const newCombBtn = combBtn.cloneNode(true);
        combBtn.parentNode.replaceChild(newCombBtn, combBtn);
        
        newCombBtn.addEventListener('click', async () => {
            const n = parseInt(document.getElementById('combN').value);
            const k = parseInt(document.getElementById('combK').value);
            const result = document.getElementById('combResult');

            if (isNaN(n) || isNaN(k) || k < 0 || k > n) {
                result.textContent = 'Prosim vnesite veljavni števili (0 ≤ k ≤ n).';
                result.className = 'result-box error';
                return;
            }

            try {
                const data = await mathApi.combination(n, k);
                result.textContent = `C(${n}, ${k}) = ${data.result}`;
                result.className = 'result-box success';
            } catch (error) {
                result.textContent = 'Napaka pri izračunu.';
                result.className = 'result-box error';
            }
        });
    }
}

// Geometry interactions
function bindGeometryInteractions() {
    // Pythagorean theorem
    const pythBtn = document.getElementById('calcPythagorean');
    if (pythBtn) {
        const newPythBtn = pythBtn.cloneNode(true);
        pythBtn.parentNode.replaceChild(newPythBtn, pythBtn);
        
        newPythBtn.addEventListener('click', async () => {
            const a = parseFloat(document.getElementById('pythA').value);
            const b = parseFloat(document.getElementById('pythB').value);
            const result = document.getElementById('pythResult');

            if (isNaN(a) || isNaN(b) || a < 0 || b < 0) {
                result.textContent = 'Prosim vnesite pozitivni števili.';
                result.className = 'result-box error';
                return;
            }

            try {
                const data = await mathApi.pythagorean(a, b);
                result.textContent = `c = √(${a}² + ${b}²) = ${data.c.toFixed(3)}`;
                result.className = 'result-box success';
            } catch (error) {
                result.textContent = 'Napaka pri izračunu.';
                result.className = 'result-box error';
            }
        });
    }

    // Distance between points
    const distBtn = document.getElementById('calcDistance');
    if (distBtn) {
        const newDistBtn = distBtn.cloneNode(true);
        distBtn.parentNode.replaceChild(newDistBtn, distBtn);
        
        newDistBtn.addEventListener('click', async () => {
            const x1 = parseFloat(document.getElementById('distX1').value);
            const y1 = parseFloat(document.getElementById('distY1').value);
            const x2 = parseFloat(document.getElementById('distX2').value);
            const y2 = parseFloat(document.getElementById('distY2').value);
            const result = document.getElementById('distResult');

            if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
                result.textContent = 'Prosim vnesite veljavne koordinate.';
                result.className = 'result-box error';
                return;
            }

            try {
                const data = await mathApi.distance(x1, y1, x2, y2);
                result.textContent = `d = ${data.distance.toFixed(3)}`;
                result.className = 'result-box success';
            } catch (error) {
                result.textContent = 'Napaka pri izračunu.';
                result.className = 'result-box error';
            }
        });
    }
}