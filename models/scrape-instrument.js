const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScrapeInstrument = new Schema({
    name : {
        type: String,
        required: true,
        unique:true
    },
    link : {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('ScrapeInstrument', ScrapeInstrument);