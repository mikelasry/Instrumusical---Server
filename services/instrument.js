const instrument = require('../models/instrument');
const Instrument = require('../models/instrument');

// create
const createInstrument = async (_name, _brand, _category, _imgPath, _description, _reviews, _quantity, _price) => {
    const instrument = new Instrument({
        name: _name,
        brand: _brand,
        category: _category,
        imgPath: _imgPath,
        description: _description,
        reviews: _reviews,
        quantity: _quantity,
        price: _price,
        sold: _sold
    });
    return await instrument.save();
}

// read one
const getInstrumentById = async (id) => {
    return await Instrument.findById(id);
}


// read many
const getInstruments = async () =>{
    return await Instrument.find({});
}

// read by category
const getInstrumentsByCategory = async (category) => {
    return await Instrument.find({'category':category})
}

// update
const updateInstrument = async (_id,_name, _brand, _category, _imgPath, _description, _reviews, _quantity, _price)=>{
    const instrument = await getInstrumentById(_id);
    if (!instrument) return false;
    if (_name) instrument.name = _name;
    if (_brand) instrument.brand = _brand;
    if (_category) instrument.category = _category;
    if (_imgPath) instrument.imgPath = _imgPath;
    if (_description) instrument.description = _description;
    if (_reviews) instrument.reviews = _reviews;
    if (_quantity) instrument.quantity = _quantity;
    if (_price) instrument.price = _price;
}

// delete
const deleteInstrument = async (id) => {
    const instrument = await getInstrumentById(id);
    // if (!instrument) return false;
    await instrument.remove();
    return true;
}

module.exports = {
    deleteInstrument,
    updateInstrument,
    getInstrumentsByCategory,
    getInstruments,
    getInstrumentById,
    createInstrument
}