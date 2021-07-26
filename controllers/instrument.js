const { json } = require('body-parser');
const instrumentsService = require('../services/instrument');


//   MAIN PAGE LOGIC- top sellers   //
const getTopSellers = async (req, res) => {
    const topSellers = await instrumentsService.getTopSellers();
    if (topSellers) return res.status(200).json(topSellers);
    return res.status(404).json();
}

//  INSTRUMENT   //
const getAllInstruments = async (req, res) => {
    const all = await instrumentsService.getAllInstruments();
    if (all) return res.status(200).json(all);
    return res.status(404).json();
}


const createInstrument = async (req, res) => {
    console.log("(instCntrlr:create) ---> ");
    const { name, brand, category, imgPath, description, reviews, quantity, price, sold } = req.body;
    const newInstrument = await instrumentsService.createInstrument(name, brand, category, imgPath, description, reviews, quantity, price, sold);
    if (newInstrument) {
        var sockets = req.app.get("socketsio");
        // console.log('Notifying addition..................................................');
        console.log(`${String(newInstrument)}`);
        let msg = `{"action":"inc","data":["${newInstrument._id}","${name}","${brand}","${category}","${imgPath}","${description}","${reviews}",${quantity},${price},${sold}]}`;
        console.log(msg);
        for (const s of sockets) s.send(msg);
        return res.status(200).json(newInstrument);
    }
    return res.status(404).json();
}

const deleteInstrument = async (req, res) => {
    success = instrumentsService.deleteInstrument(req.params.id);
    if (!success) res.status(404).json({ errors: ['Instrument not found!'] });
    var sockets = req.app.get("socketsio");
    let msg = `{"action":"del","id":"${req.params.id}"}`;
    console.log(msg);
    for (const s of sockets) s.send(msg);
    res.status(200).json({"success":true});
}

const updateInstrument = async (req,res) => {
    if (!req.body) return res.status(400).json({errors:['Instrument features required!']});
    const {name,brand,category,imgPath,description,reviews,quantity,price,sold} = req.body;
    const updatedInstrument = await instrumentsService.updateInstrument(req.param.id, name,brand,category,imgPath,description,reviews,quantity,price,sold);
    if(updatedInstrument) return res.status(200).json(updateInstrument);
    return res.status(400).json({errors:['Update failed, please try again']});
}

//   GUITARS   //
const readAllGuitars = async (req, res) => {
    const guitars = await instrumentsService.readAllGuitars();
    if (guitars) return res.status(200).json(guitars);
    return res.status(404).json();
}


//   DRUMS   //
const readAllDrums = async (req, res) => {
    const drums = await instrumentsService.readAllDrums();
    if (drums) return res.status(200).json(drums);
    return res.status(404).json();

}


//   KEYS   //
const readAllKeys = async (req, res) => {
    const keys = await instrumentsService.readAllKeys();
    if (keys) return res.status(200).json(keys);
    return res.status(404).json();
}

//   DJ GEAR   //
const readAllDJGear = async (req, res) => {
    const djGear = await instrumentsService.readAllDJGear();
    if (djGear) return res.status(200).json(djGear);
    return res.status(404).json();
}

//   ACCESSORIES   //
const readAllAccessories = async (req, res) => {
    const accessories = await instrumentsService.readAllAccessories();
    if (accessories) return res.status(200).json(accessories);
    return res.status(404).json();
}

//   BRANDS   //
const getBrandsInstruments = async (req, res) => {
    const brandInstruments = await instrumentsService.getBrandInstrumentList(req.query.brandKey);
    if (!brandInstruments) return res.status(404).json();
    return res.status(200).json(brandInstruments);
}

const uploadInstruments = async (req,res) => {
    const instrumentArray = req.body.data;
    for(let i=0; i < instrumentArray.length; i++){
        const success = await instrumentsService.createInstrument(instrumentArray[i].name,instrumentArray[i].brand,instrumentArray[i].category,instrumentArray[i].imgPath,instrumentArray[i].description,instrumentArray[i].reviews,instrumentArray[i].quantity,instrumentArray[i].price,instrumentArray[i].sold);
        if(!success) return res.status(404).json({"success":false});
    }
    return res.status(200).json({"success":true});
}
const getTotalReviews = async (req,res) => {
    const totalValue = await instrumentsService.getTotalReviews();
    if(!totalValue) return res.status(404).json();
    return res.status(200).json(totalValue[0]);
}




module.exports = {
    getTopSellers,
    readAllGuitars,
    createInstrument,
    deleteInstrument,
    updateInstrument,
    readAllDrums,
    readAllKeys,
    readAllDJGear,
    readAllAccessories,
    getBrandsInstruments,
    getAllInstruments,
    uploadInstruments,
    getTotalReviews,
   
}