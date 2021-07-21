const router = require('express').Router();
const instrumentsController = require('../controllers/instrument');


/* ############################## Instruments CRUD ##############################  */
//   MAIN PAGE LOGIC   //
router.route('/')
        .get(instrumentsController.getTopSellers);

//   GUITARS   //
router.route('/guitars')
        .get(instrumentsController.readAllGuitars)
        .post(instrumentsController.createGuitar)
        .delete(instrumentsController.deleteGuitar)
        .put(instrumentsController.updateGuitar);

//   DRUMS   //
router.route('/drums')
        .get(instrumentsController.readAllDrums)
        .post(instrumentsController.createDrum)
        .delete(instrumentsController.deleteDrum)
        .put(instrumentsController.updateDrum);

//   KEYS   //
router.route('/keys')
        .get(instrumentsController.readAllKeys)
        .post(instrumentsController.createKey)
        .delete(instrumentsController.deleteKey)
        .put(instrumentsController.updateKey);

//   DJ GEAR   //
router.route('/dj-gear')
        .get(instrumentsController.readAllDJGear)
        .post(instrumentsController.createDJGear)
        .delete(instrumentsController.deleteDJGear)
        .put(instrumentsController.updateDJGear);

//   ACCESSORIES   //
router.route('/accessories')
        .get(instrumentsController.readAllAccessories)
        .post(instrumentsController.createAccessory)
        .delete(instrumentsController.deleteAccessory)
        .put(instrumentsController.updateAccessory);


module.exports = router;