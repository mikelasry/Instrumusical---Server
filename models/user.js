const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

require('custom-env');

// const userSchema = new Schema({
//     email: {type:String, unique:true, lowercase:true, default:"nomail@user"},
//     password: {type:String, default:"0000"},
//     isAdmin: {type:Boolean, default: false},
//     connected:{type:Boolean, default: false}
// });


var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    hash: String,
    salt: String

});

userSchema.methods.setPassword = function(_password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(_password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate()+7);
    return jwt.sign({
            _id: this._id,
            email: this.email,
            name: this.name,
            isAdmin: this.isAdmin,
            exp: parseInt(expiry.getTime()/1000)
        }, process.env.SECRET);
};

module.exports = mongoose.model("User", userSchema);