const sketch = require('../models/cms');

const getAllStats = async () => {
    return sketch.sketch.toJSON();
}

module.exports = {
    getAllStats
}