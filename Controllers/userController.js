const express = require('express')
const User = require('../models/User')
const generateToken = require('../utiity/generateToken')

const register = async (req, res) => {
    try{
     const { name, email, password} = req.body;

     const userExists = await User.findOne({email})
     if(userExisits) {
        return res.status(400).json({error: "User already exisits"})
     }

     const user = await User.create({
        name, email, password
     })

     res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        blogpost: user.post,
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
    const {email, passowrd} = req.body

    const user = await User.findOne({email})

    if(!user || !(await user,matchPassword(password))) {
        return res.status(401).json({error: "Invalid credentials"})
    }
res.json({
    is: user._id,
    name: user.name,
    email: user.email,
    blogPost: user.blog,
    token: generateToken(user._id)
})

}



const getBlogPost = async (req, res) => {
    const user = await User.findById(req.user._id)
    res.json({ blogPost : user.post})
}

module.exports = ( register, login, getBlogPost)