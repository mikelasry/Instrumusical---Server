const router = require('express').Router();
const storeController = require('../controllers/store');


router.route('/')
.get(storeController.getAllStores)
.post(storeController.createStore)
.delete(storeController.deleteStore);
 


module.exports= router;
