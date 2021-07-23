var router = require('express').Router();
const usersController = require('../controllers/user');

router.route("/")
    .get(usersController.getUsers)
    .post(usersController.register);

router.route("/login")
    .post(usersController.login);

router.route("/register")
    .post(usersController.register)

router.route("/:id")
    .get(usersController.getUserById)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router;
