const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/verifyToken");
const {
  createProfile,
  updateProfile
} = require("../controllers/profileController");
const User = require("../models/User");
const Profile = require("../models/Profile");

// POST /api/profile/create
router.post("/create", verifyToken, upload.single("image"), createProfile);
router.put("/update", verifyToken, upload.single("image"), updateProfile);
// ✅ GET /api/profile/me
router.get("/me", verifyToken, async (req, res) => {

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id).select("customUrl");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ user, profile });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});  


module.exports = router;
