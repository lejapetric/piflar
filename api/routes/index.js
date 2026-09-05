const express = require('express');
const router = express.Router();
const mathRoutes = require('./math-routes');

router.use('/math', mathRoutes);

module.exports = router;