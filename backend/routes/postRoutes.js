// backend/routes/postRoutes.js
const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Route to post content
router.post("/postContent", async (req, res) => {
  try {
    const { content, username, Working, image } = req.body;

    // Assuming you have a 'Post' model with fields: content, username, Working, image
    const newPost = new Post({
      type: "content",
      content,
      username,
      Working,
      // image,
    });
    if (req.file) {
      newPost.image = req.file.path; // Assuming you are storing the image file path
    }
    await newPost.save();

    res.status(200).json({ message: "Post Created successfully" });
  } catch (error) {
    console.error("Error posting content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
