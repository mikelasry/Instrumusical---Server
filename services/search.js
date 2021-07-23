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

const getFilteredSearchResult = async(filterList) => {
    
    categoryFilter = '';
    brandFilter= '';
    minPriceFilter = 0;
    maxPriceFilter = 10000;

    if(!filterList[0] == '') categoryFilter = filterList[0].toLowerCase();
    if(!filterList[1] == '') brandFilter = filterList[1].toLowerCase();
    if(!filterList[2] == ''){
        let tempFilter = filterList[2].split(/[$,-]/);
        minPriceFilter = parseInt(tempFilter[0]);
        maxPriceFilter = parseInt(tempFilter[2]);
    }
    if(categoryFilter == '' && brandFilter == ''){
        return Instrument.aggregate([
            { 
                $match:
                {
                    $and: [
                    {category: {$exists: true}},
                    {brand: {$exists: true}},
                    {price: {$gte: minPriceFilter, $lte: maxPriceFilter}}
                    ]
                }                      
            }]);
        }
    if(categoryFilter == ''){
    return Instrument.aggregate([
        { 
            $match:
            {
                $and: [
                {category: {$exists: true}},
                {brand: brandFilter},
                {price: {$gte: minPriceFilter, $lte: maxPriceFilter}}
                ]
            }                      
        }]);
    }
    if(brandFilter == ''){
        return Instrument.aggregate([
            { 
                $match:
                {
                    $and: [
                    {category: categoryFilter},
                    {brand: {$exists: true}},
                    {price: {$gte: minPriceFilter, $lte: maxPriceFilter}}
                    ]
                }                      
            }]);
        }
    return Instrument.aggregate([
        { 
            $match:
            {
                $and: [
                {category: categoryFilter},
                {brand: brandFilter},
                {price: {$gte: minPriceFilter, $lte: maxPriceFilter}}
                ]
            }                      
        }]);
}



module.exports = {
    getSearchResults,
    getFilteredSearchResult,
}