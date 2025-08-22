const express = require("express");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dealership/home", requireAuth, requireRole("carDealership"), (req, res) => {
  res.send("Welcome Dealership Dashboard");
});

module.exports = router;
