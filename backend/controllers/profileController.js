// ... existing requires
const path = require("path");
const Profile = require("../models/Profile");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

exports.createProfile = async (req, res) => {
  try {
    const { bakeryName, address, mobile } = req.body;

    if (!bakeryName || !address || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path;
    }

    const existingProfile = await Profile.findOne({ user: req.user.id });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Profile already exists for this user" });
    }

    const newProfile = new Profile({
      user: req.user.id,
      bakeryName,
      address,
      mobile,
      imageUrl,
    });

    await newProfile.save();
    await User.findByIdAndUpdate(req.user.id, { hasProfile: true });

    res.status(201).json({ message: "Profile created", profile: newProfile });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { bakeryName, address, mobile, removeImage } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Delete old image if new one uploaded or removeImage = true
    if ((req.file || removeImage === "true") && profile.imageUrl) {
      const publicId = profile.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`MyCakeApp/${publicId}`);
      profile.imageUrl = "";
    }

    if (req.file) {
      profile.imageUrl = req.file.path;
    }

    profile.bakeryName = bakeryName;
    profile.address = address;
    profile.mobile = mobile;

    await profile.save();
    res.status(200).json({ message: "Profile updated", profile });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};