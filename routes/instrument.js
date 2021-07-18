const router = require('express').Router();
const instrumentsController = require('../controllers/instrument');

router.route('/')
    .get(instrumentsController.getInstruments)
    .post(instrumentsController.createInstrument);

router.route('/:id')
    .get(instrumentsController.getInstrumentById)
    .patch(instrumentsController.updateInstrument)
    .delete(instrumentsController.deleteInstrument);

module.exports = router;