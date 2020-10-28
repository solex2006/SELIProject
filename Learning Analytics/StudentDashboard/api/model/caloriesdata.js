const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calfit = new Schema ({
    id: String,
    uid: String,
    StartDate: {type: Date, default:0},
    Calories: {type: Number, default: 1},
});


const caloriesdata = mongoose.model('caloriesdata', calfit);

module.exports = caloriesdata;