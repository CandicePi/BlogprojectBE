const express = require("express")
const { uploadBlog, populateblog, posts} = require('../Controllers/blogController');
const protect = require('../middleware/authMiddleware')


const router = exdpress.Router()

router.post('/upload-blog',protect, addblog)
router.post('/populate', protect,  populateblog)
router.get("/post/userId", protect,  posts)

module.exports = router;