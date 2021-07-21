const instrumentsService = require('../services/instrument');

// create
const createInstrument = async (req, res) => {
    // console.log('Creating');
    const {name,brand,category,imgPath,description,reviews,quantity,price} = req.body;
    const newInstrument = await instrumentsService.createInstrument(name,brand,category,imgPath,description,reviews,quantity,price);
    return res.json(newInstrument);
}

// read one
const getInstrumentById = async (req, res) => {
    const instrument = await instrumentsService.getInstrumentById(req.params.id);
    if (!instrument) 
        return res.status(404).json({errors:['Instrument not found.']});
    return res.status(200).json(instrument);
}

// read many
const getInstruments = async (req, res) => {
    // console.log("in fet instruments (controller)");
    const instruments = await instrumentsService.getInstruments();
    // console.log(typeof(instruments));
    return res.status(200).json(instruments);
}

// read many by category
const getInstrumentsByCategory = async (req, res) => {
    const instruments = await instrumentsService.getInstrumentsByCategory(res.params.category);
    if (!instrument)
        return res.status(404).json({errors:['Instruments not found.']});
    return res.status(200).json(instrument);
}

// update
const updateInstrument = async (req, res) => {
    if (!req.body)
        return res.status(400).json({errors:['Instrument features required!']});
    const {name,brand,category,imgPath,description,reviews,quantity,price} = req.body;
    const updatedInstrument = await instrumentsService.updateInstrument(req.param.id, name,brand,category,imgPath,description,reviews,quantity,price);
    return res.status(200).json(updateInstrument);
}

// delete
const deleteInstrument = async (req, res) => {
    success = instrumentsService.deleteInstrument(req.params.id);
    if(!success)
        res.status(404).json({errors:['Instrument not found!']});
    res.status(200);    
}

module.exports = {
    deleteInstrument,
    updateInstrument,
    getInstrumentsByCategory,
    getInstruments,
    getInstrumentById,
    createInstrument
}