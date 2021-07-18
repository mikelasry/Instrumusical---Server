const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Review = new Schema({
    user: {type:Schema.Types.ObjectId, ref="User", required: true},
    title: {type:String},
    content:{type:String},
    rating: {type:Number, default:0, min:1, max:5},
    created: {type:Date, default: Date.now()}    
});

module.exports = mongoose.model("Review", Review);