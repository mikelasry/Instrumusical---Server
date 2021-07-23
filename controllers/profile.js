var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function (req, res) {
    if (!req.payload._id)
        return res.status(401).json({
            "success": false,
            "errors": ["UnauthorizedError: private profile"]
        });

    User.findById(req.payload._id).exec(
        function (_err, _user) {
            if(_err) return res.status(402).json({"success":false, errors: ["User not found."]});
            return res.status(200).json({"success":true, "data": _user});
        }
    );
};