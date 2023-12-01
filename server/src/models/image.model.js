const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {type: String},
    height: {type: Number},
    width: {type: Number},
    public_id: {type: String}
})

module.exports = imageSchema