const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  customUrl: { type: String, required: true, unique: true },
  hasProfile: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
