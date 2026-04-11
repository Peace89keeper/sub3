class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }


  if (err.name === 'ValidationError') {
    // 1. Fix the typo: Use 'err.errors' instead of 'error.errors'
    // 2. Change the map variable to 'valError' to avoid confusing the outer 'err'
    const validationErrors = Object.values(err.errors).map(valError => valError.message);
    
    // 3. Update the main err object so the return statement at the bottom handles it
    err = new ErrorHandler(validationErrors.join(', '), 400);
  }


  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
