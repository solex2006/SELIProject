const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepfit = new Schema ({
    id: String,
    uid: String,
    StartDate: {type: Date, default:0},
    Step: {type: Number, default: 0},
});

const stepdata = mongoose.model('stepdata', stepfit);

module.exports = stepdata;