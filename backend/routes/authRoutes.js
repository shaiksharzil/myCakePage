const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyTokenMiddleware = require("../middleware/verifyToken");
const {
  signup,
  signin,
  verifyToken,
  logout,
  checkCustomUrl,
} = require("../controllers/authController");
router.get("/check-custom-url", authController.checkCustomUrl);
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify", verifyToken);
router.post("/logout", logout);
router.get("/check-custom-url", checkCustomUrl);
router.get("/verify-token", verifyTokenMiddleware, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
module.exports = router;
