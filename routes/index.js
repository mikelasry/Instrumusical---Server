var router = require('express').Router();
var jwt = require('express-jwt');
var profileController = require('../controllers/profile');
// var authController = require('../controllers/authentication');
require('custom-env');

var auth = jwt({
    secret: process.env.SECRET,
    algorithms: ['RS256'],
    userProperty: 'payload'
});

router.get('/profile', auth, profileController.profileRead);

// router.post('/login', authController.login);
// router.post('/register', authController.register);

module.exports = router;