const express = require('express');
const router = express.Router();
const mathController = require('../controllers/math-controller');

// Algebra
router.post('/quadratic', mathController.solveQuadratic);

// Zaporedja
router.post('/arithmetic', mathController.arithmeticSequence);
router.post('/geometric', mathController.geometricSequence);

// Kombinatorika
router.post('/factorial', mathController.factorial);
router.post('/combination', mathController.combination);

// Geometrija
router.post('/pythagorean', mathController.pythagorean);
router.post('/distance', mathController.distance);

module.exports = router;