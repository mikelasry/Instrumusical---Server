const User = require('../models/user');

// create
const createUser = async (_email, _password, _isAdmin) => {
    console.log("service -> Create User\nparams are: " + _email +", "+_password+", "+_isAdmin);
    const user = new User({
        email : _email,
        password : _password, 
        isAdmin : _isAdmin
    });
    return await user.save();
}

// read one
const getUserById = async (_id) =>{
    return await User.findById(_id);
}

// read many
const getUsers = async () => {
    return await User.find();
}

// update
const updateUser = async (_id, _password) => {
    console.log("usersService:update -> id: " + _id + " || password: "+_password);
    const user = await User.findById(_id);
    if(!user) return false;
    User.updateOne({"_id": _id},{"password": _password}).exec();
    // const newUser = new User({
        
    //     email: user.email,
    //     password: _password,
    //     isAdmin: user.isAdmin
    // });
    // newUser.save();
    return true;
}

// delete
const deleteUser = async (_id) => {
    const user = await User.findById(_id);
    if (!user) return false;
    user.remove();
    return true;
}

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
}