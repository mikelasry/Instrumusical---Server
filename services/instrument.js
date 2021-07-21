const Instrument = require('../models/instrument');


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

//   MAIN PAGE LOGIC- top sellers   //
const getTopSellers = async () => {
    return Instrument.find({}).sort({sold:-1}).limit(4);
}

//   GUITARS   //

const readAllGuitars = async () => {
    return Instrument.find({category:"guitars"})
}

//   DRUMS   //


//   KEYS   //


//   DJ GEAR   //


//   ACCESSORIES   //


module.exports = {
    createInstrument,
    deleteInstrument,
    updateInstrument,
    getTopSellers,
    readAllGuitars,

}