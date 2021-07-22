var router = require('express').Router();
var jwt = require('express-jwt');
var profileController = require('../controllers/profile');

var auth = jwt({
    secret: process.env.SECRETE,
    userProperty: 'payload'
});

router.get('/profile', auth, )