const Post = require("../models/postModel");
const User = require("../models/Users");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPost = new Post({ title, description, image, user: existingUser });
    await newPost.save();
    res.status(201).json({ newPost, message: "Post created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "Internal server error" });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, description, image, likes, user } = req.body;
    let existingUser;
    if (user) {
      existingUser = await User.findById(user);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, image, likes, user: existingUser },
      { new: true, runValidators: true }
    );

    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
