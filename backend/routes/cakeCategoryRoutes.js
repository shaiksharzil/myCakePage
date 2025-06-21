const express = require("express");
const router = express.Router();
const {
  createCategory,
  getUserCategories,
  updateCategory,
  deleteCakeCategory,
} = require("../controllers/cakeCategoryController");
const auth = require("../middleware/auth"); // JWT middleware

router.post("/", auth, createCategory);
router.get("/", auth, getUserCategories);
router.put("/:id", auth, updateCategory);
router.delete("/:id", auth, deleteCakeCategory);


module.exports = router;
