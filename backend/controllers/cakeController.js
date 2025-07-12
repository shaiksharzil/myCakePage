const Cake = require("../models/Cake");
const cakeCategory = require("../models/CakeCategory");
const cloudinary = require("../config/cloudinary");

exports.createCake = async (req, res) => {
  try {
    const { minQty, extraPrice, cakeCategoryId, flavours, cakeName } = req.body;

    if (!req.file || !minQty || !cakeCategoryId) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    const newCake = new Cake({
      owner: req.user._id,
      category: cakeCategoryId,
      minOrderQty: minQty,
      cakeName,
      extraPrice,
      flavours: flavours ? JSON.parse(flavours) : [],
      imageUrl: req.file.path, // Already uploaded by multer-cloudinary
      image: {
        public_id: req.file.filename, // This is the public_id
        url: req.file.path,
      },
    });

    await newCake.save();
    res.status(201).json(newCake);
  } catch (err) {
    console.error("🛑 Error creating cake:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




exports.getCakesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const cakes = await Cake.find({ category: categoryId }).populate(
      "flavours"
    );
    const categoryName = await cakeCategory.findById(categoryId).select("name");
    res.status(200).json({ cakes, categoryName });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cakes" });
  }
};


exports.updateCake = async (req, res) => {
  try {
    const { minQty, extraPrice, oldPublicId, flavours, cakeName } = req.body;
    const cakeId = req.params.id;

    const updateData = {
      minOrderQty: minQty,
      extraPrice,
      cakeName,
      flavours: flavours ? JSON.parse(flavours) : [],
    };

    // ✅ Only process image if new file was uploaded
    if (req.file) {
      // 🧹 delete old image
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId);
      }

      updateData.imageUrl = req.file.path;
      updateData.image = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    const updatedCake = await Cake.findByIdAndUpdate(cakeId, updateData, {
      new: true,
    });

    res.status(200).json(updatedCake);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.deleteCake = async (req, res) => {
  try {
    const cakeId = req.params.id;
    const { publicId } = req.body; // optional but recommended

    const cake = await Cake.findById(cakeId);
    if (!cake) return res.status(404).json({ error: "Cake not found" });
    if (cake.image?.public_id) {
      await cloudinary.uploader.destroy(cake.image.public_id);
    }

    // Optional: check if current user is the owner
    if (String(cake.owner) !== String(req.user._id)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // 🧹 Delete from Cloudinary
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    } else {
      // If publicId isn't passed, try extracting from stored URL (not 100% reliable)
      const imageUrl = cake.imageUrl;
      if (imageUrl) {
        const matches = imageUrl.match(/\/([^/]+)\.[a-z]+$/i); // extract filename
        const derivedPublicId = matches?.[1];
        if (derivedPublicId) {
          await cloudinary.uploader.destroy(`cakes/${derivedPublicId}`);
        }
      }
    }

    // 🧹 Delete from MongoDB
    await Cake.findByIdAndDelete(cakeId);

    res.status(200).json({ message: "Cake deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};