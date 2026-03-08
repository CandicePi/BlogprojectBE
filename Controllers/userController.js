const express = require('express')
const User = require('../models/User')
const generateToken = require('../utility/generateToken')

const register = async (req, res) => {
    try{
     const { username, email, password} = req.body;

     const userExists = await User.findOne({email})
     if(userExists) {
        return res.status(400).json({error: "User already exisits"})
     }

     const user = await User.create({
        username, email, password
     })

     res.status(201).json({
        id: user._id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id)
     })

    }
    catch(error) {
        res.status(400).json({
            error: error.message
        })

    }
}

const login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user || !(await user.matchPassword(password))) {
        return res.status(401).json({error: "Invalid credentials"})
    }
res.json({
    is: user._id,
    Username: user.username,
    email: user.email,
    token: generateToken(user._id)
})

}






module.exports = { register, login};