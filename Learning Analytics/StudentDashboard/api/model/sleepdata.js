const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fitSchema = new Schema ({
    id: String,
    uid: String,
    StartDate: {type: Date, default:0},
    Sleep: {type: Number, default: 0},
});

const Sleepdata = mongoose.model('Sleepdata', fitSchema);
module.exports = Sleepdata;