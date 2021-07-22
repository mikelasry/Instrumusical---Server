var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res){
    if(!(req.body.name || req.body.email)) 
        return res.status(400).json({
                    "success":false, 
                    "errors":["Missing name and email"]
                });
    
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save( function(_err) {
        if(_err) return res.status(404).json({"success":false,"errors":[_err]});
        var token = user.generateJwt();
        res.status(200).json({"success":true,"token":token});
    });
};

module.exports.login = function(req, res) {

    passport.authenticate('local', function(_err, _user, _info){
      var token;
  
      // If Passport throws/catches an error
      if (_err) return res.status(404).json(_err);
      if(!_user) return res.status(401).json({
                        "success":false,
                        "errors":[_info]
                    });
  
      // If a user is found
      if(_user){
        token = _user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      } 
      
    })(req, res);
  
  };
