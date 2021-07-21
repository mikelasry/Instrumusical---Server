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
    console.log("usersContrroller:update -> id: "+req.params.id +" || changing password to: "+req.body.password)
    const success = await usersService.updateUser(req.params.id, req.body.password);
    console.log("succes is: "+success)
    const user = await usersService.getUserById(req.params.id);
    if(!user) console.log("Somthing's weird!");
    console.log("user: "+user);
    if(!success){
        res.status(404).json({errors:["User to update not found."]});
        return;
    }
    res.status(200).json({success: success});
}

// delete
const deleteUser = async (req,res) => {
    const success = await usersService.deleteUser(req.params.id);
    if(!success){
        res.status(404).json({errors:["User to delete not found."]});
        return;
    }
    res.status(200).json({success:success});
}

const logUser = async (req, res) => {
    // console.log(`(usersController: logUser) ---> {connect, email, password}: ${req.body.connect}, ${req.body.email}, ${req.body.password}`);
    if (req.body.connect==undefined || !req.body.email ) 
        return res.status(404).json({
            success:false,
            errors:["One or more of the following fields are missing: [action,email]"]
        });
    
    const user = {
        connect: req.body.connect,
        email: req.body.email,
        password: req.body.password
    }

    const success = await usersService.logUser(user);
    // console.log(`(usersController: logUser) ---> success: ${success}`);
    const status = (success ? 200 : 404);
    return res.status(status).json({success: success});
}

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    logUser
}