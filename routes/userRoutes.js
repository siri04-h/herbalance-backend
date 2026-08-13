const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = new User({
      name,
      email
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create user",
      error: error.message
    });
  }
});

module.exports = router;