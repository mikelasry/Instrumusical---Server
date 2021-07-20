const User = require('../models/user');

// create
const createUser = async (_email, _password, _isAdmin) => {
    const user = new User({
        email = _email,
        password = _password, 
        isAdmin = _isAdmin
    });
    return await user.save();
}

// read one
const getUserById = (_id) =>{
    return await User.findById(_id);
}

// read many
const getUsers = async () => {
    return await User.find();
}

// update
const updateUser = async (_id, _password) => {
    const user = await User.findById(_id);
    if(!user) return false;
    User.updateOne({"_id": _id},{"password": _password});
    user.save()
    return true;
}

// delete
const deleteUser = async (_id) => {
    const user = await User.findById(_id);
    if (!user) return false;
    user.remove();
    return true;
}