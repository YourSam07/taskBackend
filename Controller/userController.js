const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')

// @desc    Register New User
// @route   POST /api/users
// @access  Public 
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const { name, email, password, rememberMe } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    if (!regex.test(email)) {
        res.status(400)
        throw new Error('Please Enter a valid Email')
    }

    // Create User
    const user = await User.create({
        name,
        email,
        password,
    })

    // Check if user exists 
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already Exists')
    }

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error('Invalid User details')
    }


})

// @desc    Authenticate User
// @route   POST /api/users/login
// @access  Public 
const loginrUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for User email
    const user = await User.findOne({ email })

    if(!email && !password){
        res.status(400)
        throw new Error('Please enter your email and password')
    }

    if (user && password === user.password) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }

    res.json({ message: "Login User" })
})

// @desc    Get User data
// @route   GET /api/users/data
// @access  Private
const getUserData = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

module.exports = {
    registerUser,
    loginrUser,
    getUserData
}