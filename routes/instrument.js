const router = require('express').Router();
const instrumentsController = require('../controllers/instrument');
const instrument = require('../models/instrument');


/* ############################## Instruments CRUD ##############################  */

//   MAIN PAGE LOGIC   //
router.route('/')
        .get(instrumentsController.getTopSellers)
        .post(instrumentsController.createInstrument)
        .delete(instrumentsController.deleteInstrument);

router.route('/:id')
        .delete(instrumentsController.deleteInstrument);

router.route('/all')
        .get(instrumentsController.getAllInstruments);        

//   BRANDS   //
router.route('/brands')
        .get(instrumentsController.getBrandsInstruments);
        
//   GUITARS   //
router.route('/guitars')
        .get(instrumentsController.readAllGuitars)
        .put(instrumentsController.updateInstrument);

//   DRUMS   //
router.route('/drums')
        .get(instrumentsController.readAllDrums)
        .delete(instrumentsController.deleteInstrument)
        .put(instrumentsController.updateInstrument);

//   KEYS   //
router.route('/keys')
        .get(instrumentsController.readAllKeys)
        .delete(instrumentsController.deleteInstrument)
        .put(instrumentsController.updateInstrument);

//   DJ GEAR   //
router.route('/dj-gear')
        .get(instrumentsController.readAllDJGear)
        .delete(instrumentsController.deleteInstrument)
        .put(instrumentsController.updateInstrument);

//   ACCESSORIES   //
router.route('/accessories')
        .get(instrumentsController.readAllAccessories)
        .delete(instrumentsController.deleteInstrument)
        .put(instrumentsController.updateInstrument);

router.route('/upload').post(instrumentsController.uploadInstruments);

router.route('/totalReviews').get(instrumentsController.getTotalReviews);


module.exports = router;