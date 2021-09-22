const httpError = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const config = require('../config')
const User = require('../models/user.model')

exports.signin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      throw httpError.BadRequest('Email and password are required')
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw httpError.Unauthorized(
        'Please try another email or register a new account'
      )
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      throw httpError.Unauthorized("Email and password don't match")
    }
    const token = jwt.sign(
      { userId: user._id, userName: user.name },
      config.jwtSecret,
      { algorithm: 'HS512', expiresIn: '7 days' }
    )
    res.cookie('t', token)
    res.json({ data: { token, user } })
  } catch (error) {
    next(error)
  }
}

exports.signout = (req, res) => {
  res.clearCookie('t')
  res.send()
}

exports.requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS512'],
  userProperty: 'auth',
})

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.user && req.auth && req.user._id.toString() === req.auth.userId
  if (!authorized) {
    return res.status(403).json({ error: { message: 'User is unauthorized' } })
  }
  next()
}
