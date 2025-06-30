const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const reservedRoutes = require("../utils/reservedRoutes");

exports.signup = async (req, res) => {
  const { username, email, password, customUrl, remember } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { username }, { customUrl }],
  });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    customUrl,
  });

  await newUser.save();

  // 🔐 Generate JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: remember ? "30d" : "1d",
  });

  // 🍪 Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
    sameSite: "None",
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ message: "User created successfully", token });
};



exports.checkCustomUrl = async (req, res) => {
  const { customUrl } = req.query;

  if (!customUrl) {
    return res.status(400).json({ message: "customUrl is required" });
  }

  const user = await User.findOne({ customUrl: customUrl.toLowerCase() });

  if (user || reservedRoutes.includes(customUrl.toLowerCase())) {
    return res.status(200).json({ exists: true, message: "URL already taken" });
  } else {
    return res.status(200).json({ exists: false, message: "URL is available" });
  }
};

exports.signin = async (req, res) => {
  const { username, password, remember } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: remember ? "30d" : "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // set to true in production (HTTPS)
    sameSite: "None",
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  });

  res
    .status(200)
    .json({ message: "Login successful", hasProfile: user.hasProfile });
};

exports.verifyToken = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Authenticated", userId: verified.id });
  } catch (err) {
    res.status(401).json({ message: "Token expired or invalid" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // must match cookie settings during login
    sameSite: "None", // must match
  });
  res.status(200).json({ message: "Logged out" });
};