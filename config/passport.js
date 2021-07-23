var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({usernameField:'email'},
    function(_username, _password, done){
        User.findOne({email: _username}, 
            function(_err, _user) {
                if(_err)return done(_err)
                // return if user not found in DB:
                if(!_user) return done(null, false, {message: "User not found"});
                // return if password incorrect:
                if(!_user.validPassword(_password)) return done(null, false, {message: "Password is wrong"});
                // credentials are correct
                return done(null, _user);
            } 
        );
    }
));