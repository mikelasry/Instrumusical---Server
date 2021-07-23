const router = require('express').Router();
const searchController = require('../controllers/search');

router.route('/')
        .get(searchController.getSearchResults);
router.route('/filter')
        .get(searchController.getFilteredSearchResult);

        
module.exports = router;