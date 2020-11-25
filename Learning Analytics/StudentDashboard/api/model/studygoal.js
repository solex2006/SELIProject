const mongoose = require('mongoose');
const { Strategy } = require('passport');
const Schema = mongoose.Schema;

const studyG = new Schema ({
    uid: String,
    courseId: {type: String, required: true},
    StartDate: {type: Date, default:0},
    activity: {type: Number, default: 0},
    progress: {type: Number, default: 0},
	duration: {type: Number, default: 0},
	timeline: {type: Number, default: 0},   
});


const StudyG = mongoose.model('studyG', studyG);

module.exports = StudyG;