const httpError = require('http-errors')

exports.notFound = (req, res, next) => {
  next(httpError.NotFound())
}

exports.generic = (err, req, res, next) => {
  const message = err.message || 'Something went wrong'
  const stCode = err.status || 500
  res.status(stCode).json({ error: message })
}
