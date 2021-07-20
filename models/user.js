const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {type:String, unique:true, lowercase:true},
    password: {type:string},
    isAdmin: {type:Boolean, default: false}
});
// a change
module.exports = mongoose.model("User", User);