const Order = require('../models/order');
const Instrument = require('../models/instrument');
const instrumentsService = require('../services/instrument');


/* ############################## Order CRUD ##############################  */
const createOrder = async (quantityPerProduct,owner,orderDate,supplyDate,address,phoneNum,totalPrice,products) => {
    for (let i in products){
        let instrument = products[i];
        let missing = quantityPerProduct[i] - instrument.quantity;
        if(missing >= 0){
            console.log(`Order of ${owner} id :`);
            console.log(`missing ${missing} ${instrument.name}`);
            instrument.sold += (instrument.quantity-1);
            instrument.quantity = 1;
        }
        else{
            instrument.sold += quantityPerProduct[i];
            instrument.quantity -= quantityPerProduct[i];
        }
        instrumentsService.updateInstrument(instrument._id,instrument.name,instrument.brand,
            instrument.category,instrument.imgPath, instrument.description,instrument.reviews,
            instrument.quantity,instrument.price,instrument.sold);
     }
    const order = new Order({
        owner: owner,
        orderDate: orderDate,
        supplyDate: supplyDate,
        address: address,
        phoneNum: phoneNum,
        totalPrice: totalPrice,
        products: products
    });
    return await order.save();
}

const getAllOrders = async () => {
    return Order.find({});
}

const updateOrder = async (id,owner,orderDate,supplyDate,address,phoneNum,totalPrice,products) => {
    const order = await Order.findById(id);
    if (order){
        if (owner) order.owner = owner;
        if (orderDate) order.orderDate = orderDate;
        if (supplyDate) order.supplyDate = supplyDate;
        if (address) order.address = address;
        if (phoneNum) order.phoneNum = phoneNum;
        if (totalPrice) order.totalPrice = totalPrice;
        if (products) order.products = products;
       
    }
    return order;
}

const deleteOrder = async (id) => {
    const order = await Order.findById(id);
    if (!order) return false;
    await order.remove();
    return true;
}

module.exports = {
    createOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
}