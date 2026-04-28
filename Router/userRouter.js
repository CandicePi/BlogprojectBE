const express = require("express")

const {login, register } = require('../Controllers/userController')

const router = express.Router()

router.post('/login', login)
router.post('/signup', register)


module.exports = router