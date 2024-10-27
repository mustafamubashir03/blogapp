const express = require("express");
const { User } = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Post } = require("../models/Post");

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.id;
  if (userId !== id) {
    return res.status(401).json({ message: "Not authorized now" });
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(req.body.password, salt);
    const passwordUpdate = await findByIdAndUpdate(id,{password:newPassword});
    if(!passwordUpdate){
      return res.status(401).json({message:"Not authorized"})
    }
  }
  if(req.body.username){
    newUsername = req.body.username;
    const usernameUpdate = await User.findByIdAndUpdate(userId, {username:newUsername},{new:true})
    if(!usernameUpdate){
      return res.status(401).json({message:"Not authorized"})
    }
  }
  if(req.body.image){
    newImage = req.body.image;
    const imageUpdate = await User.findByIdAndUpdate(userId, {image:newImage},{new:true})
    if(!imageUpdate){
      return res.status(401).json({message:"Not authorized"})
    }
  }
  if(req.body.email){
    newEmail = req.body.email;
    const emailUpdate = await User.findByIdAndUpdate(userId, {email:newEmail},{new:true})
    if(!emailUpdate){
      return res.status(401).json({message:"Not authorized"})
    }
  }
const userUpdate = await User.findById(userId);
  res.json(userUpdate);
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const userFound = await User.findById(id);
  if (!userFound) {
    res.status(401).json({ message: "Not authorized" });
  }
  const {password,...others} = userFound._doc;
  res.json(others);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.id;
  if (userId !== id) {
    return res.status(401).json({ message: "Not authorized now" });
  }
 const userFound = await User.findById(id);
 if(!userFound){
    return res.json({message:"User not found"})
 }
 await Post.deleteMany({username:userFound.username});
 await User.findByIdAndDelete(id);

  res.json({message:"User has been deleted"});
});








module.exports = router;