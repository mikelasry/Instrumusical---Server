var router = require('express').Router();
const usersController = require('../controllers/user');

router.route("/")
    .get(usersController.getUsers)
    .post(usersController.createUser);

router.route("/log")
    .post(usersController.logUser)

router.route("/:id")
    .get(usersController.getUserById)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router;
