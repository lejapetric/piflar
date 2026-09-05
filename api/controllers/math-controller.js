const mathService = require('../services/math-service');

// Algebra
exports.solveQuadratic = (req, res) => {
    try {
        const { a, b, c } = req.body;
        const result = mathService.solveQuadratic(a, b, c);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Zaporedja
exports.arithmeticSequence = (req, res) => {
    try {
        const { a1, d, n } = req.body;
        const result = mathService.arithmeticSequence(a1, d, n);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.geometricSequence = (req, res) => {
    try {
        const { a1, q, n } = req.body;
        const result = mathService.geometricSequence(a1, q, n);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Kombinatorika
exports.factorial = (req, res) => {
    try {
        const { n } = req.body;
        const result = mathService.factorial(n);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.combination = (req, res) => {
    try {
        const { n, k } = req.body;
        const result = mathService.combination(n, k);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Geometrija
exports.pythagorean = (req, res) => {
    try {
        const { a, b } = req.body;
        const result = mathService.pythagorean(a, b);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.distance = (req, res) => {
    try {
        const { x1, y1, x2, y2 } = req.body;
        const result = mathService.distance(x1, y1, x2, y2);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};