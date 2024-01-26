// routes/spaceRoutes.js

const express = require("express");
const router = express.Router();
const Space = require("../models/space");

router.post("/createSpace", async (req, res) => {
  try {
    const { name, description,username } = req.body;
    // for checking if space name already exists
    const existingSpace = await Space.findOne({ name });
    if (existingSpace) {
      return res.status(400).json({ error: "Space name already exists" });
    }
    const newSpace = new Space({
      name,
      description,
      username,
    });
    await newSpace.save();

    res.status(201).json({ message: "Space created successfully" });
  } catch (error) {
    console.error("Error creating space:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getSpaces", async (req, res) => {
  try {
    const spaces = await Space.find();
    res.status(200).json(spaces);
  } catch (error) {
    console.error("Error fetching spaces:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;
