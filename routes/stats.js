const router = require('express').Router();
const cmsController = require('../controllers/cms');

router.route('/')
    .get(cmsController.getAllStats);

module.exports = router;