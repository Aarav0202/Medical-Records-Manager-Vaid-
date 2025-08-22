// Backend/routes/home.js
const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/home", requireAuth, (req, res) => {
  if (req.user.role === "customer") {
    return res.json({ page: "Customer Home" });
  } else if (req.user.role === "carDealership") {
    return res.json({ page: "Dealership Home" });
  }
  res.json({ page: "Generic Home" });
});

module.exports = router;
