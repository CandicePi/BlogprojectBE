// blogController.js
const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");

// ------------------------------
// Upload Blog
// ------------------------------
const uploadBlog = async (req, res) => {
  try {
    const { title, subtitle, imageUrl, content } = req.body;

    // Get user from request (assuming auth middleware sets req.user)
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Create a new Post
    const blogPost = await Post.create({
      author: user._id,
      title,
      subtitle,
      imageUrl,
      content,
      type: "UPLOAD",
    });

    res.status(201).json({
      message: "Blog uploaded successfully",
      blog: blogPost,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getAllBlogPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({ posts });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------------------
// Populate Blog (Display blogs)
// ------------------------------
const populateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch post, optionally populate author info
    const post = await Post
      .findById(id)
      .populate("author", "username") // populate authir username
      .lean();

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ------------------------------
// Update Blog Post
// ------------------------------
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    // Check if the user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Not authorized" });
    }

    // Update fields
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.subtitle = req.body.subtitle || post.subtitle;
    post.imageUrl = req.body.imageUrl || post.imageUrl;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ------------------------------
// Delete Blog Post
// ------------------------------
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    // Only author can delete
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Not authorized" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { uploadBlog, populateBlog, updatePost, deletePost, getAllBlogPosts };