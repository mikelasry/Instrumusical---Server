// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @              - Mike's -                   @
// @   DELETE WHEN JWT DONE - JWT TUTORIAL     @
// @                                           @
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// var passport = require('passport');
// var mongoose = require('mongoose');
// var User = mongoose.model('User');

// module.exports.register = function(req, res){
//     console.log("(authController:register) ---> In register")
//     if(!(req.body.name || req.body.email)) {
//         return res.status(400).json({
//             "success":false,                     
//             "errors":["Missing name or email"]
//         });
//     }
    
//     var user = new User();                                   
//     user.name = req.body.name;       
//     user.email = req.body.email;
    
//     user.setPassword(req.body.password); //SRVC
    
//     user.save( function(_err) {
//         if(_err) return res.status(404).json({"success":false,"errors":[_err]});
//         var token = user.generateJwt();
//         res.status(200).json({"success":true,"token":token});
//     });
// };

// module.exports.login = function(req, res) {
//     console.log("(authController:login) ---> In login")
//     passport.authenticate('local', function(_err, _user, _info){
//         if (_err) return res.status(404).json({"success":false,"errors":[_err]});
//         if(!_user) return res.status(401).json({"success":false,"errors":[_info]});
//         var token;  
//         token = _user.generateJwt();
//         return res.status(200).json({"success":true, token : token});
//     })(req, res);
// };
