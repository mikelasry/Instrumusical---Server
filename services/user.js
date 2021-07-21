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
    return true;
}

// delete
const deleteUser = async (_id) => {
    const user = await User.findById(_id);
    if (!user) return false;
    user.remove();
    return true;
}


const findByEmail = async (_email) => {
    const user = User.findOne({"email":_email}).exec();
    if(!user) return null;
    return user;
}

const logUser = async (_user) => {
    /*
    _user from frontend = {
        connect: boolean,   (true: log in | false: log out)
        email: string,      (to find user by email)
        password: string    (compare with db user password)
    }
    */  

    // console.log("(Inside of users Service:logUser) ---> user: " + _user);
    if (!_user || !_user.email) return false; // got an empty obj / no email field
    const user = await findByEmail(_user.email); // find user by email
    if (!user || _user.connect == undefined) return false; // user not found / no connect field
    if (user.connected == _user.connect) return user; // asked operation already applied
    if (_user.connect && (user.password != _user.password)) return false;  // user wants to log in but password incorrect
    User.updateOne({"_id": user._id},{"connected": _user.connect}).exec();
    return user;
}

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    logUser
}