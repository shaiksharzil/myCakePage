const mongoose = require("mongoose");

const flavourSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Flavour name is required"],
      trim: true,
    },
    pricePerKg: {
      type: Number,
      required: [true, "Price per kg is required"],
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flavour", flavourSchema);
