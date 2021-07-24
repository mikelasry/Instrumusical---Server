const router = require('express').Router();
const instrumentsController = require('../controllers/instrument');


/* ############################## Instruments CRUD ##############################  */

//   MAIN PAGE LOGIC   //
router.route('/')
        .get(instrumentsController.getTopSellers);

router.route('/all')
        .get(instrumentsController.getAllInstruments);        

//   BRANDS   //
router.route('/brands')
        .get(instrumentsController.getBrandsInstruments);
        
//   GUITARS   //
router.route('/guitars')
        .get(instrumentsController.readAllGuitars)
        .post(instrumentsController.createInstrument)
        .delete(instrumentsController.deleteInstrument)
        .put(instrumentsController.updateInstrument);

//   DRUMS   //
router.route('/drums')
        .get(instrumentsController.readAllDrums)
        .post(instrumentsController.createInstrument)
        .delete(instrumentsController.deleteInstrument)
        .put(instrumentsController.updateInstrument);

//   KEYS   //
router.route('/keys')
        .get(instrumentsController.readAllKeys)
        .post(instrumentsController.createInstrument)
        .delete(instrumentsController.deleteInstrument)
        .put(instrumentsController.updateInstrument);

//   DJ GEAR   //
router.route('/dj-gear')
        .get(instrumentsController.readAllDJGear)
        .post(instrumentsController.createInstrument)
        .delete(instrumentsController.deleteInstrument)
        .put(instrumentsController.updateInstrument);

//   ACCESSORIES   //
router.route('/accessories')
        .get(instrumentsController.readAllAccessories)
        .post(instrumentsController.createInstrument)
        .delete(instrumentsController.deleteInstrument)
        .put(instrumentsController.updateInstrument);


module.exports = router;