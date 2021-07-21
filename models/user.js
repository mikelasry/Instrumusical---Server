const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: {type:String, unique:true, lowercase:true, default:"nomail@user"},
    password: {type:String, default:"0000"},
    isAdmin: {type:Boolean, default: false},
    connected:{type:Boolean, default: false}
});



module.exports = mongoose.model("User", User);