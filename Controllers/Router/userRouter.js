const express = require("express")
const { register, login, getBlogPost}  = require('../Controllers/userController')
const protect = require('../middleware/authMiddleware');

const router = express.Router()


router.post('/login', login)
router.post('/signup', register)
router.get('/posts/', protect, getBlogPost)



module.exports = router;