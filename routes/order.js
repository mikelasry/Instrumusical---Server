const router = require('express').Router();
const orderController = require('../controllers/order');

router.route('/')
        .get(orderController.getAllOrders)
        .post(orderController.createOrder)
        .put(orderController.updateOrder)
        .delete(orderController.deleteOrder);
        


module.exports = router;