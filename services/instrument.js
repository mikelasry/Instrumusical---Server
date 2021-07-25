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

const updateInstrument = async (id,name,brand,category,imgPath,description,reviews,quantity,price,sold) => {
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
    console.log("(instService:topSellers)")
    return await Instrument.find({}).sort({sold:-1}).limit(4);
}

//   GUITARS   //

const readAllGuitars = async () => {
    return await Instrument.find({category:"guitars"})
}

//   DRUMS   //
const readAllDrums = async () => {
    return await Instrument.find({category:"drums"})
}

//   KEYS   //
const readAllKeys = async () => {
    return await Instrument.find({category:"keys"})
}

//   DJ GEAR   //
const readAllDJGear = async () => {
    return await Instrument.find({category:"DJGear"})
}

//   ACCESSORIES   //
const readAllAccessories = async () => {
    return await Instrument.find({category:"accessories"})
}

//   BRANDS   //
const getBrandInstrumentList = async (brandName) =>{
    return await Instrument.find({brand: brandName});

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
    getAllInstruments
}