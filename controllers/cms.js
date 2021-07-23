const cmsService = require('../services/cms');

const getAllStats = async (req,res) => {
    const allStats = await cmsService.getAllStats();
    if(allStats) return res.status(200).json(allStats);
    return res.status(404).json();
}

module.exports = {
    getAllStats
}