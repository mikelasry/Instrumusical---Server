const instrumentsService = require('../services/instrument');

/* ############################## Instruments CRUD ##############################  */

//   MAIN PAGE LOGIC- top sellers   //
const getTopSellers = async (req,res) => {
    const topSellers = await instrumentsService.getTopSellers();
    if(topSellers) return res.status(200).json(topSellers);
    return res.status(404).json();
}
//   GUITARS   //
const readAllGuitars = async (req,res) => {
    const guitars = await instrumentsService.readAllGuitars();
    if(guitars) return res.status(200).json(guitars);
    return res.status(404).json();
}
const createGuitar = async (req,res) => {
    const {name,brand,category,imgPath,description,reviews,quantity,price, sold} = req.body;
    const newGuitar = await instrumentsService.createInstrument(name,brand,category,imgPath,description,reviews,quantity,price,sold);
    if(newGuitar) return res.status(200).json(newGuitar);
    return res.status(404).json();

}
const deleteGuitar = async (req,res) => {
    success = instrumentsService.deleteInstrument(req.params.id);
    if(!success)
        res.status(404).json({errors:['Instrument not found!']});
    res.status(200);
}
const updateGuitar = async (req,res) => {
    if (!req.body) return res.status(400).json({errors:['Instrument features required!']});
    const {name,brand,category,imgPath,description,reviews,quantity,price} = req.body;
    const updatedInstrument = await instrumentsService.updateInstrument(req.param.id, name,brand,category,imgPath,description,reviews,quantity,price);
    if(updatedInstrument) return res.status(200).json(updateInstrument);
    return res.status(400).json({errors:['Update failed, please try again']});
}

//   DRUMS   //
const readAllDrums = async (req,res) => {
    
}
const createDrum = async (req,res) => {
    
}
const deleteDrum = async (req,res) => {
    
}
const updateDrum = async (req,res) => {
    
}

//   KEYS   //
const readAllKeys = async (req,res) => {
    
}
const createKey = async (req,res) => {
    
}
const deleteKey = async (req,res) => {
    
}
const updateKey = async (req,res) => {
    
}
//   DJ GEAR   //
const readAllDJGear = async (req,res) => {
    
}
const createDJGear = async (req,res) => {
    
}
const deleteDJGear = async (req,res) => {
    
}
const updateDJGear = async (req,res) => {
    
}
//   ACCESSORIES   //
const readAllAccessories = async (req,res) => {
    
}
const createAccessory = async (req,res) => {
    
}
const deleteAccessory = async (req,res) => {
    
}
const updateAccessory = async (req,res) => {
    
}


module.exports = {
    getTopSellers,
    readAllGuitars,
    createGuitar,
    deleteGuitar,
    updateGuitar,
    readAllDrums,
    createDrum,
    deleteDrum,
    updateDrum,
    readAllKeys,
    createKey,
    deleteKey,
    updateKey,
    readAllDJGear,
    createDJGear,
    deleteDJGear,
    updateDJGear,
    readAllAccessories,
    createAccessory,
    deleteAccessory,
    updateAccessory,

}