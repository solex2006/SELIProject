const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activity = new Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    profile:{
       courses: {
           courseId: {type: String, ref: 'courses'},
           progress: Number,
           toResolve: [[{
                activityId: {
                        type: String, ref: 'activities'
                },
                resolved: Boolean,
            }]],
       }
    }
});
const main = mongoose.model('user', activity);
module.exports = main;