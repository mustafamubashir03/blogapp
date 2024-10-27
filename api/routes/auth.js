const express = require("express");
const { userSchema, userLoginSchema } = require("../zod");
const { User } = require("../models/User.js");
const bcrypt = require("bcrypt");
const router = express.Router();

//Sign Up
router.post("/sign-up", async (req, res) => {
  try {
    const userInfo = req.body;
    const validated = userSchema.safeParse(userInfo);
    if (!validated.success) {
      return res.status(403).json({ message: "Invalid input format" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userInfo.password, salt);
    const userCreated = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.json(userCreated);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Log in

router.post("/log-in", async (req, res) => {
  try {
    const { success } = userLoginSchema.safeParse(req.body);
    if (!success) {
      return res.json({ message: "Invalid input format" });
    }
    const username = req.body.username;
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return res.json({ message: "Invalid credentials" });
    }
    const validPassword = bcrypt.compare(userFound.password, req.body.password);
    if (validPassword) {
      res.json(userFound);
    }
  } catch (error) {
    return res.status(500).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
