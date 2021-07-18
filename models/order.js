const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    user: {type:Schema.Types.ObjectId, ref="User", required:true},
    date: {type: Date, default:Date.now},
    products: {type:[Schema.Types.ObjectId], ref="Instrument", required: true},
    address: {type:String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Order', Order)