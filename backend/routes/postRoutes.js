// backend/routes/postRoutes.js
const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Route to post content
router.post("/postContent", async (req, res) => {
  try {
    const { content, username } = req.body;
    const newPost = new Post({
      type: "content",
      content,
      username,
      // Working,
      // image,
    });
    if (req.file) {
      newPost.image = req.file.path; 
    }
    await newPost.save();

    res.status(200).json({ message: "Post Created successfully" });
  } catch (error) {
    console.error("Error posting content:", error);
    console.error(error.message);
    console.error(error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getAllPosts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
