const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { promisify } = require ('util');

const asyncSign = promisify(jwt.sign);
// Register
const create = (user) => User.create(user);

// Login
const login = async({username , password}) => {
    const user = await User.findOne({username}).exec();
    if (!user){
        throw Error('UN_AUTHENTICATED');
    }
    const isValidPass = user.validatePassword(password);
    if(!(isValidPass)){
        throw Error('UN_AUTHENTICATED');
    }
    const token = await asyncSign({
        username : user.username ,
        id : user.id
    }, 'SECRET_MUST_BE_COMPLEX' , {expiresIn: '1d'})
    return { ...user.toJSON(), token } ;
} 

// Get all users
const getAll = () => User.find({}).exec();

// Get user
const getById = (id) => User.findById(id).exec();

// Edit
const edit = (id,body) => User.findByIdAndUpdate(id,body, {new : true}).exec();

// Follow
const follow = (followingId,id) => User.update({"_id" : id},{
    $push : {
        following: followingId
    }
})

// UnFollow
const unfollow = (followingId,id) => User.update({"_id" : id},{
    $pull : {
        following: followingId
    }
})


module.exports = {
    create , login , getAll , getById , edit , follow , unfollow
};