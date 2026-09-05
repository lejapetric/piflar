const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./api/routes');
const { errorHandler, notFound } = require('./api/middleware/error-handler');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servirajte statične datoteke iz korenske mape
app.use(express.static(__dirname));

// API routes
app.use('/api', apiRoutes);

// Serve index.html za vse non-API routes (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});