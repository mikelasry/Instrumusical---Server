const Store = require('../models/store');


const createStore = async(lat,lng)=>{
    const store= new Store({
        lat:lat,
        lng:lng
    });
    return await store.save();

}

const deleteStore= async (id) => {
    console.log(`id is ${id}`)
    const store= await Store.findById(id);
    console.log(`service deleteStore,  ${store}`);
    if (!store) return false;
    await store.remove();
    return true;

}

const getAllStores= async()=>{
    return Store.find({});
}

module.exports={
    deleteStore,
    createStore,
    getAllStores,

}