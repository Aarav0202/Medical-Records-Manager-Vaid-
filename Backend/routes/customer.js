const express = require("express");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/customer/home",
  requireAuth,
  requireRole("customer"),
  (req, res) => {
    res.json({ message: "Welcome to Customer Home" });
  }
);

module.exports = router;
