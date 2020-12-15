const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseDuration = new Schema ({
    _id:  String,
    score: Number,
    hits: Number,
   
});
const activities = mongoose.model('activities', courseDuration);

module.exports = activities;