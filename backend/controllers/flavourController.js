const Flavour = require("../models/Flavour");

exports.createFlavour = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Authenticated user:", req.user);
  try {
    const { name, pricePerKg } = req.body;

    if (!name || !pricePerKg) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const flavour = await Flavour.create({
      user: req.user._id,
      name,
      pricePerKg,
    });

    res.status(201).json(flavour);
  } catch (error) {
    res.status(500).json({ message: "Failed to create flavour" });
  }
};

exports.getMyFlavours = async (req, res) => {
  try {
    const flavours = await Flavour.find({ user: req.user._id });
    res.status(200).json(flavours);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch flavours" });
  }
};

exports.deleteFlavour = async (req, res) => {
  try {
    const flavour = await Flavour.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!flavour) return res.status(404).json({ message: "Flavour not found" });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

exports.updateFlavour = async (req, res) => {
  try {
    const { name, pricePerKg } = req.body;

    const updated = await Flavour.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, pricePerKg },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Flavour not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
