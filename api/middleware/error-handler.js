// api/middleware/error-handler.js
exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
};

exports.notFound = (req, res, next) => {
    res.status(404).json({
        error: {
            message: 'API route not found',
            status: 404
        }
    });
};