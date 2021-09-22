const router = require('express').Router()

const authController = require('../controllers/auth.controller')

router.route('/signin').post(authController.signin)
router.route('/signout').get(authController.signout)

module.exports = router
