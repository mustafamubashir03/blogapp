const express = require("express");
const { postSchema } = require("../zod.js");
const { Post } = require("../models/Post.js");
const router = express.Router();

//Create
router.post("/", async (req, res) => {
  try {
    const postInfo = req.body;
    const { success } = postSchema.safeParse(postInfo);
    if (!success) {
      return res.status(403).json({ message: "Invalid input provided" });
    }
    const postCreated = await Post.create(postInfo);
    res.json(postCreated);
  } catch (error) {
    return res.json({ message: "Couldn't create post ", error });
  }
});

//Read
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const postFound = await Post.findOne({ _id: id });
    res.json(postFound);
  } catch (error) {
    return res.json({ message: "Couldn't find post by id" });
  }
});
//Read all
router.get("/", async (req, res) => {
  const username = req.query.username;
  const category = req.query.category;
  let postFound;
  if (username) {
    postFound = await Post.find({ username });
  } else if (category) {
    postFound = await Post.find({
      categories: {
        $in: [category],
      },
    });
  } else {
    postFound = await Post.find({});
  }
  res.json(postFound);
});

//Update
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const username = req.body.username;
  const postFound = await Post.findOne({ _id: id });
  console.log(postFound);
  if (postFound.username !== username) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const updated = await Post.updateOne(
    { _id: id },
    { $set: req.body },
    { new: true }
  );
  res.json(updated);
});

//Delete

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const username = req.body.username;
  const postFound = await Post.findOne({ _id: id });
  console.log(postFound);
  if (postFound.username !== username) {
    return res.status(401).json({ message: "Not authorized" });
  }
  await Post.findByIdAndDelete({ _id: id });
  res.json({ message: "Post has been deleted" });
});

module.exports = router;
