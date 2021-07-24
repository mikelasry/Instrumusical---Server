const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Store = new Schema({
    lat: {type:Number,require:true},
    lng: {type:Number,require:true}

   
});

module.exports = mongoose.model("Store", Store);