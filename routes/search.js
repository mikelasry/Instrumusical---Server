const router = require('express').Router();
const searchController = require('../controllers/search');

router.route('/')
        .get(searchController.getSearchResults);
router.route('/filter')
        .get(searchController.getFilteredSearchResult);

router.route('/scrape/one')
        .get(searchController.getRandomScrapeInstrument);
                
router.route('/scrape')
        .get(searchController.getAllScrapeInstruments)
        .post(searchController.scrape);
        



        
module.exports = router;