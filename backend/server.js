const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");
const path = require("path");
const cakeCategoryRoutes = require("./routes/cakeCategoryRoutes");
const flavourRoutes = require("./routes/flavourRoutes");
const cakeRoutes = require("./routes/cakeRoutes");
const publicRoutes = require("./routes/publicRoutes");



dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);
app.use("/api/categories", cakeCategoryRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/flavours", flavourRoutes);
app.use("/api/cakes", cakeRoutes);

app.use("/api/public", publicRoutes);
app.get("/ping", (req, res) => res.send("pong"));
app.post("/send-email", async (req, res) => {
  const { name, email, mobile, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New Contact from ${name}`,
      html: `
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${mobile}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => console.log(err));
