const sketch = require('../models/cms');

const getAllStats = async () => {
    console.log("getAllStats")
    return sketch.sketch.toJSON();
}

const getStatsByKeywords = async (wordsStr) => {
    words = wordsStr.split(',');
    result = {};
    words.forEach( word => {
        result[word] = sketch.sketch.query(word);
    });

    return result;
}

module.exports = {
    getAllStats,
    getStatsByKeywords
}