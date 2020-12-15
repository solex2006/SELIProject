const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema ({
    uid: String,
    email: String,
    fullname: String,
    picture: String,
});

const Profile = mongoose.model('userprofile', mySchema);

module.exports = Profile;