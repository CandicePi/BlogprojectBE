const express = require("express")

const {login, register } = require('../userController')

const router = express.Router()

router.post('/login', login)
router.post('/signup', register)


module.exports = router