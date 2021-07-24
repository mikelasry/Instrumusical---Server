const router = require('express').Router();
const instrumentsController = require('../controllers/instrument');


/* ############################## Instruments CRUD ##############################  */

//   MAIN PAGE LOGIC   //
router.route('/')
        .get(instrumentsController.getTopSellers)
        .post(instrumentsController.createInstrument);

//   BRANDS   //
router.route('/brands')
        .get(instrumentsController.getBrandsInstruments);
        
//   GUITARS   //
router.route('/guitars')
        .get(instrumentsController.readAllGuitars)
        .delete(instrumentsController.deleteInstrument)
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


module.exports = router;