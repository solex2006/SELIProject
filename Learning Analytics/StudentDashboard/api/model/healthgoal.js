const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthG = new Schema ({
    uid: String,
    StartDate: {type: Date, default:0},
    Walk_g: {type: Number, default: 0},
    Sleep_g: {type: Number, default: 0},
    Calories_g: {type: Number, default: 0},
});

const HealthG = mongoose.model('healthG', healthG);

module.exports = HealthG;