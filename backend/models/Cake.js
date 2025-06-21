const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    cakeName: {
      type: String,
    },
    image: {
      public_id: { type: String, required: true }, // ✅ for Cloudinary deletion
      url: { type: String, required: true },
    },
    minOrderQty: {
      type: Number,
      required: true,
    },
    extraPrice: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CakeCategory",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    flavours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flavour",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cake", cakeSchema);
