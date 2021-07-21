const router = require('express').Router();
const searchController = require('../controllers/search');

router.route('/')
        .get(searchController.getSearchResults);

        
module.exports = router;