const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Instrument = new Schema({
    name: {type: String, required: true},
    brand: {type: String, required: true},
    category: { type: String, required: true},
    imgPath: {type: String, default: ""},
    description: {type: String, default: ""},
    reviews: {type: [Schema.Types.ObjectId], ref:"Review", default:[]},
    quantity: {type:Number, default:0, min:0},
    price: {type:Number, required:true, min:0},
    sold: {type: Number}
});
// declare 'text' index for free text searching
Instrument.index({
    name:"text",
    brand:"text",
    category:"text",
    description:"text"
});
module.exports = mongoose.model("Instrument", Instrument);