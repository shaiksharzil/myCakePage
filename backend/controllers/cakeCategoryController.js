const CakeCategory = require("../models/CakeCategory");
const Cake = require("../models/Cake");
const cloudinary = require("../config/cloudinary");


exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id; // user from auth middleware

    if (!name)
      return res.status(400).json({ message: "Category name is required." });

    const newCategory = new CakeCategory({ name, user: userId });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: "Server error creating category" });
  }
};

exports.getUserCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    const categories = await CakeCategory.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching categories" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await CakeCategory.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ updatedCategory: category });
  } catch (error) {
    res.status(500).json({ message: "Error updating category" });
  }
};


exports.deleteCakeCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // 1. Find the category
    const category = await CakeCategory.findById(categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });

    // 2. Check ownership (optional, but recommended)
    if (String(category.user) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this category" });
    }

    // 3. Find all cakes linked to this category
    const cakes = await Cake.find({ category: categoryId });

    // 4. Delete each cake's image from Cloudinary
    for (const cake of cakes) {
      if (cake.image?.public_id) {
        await cloudinary.uploader.destroy(cake.image.public_id);
      }
    }

    // 5. Delete cakes from DB
    await Cake.deleteMany({ category: categoryId });

    // 6. Delete the category
    await CakeCategory.findByIdAndDelete(categoryId);

    return res
      .status(200)
      .json({ message: "Category and related cakes deleted successfully" });
  } catch (error) {
    console.error("❌ Failed to delete category:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
