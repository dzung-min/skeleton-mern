const router = require('express').Router()

const userController = require('../controllers/user.controller')

router.route('/').post(userController.create).get(userController.list)
router
  .route('/:id')
  .get(userController.read)
  .patch(userController.update)
  .delete(userController.remove)
router.param('id', userController.loadById)

module.exports = router
