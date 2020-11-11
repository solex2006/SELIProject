const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseDuration = new Schema ({
   _id: String,
   title: String,
   duration: Number
});
const courses = mongoose.model('courses', courseDuration);

module.exports = courses;