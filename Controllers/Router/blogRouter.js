const express = require("express");
const {
  uploadBlog,
  populateBlog,
  updatePost,
  deletePost,
  getAllBlogPosts
} = require("../blogController");

const protect = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/getAllBlogPosts", getAllBlogPosts);
router.post("/upload-blog", protect, uploadBlog);
router.get("/populate/:id", protect, populateBlog);
router.put("/updatePost/:id", protect, updatePost);
router.delete("/deletePost/:id", protect, deletePost);

module.exports = router;