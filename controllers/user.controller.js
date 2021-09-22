const httpError = require('http-errors')

const User = require('../models/user.model')
const normalizeError = require('../helpers/normalizeError')

exports.create = async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ data: user })
  } catch (error) {
    normalizeError(error, next)
  }
}

exports.list = async (req, res, next) => {
  try {
    const users = await User.find()
    res.json({ data: users })
  } catch (error) {
    normalizeError(error, next)
  }
}

exports.loadById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      throw httpError.NotFound('User not found')
    }
    req.user = user
    next()
  } catch (error) {
    normalizeError(error, next)
  }
}

exports.read = (req, res) => {
  res.json({ data: req.user })
}

exports.update = async (req, res, next) => {
  const { user } = req
  const allowUpdate = ['name', 'email', 'password']
  allowUpdate.forEach((update) => {
    user[update] = req.body[update] || user[update]
  })
  try {
    await user.save()
    res.json({ data: user })
  } catch (error) {
    normalizeError(error, next)
  }
}

exports.remove = async (req, res, next) => {
  await req.user.remove()
  res.send()
}
