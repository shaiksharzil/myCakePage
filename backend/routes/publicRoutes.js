// routes/publicRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");
const CakeCategory = require("../models/CakeCategory");

router.get("/profile/:customUrl", async (req, res) => {
  try {
    const customUrl = req.params.customUrl;

    const user = await User.findOne({ customUrl });
    if (!user || !user.hasProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = await Profile.findOneAndUpdate(
      { user: user._id },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
});
router.get("/:customUrl", async (req, res) => {
  try {
    const user = await User.findOne({ customUrl: req.params.customUrl });

    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = await Profile.findOne({ user: user._id }).select(
      "-user -__v"
    );
    const categories = await CakeCategory.find({ user: user._id }).select(
      "-user -__v"
    );

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json({ profile, categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
