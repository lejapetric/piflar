// api/middleware/error-handler.js
// Zadnji middleware: ujame napake iz vseh poti.
export default function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) return next(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: status === 500 ? "Napaka na strežniku." : err.message });
}
