const usersService = require('../services/user');
var passport = require('passport');
// // create
// const createUser = async (req,res) => {
//     const newUser = await usersService.createUser(req.body.email, req.body.password, req.body.isAdmin);
//     res.status(200).json(newUser);    
// }

// create
const register = async (req,res) => {
    console.log(`(userController:register) ---> In register ${JSON.stringify(req.body)}`)
    if(!(req.body.name && req.body.email && req.body.password)) 
        return res.status(400).json({
            "success":false, 
            "errors":["Missing name email or password"]
        });
    
    const token = await usersService.register(req.body.email, req.body.name, req.body.password);
    console.log(`(userController:register) ---> Service register answer: ${token}`);
    const status = (token) ? 200 : 402;
    return res.status(status).json({
        "success": token ? true : false,
        "token": token ? token : null
    });
}

// read one
const getUserById = async (req,res) =>{
    const user = await usersService.getUserById(req.params.id);
    if (!user){
        res.status(404).json({errors:['User not found.']});
        return;
    }
    res.status(200).json(user);    
}

// read many
const getUsers = async (req,res) =>{
    const usersList = await usersService.getUsers();
    return res.status(200).json({"success": true, "data": [usersList]});
}

// update
const updateUser = async (req,res) => {    
    const success = await usersService.updateUser(req.params.id, req.body.password);
    const user = await usersService.getUserById(req.params.id);
    if(!user) console.log("Somthing's weird!");
    if(!success) return res.status(404).json({errors:["User to update not found."]});
    return res.status(200).json({success: success});
}

// delete
const deleteUser = async (req,res) => {
    const success = await usersService.deleteUser(req.params.id);
    if(!success) return res.status(404).json({errors:["User to delete not found."]});
    return res.status(200).json({success:success});
}

// const logUser = async (req, res) => {
//     console.log(`usersController:logUser ---> ${req.body.connect},${req.body.email},${req.body.password}`)
//     if (req.body.connect == undefined || !req.body.email ) 
//         return res.status(404).json({
//             success:false,
//             errors:["One or more of the following fields are missing: [action,email]"]
//         });
    
//     const user = {
//         connect: req.body.connect,
//         email: req.body.email,
//         password: req.body.password
//     }

//     const loggedUser = await usersService.logUser(user);
//     const status = (loggedUser ? 200 : 404);
//     return res.status(status).json({success: (loggedUser ? true : false), data: [loggedUser]});
// }

// const login = async (req, res) => {
//     const loggedUser = await usersService.logUser(user);
//     const status = (loggedUser ? 200 : 404);
//     return res.status(status).json({success: (loggedUser ? true : false), data: [loggedUser]});
// }

const login = async (req, res) => {
    console.log("(userController:login) ---> In login!!")
    return await passport.authenticate('local', function(_err, _user, _info){
        if (_err) return res.status(404).json({"success":false,"errors":[_err]});
        if(!_user) return res.status(401).json({"success":false,"errors":[_info]});
        console.log("(userController:login) ---> User authenticated!!!");
        var token = _user.generateJwt();
        console.log(`(userController:login) ---> token: ${token}`);
        return res.status(200).json({"success":true, token : token});
    })(req, res);
}

// const login = async (req, res)

// const login = async (req, res) => {
//     // console.log("(userController:login) ---> In login")
//     await passport.authenticate('local', function(_err, _user, _info){
//         if (_err) return res.status(404).json({"success":false,"errors":[_err]});
//         if(!_user) return res.status(401).json({"success":false,"errors":[_info]});
//         var token = _user.generateJwt();
//         return res.status(200).json({"success":true, token : token});
//     });
// }

module.exports = {
    register,
    getUserById,
    getUsers,
    updateUser,
    deleteUser, 
    login
}