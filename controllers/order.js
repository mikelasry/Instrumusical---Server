const orderService = require('../services/order');
const mongoose = require('mongoose');


/* ############################## Order CRUD ##############################  */

const createOrder = async (req,res) => {
    //console.log(req.body.params);
    let {quantityPerProduct,owner,orderDate,supplyDate,address,phoneNum,totalPrice,products} = req.body.params;
    quantityPerProduct = req.body.params.numOfProducts;
    let newOrder = await orderService.createOrder(quantityPerProduct,mongoose.Types.ObjectId(owner),orderDate,supplyDate,address,phoneNum,totalPrice,products);
    if(newOrder) return res.status(200).json(newOrder);
    return res.status(404).json();
}

const getAllOrders = async (req,res) => {
    const orders = await orderService.getAllOrders();
    if(orders) return res.status(200).json(orders);
    return res.status(404).json();
}

const updateOrder = async (req,res) => {
    if (!req.body) return res.status(400).json({errors:['Order features required!']});
    const {owner,orderDate,supplyDate,address,phoneNum,totalPrice,products} = req.body;
    const upOrder = await orderService.updateOrder(req.param.id,owner,orderDate,supplyDate,address,phoneNum,totalPrice,products);
    if(upOrder) return res.status(200).json(upOrder);
    return res.status(400).json({errors:['Update failed, please try again']});
}


const deleteOrder = async (req,res) => {
    success = orderService.deleteOrder(req.params.id);
    if(!success)
        res.status(404).json({errors:['Order not found!']});
    res.status(200);
}


module.exports = {
    createOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
}