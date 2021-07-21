const Instrument = require('../models/instrument');

const getSearchResults = async (searchTxt) =>{
    //TODO: massive input checking for db protection

    // break 'searchTxt' into tokens and find matches between the tokens
    // and Instrument string fields.

    return Instrument.find({
        $text:{
            $search: searchTxt
        }
    });
}

module.exports = {
    getSearchResults
}