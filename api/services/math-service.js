// api/services/math-service.js

// Algebra
exports.solveQuadratic = (a, b, c) => {
    if (a === 0) throw new Error('a ne sme biti 0');
    
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return { type: 'real', solutions: [x1, x2] };
    } else if (discriminant === 0) {
        const x = -b / (2 * a);
        return { type: 'real', solutions: [x] };
    } else {
        return { type: 'complex', solutions: [] };
    }
};

// Zaporedja
exports.arithmeticSequence = (a1, d, n) => {
    if (n < 1 || !Number.isInteger(n)) throw new Error('n mora biti pozitivno celo število');
    
    const terms = [];
    for (let i = 1; i <= n; i++) {
        terms.push(a1 + (i - 1) * d);
    }
    
    const sum = (n / 2) * (2 * a1 + (n - 1) * d);
    const nthTerm = a1 + (n - 1) * d;
    
    return { terms, sum, nthTerm };
};

exports.geometricSequence = (a1, q, n) => {
    if (n < 1 || !Number.isInteger(n)) throw new Error('n mora biti pozitivno celo število');
    if (q === 1) {
        return { terms: Array(n).fill(a1), sum: a1 * n, nthTerm: a1 };
    }
    
    const terms = [];
    for (let i = 1; i <= n; i++) {
        terms.push(a1 * Math.pow(q, i - 1));
    }
    
    const sum = a1 * (Math.pow(q, n) - 1) / (q - 1);
    const nthTerm = a1 * Math.pow(q, n - 1);
    
    return { terms, sum, nthTerm };
};

// Kombinatorika
exports.factorial = (n) => {
    if (n < 0 || !Number.isInteger(n)) throw new Error('n mora biti nenegativno celo število');
    
    if (n === 0 || n === 1) return { result: 1 };
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return { result };
};

exports.combination = (n, k) => {
    if (n < 0 || k < 0 || k > n || !Number.isInteger(n) || !Number.isInteger(k)) {
        throw new Error('Velja mora biti 0 ≤ k ≤ n');
    }
    
    if (k === 0 || k === n) return { result: 1 };
    
    // Optimiziran izračun
    if (k > n - k) {
        k = n - k;
    }
    
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result = result * (n - k + i) / i;
    }
    
    return { result: Math.round(result) };
};

// Geometrija
exports.pythagorean = (a, b) => {
    if (a < 0 || b < 0) throw new Error('Stranici morata biti pozitivni');
    
    const c = Math.sqrt(a * a + b * b);
    return { c };
};

exports.distance = (x1, y1, x2, y2) => {
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return { distance };
};