const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Flavour = require("../models/Flavour");
const User = require("../models/User");
const {
  createFlavour,
  getMyFlavours,
  deleteFlavour,
  updateFlavour,
} = require("../controllers/flavourController");

router.post("/", auth, createFlavour);
router.get("/me", auth, getMyFlavours);
router.delete("/:id", auth, deleteFlavour);
router.put("/:id", auth, updateFlavour);
router.get("/custom/:customUrl", async (req, res) => {
  try {
    const user = await User.findOne({ customUrl: req.params.customUrl });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const flavours = await Flavour.find({ user: user._id });
    res.json(flavours);
  } catch (error) {
    console.error("Error fetching flavours by customUrl:", error);
    res.status(500).json({ error: "Failed to fetch flavours" });
  }
});


module.exports = router;
