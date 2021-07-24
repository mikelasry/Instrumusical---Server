const router = require('express').Router();
//const instrumentsController = require('../controllers/instrument');
const cmsController = require('../controllers/cms');

router.route('/bar/keywords')
        .get(cmsController.getStatsByKeywords);

module.exports = router;
