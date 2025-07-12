const express = require("express");
const router = express.Router();
const Cake = require("../models/Cake");
const cakeCategory = require("../models/CakeCategory");
const {
  createCake,
  getCakesByCategory,
  updateCake,
  deleteCake
} = require("../controllers/cakeController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post("/", auth, upload.single("image"), createCake);
router.get("/:categoryId", getCakesByCategory);
router.put("/:id", auth, upload.single("image"), updateCake);
router.delete("/:id", auth, deleteCake);
router.get("/category/:id", async (req, res) => {
  try {
    const cakes = await Cake.find({ category: req.params.id }).populate(
      "flavours"
    );
    const categoryName = await cakeCategory.findById(req.params.id).select("name");
    res.json({cakes, categoryName});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cakes" });
  }
});

module.exports = router;
