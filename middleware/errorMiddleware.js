/* Error-handling middleware takes four parameters. 
The parameters must be provided to identify it as an 
error-handling middleware function: 
https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status ? err.status : 500;

  res.status(statusCode);

  res.json({
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
