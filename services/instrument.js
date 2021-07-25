const Instrument = require('../models/instrument');
const sketch = require('../models/cms');



/* ############################## Instruments CRUD ##############################  */
const createInstrument = async (name,brand,category,imgPath,description,reviews,quantity,price,sold) => {
    const instrument = new Instrument({
        name: name,
        brand: brand,
        category: category,
        imgPath: imgPath,
        description: description,
        reviews: reviews,
        quantity: quantity,
        price: price,
        sold: sold
    });
    
    //CMS implementation
    for(let review in reviews){
        if ( !review.includes(" ")){ // one word
            sketch.sketch.update(review, 1);
            continue;
        }
        let tokens = review.split(' ');
        for(let token in tokens){
            sketch.sketch.update(token, 1);
        }
    }
    
    return await instrument.save();
}

const deleteInstrument = async (id) => {
    const instrument = await Instrument.findById(id);
    if (!instrument) return false;
    await instrument.remove();
    return true;
}

const updateInstrument = async (id,name,brand,category,imgPath,description,reviews,quantity,price) => {
    const instrument = await Instrument.findById(id);
    if (instrument){
        if (name) instrument.name = name;
        if (brand) instrument.brand = brand;
        if (category) instrument.category = category;
        if (imgPath) instrument.imgPath = imgPath;
        if (description) instrument.description = description;
        if (reviews) instrument.reviews = reviews;
        if (quantity) instrument.quantity = quantity;
        if (price) instrument.price = price;
        if (sold) instrument.sold = sold;
    }
    return instrument;
}

const getAllInstruments = async () => {
    return await Instrument.find({});
}

//   MAIN PAGE LOGIC- top sellers   //
const getTopSellers = async () => {
    return Instrument.find({}).sort({sold:-1}).limit(4);
}

//   GUITARS   //

const readAllGuitars = async () => {
    return Instrument.find({category:"guitars"})
}

//   DRUMS   //
const readAllDrums = async () => {
    return Instrument.find({category:"drums"})
}

//   KEYS   //
const readAllKeys = async () => {
    return Instrument.find({category:"keys"})
}

//   DJ GEAR   //
const readAllDJGear = async () => {
    return Instrument.find({category:"DJGear"})
}

//   ACCESSORIES   //
const readAllAccessories = async () => {
    return Instrument.find({category:"accessories"})
}

//   BRANDS   //
const getBrandInstrumentList = async (brandName) =>{
    return Instrument.find({brand: brandName});

}
const getTotalReviews = async () =>{
    
    var value={};
    value.map=function(){
        // var v = this.price*this.quantity;
        // emit(this.name,v);};
        for (var idx = 0; idx < this.reviews.length; idx++) {
            var key = this.reviews[idx];
            var value = 1;
            emit("totalReviews", value);
         }

    };
    value.reduce=function(a,b){
        return Array.sum(b);
   
    }; 
     return Instrument.mapReduce(value).then(docs => { 
        
        return docs.results;
        });
     
       
    }


module.exports = {
    createInstrument,
    deleteInstrument,
    updateInstrument,
    getTopSellers,
    readAllGuitars,
    readAllDrums,
    readAllKeys,
    readAllDJGear,
    readAllAccessories,
    getBrandInstrumentList,
    getAllInstruments,
    getTotalReviews
}