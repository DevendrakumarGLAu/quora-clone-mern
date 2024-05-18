// backend/routes/postRoutes.js
const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const authMiddleware = require('../middleware/authMiddleware');
// const multer = require("multer");
// Route to post content
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// })
router.post("/postContent",authMiddleware, async (req, res) => {
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
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by createdAt field in descending order
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/getPostById/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/updatePost/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update the post content
    post.content = content;
    await post.save();

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.delete("deletePost/:postId", async (req, res) => {
  router.delete("/deletePost/:postId", async (req, res) => {
  try{
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if(!post){
      return res.status(404).json({ message: "Post not found"
       });
    }
    await Post.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post deleted successfully"
     });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/postComment/:postId', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId;
    const { comment, username } = req.body; // Extract comment and username from request body

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({ comment, username }); // Push comment with username
    await post.save();

    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/getAllComments/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comments = post.comments;
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/upvote/:postId", authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const userIndexInUpvotes = post.upvotes.indexOf(userId);
    const userIndexInDownvotes = post.downvotes.indexOf(userId);
    
    if (userIndexInUpvotes === -1) {
      post.upvotes.push(userId);
    } else {
      post.upvotes.splice(userIndexInUpvotes, 1);
    }
    if (userIndexInDownvotes !== -1) {
      post.downvotes.splice(userIndexInDownvotes, 1);
    }
    
    await post.save();
    res.status(200).json({ message: 'Post upvoted successfully' });
  } catch (error) {
    console.error('Error upvoting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/downvote/:postId", authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const userIndexInUpvotes = post.upvotes.indexOf(userId);
    const userIndexInDownvotes = post.downvotes.indexOf(userId);
    
    if (userIndexInDownvotes === -1) {
      post.downvotes.push(userId);
    } else {
      post.downvotes.splice(userIndexInDownvotes, 1);
    }
    if (userIndexInUpvotes !== -1) {
      post.upvotes.splice(userIndexInUpvotes, 1);
    }
    
    await post.save();
    res.status(200).json({ message: 'Post downvoted successfully' });
  } catch (error) {
    console.error('Error downvoting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
