const usersService = require('../services/user');

// create
const createUser = async (req,res) => {
    const newUser = await usersService.createUser(req.body.email, req.body.password, req.body.isAdmin);
    res.status(200).json(newUser);    
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
    res.status(200).json(usersList);
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

const logUser = async (req, res) => {
    console.log(`usersController:logUser ---> ${req.body.connect},${req.body.email},${req.body.password}`)
    if (req.body.connect == undefined || !req.body.email ) 
        return res.status(404).json({
            success:false,
            errors:["One or more of the following fields are missing: [action,email]"]
        });
    
    const user = {
        connect: req.body.connect,
        email: req.body.email,
        password: req.body.password
    }

    const loggedUser = await usersService.logUser(user);
    const status = (loggedUser ? 200 : 404);
    return res.status(status).json({success: (loggedUser ? true : false), data: [loggedUser]});
}

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    logUser
}