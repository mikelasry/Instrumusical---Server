const storeService = require('../services/store');

const createStore = async (req,res) => {
    const {lat,lng} = req.body;
    console.log(`lat is: ${req.body.lng}`);
    const newStore = await storeService.createStore(lat,lng);
    if(newStore) return res.status(200).json(newStore);
    return res.status(404).json();
}

const deleteStore = async (req,res) => {
    seccess= storeService.deleteStore(req.body.id);
    if(!seccess) res.status(404).json({errors:['Store not found']});
    res.status(200).json({"success":true});
}
const getAllStores= async(req,res)=>{
    const allStores = await storeService.getAllStores();
    if(allStores) return res.status(200).json(allStores);
    return res.status(404).json();
}

module.exports ={
    getAllStores,
    createStore,
    deleteStore
}
