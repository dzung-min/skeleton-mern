const httpError = require('http-errors')

module.exports = (error, next) => {
  if (error.name === 'ValidationError') {
    const message = Object.keys(error.errors)
      .map((field) => error.errors[field].message)
      .join('. ')
    return next(httpError.BadRequest(message))
  }
  if (error.name === 'CastError') {
    return next(httpError.BadRequest('Invalid id'))
  }
  if (error.code === 11000) {
    const message = 'Email is already exist'
    return next(httpError.Conflict(message))
  }
  next(error)
}
