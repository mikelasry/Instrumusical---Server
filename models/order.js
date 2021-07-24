const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'UserSchema'}, //User or UserSchema???
    orderDate: {type: Date},
    supplyDate: {type: Date},
    address: {type:String, required: true},
    phoneNum: {type: Number},
    totalPrice: {type: Number, required: true},
    products: [{type:mongoose.Schema.Types.ObjectId, ref:"Instrument", required: true}]

});

module.exports = mongoose.model('Order', Order)

