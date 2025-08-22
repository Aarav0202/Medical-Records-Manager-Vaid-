const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// ---------------------- REGISTER ----------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, dealershipId } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Name, email, password, and role are required" });
    }

    // check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // handle employees -> only dealerships can create
    if (role === "employee") {
      if (!dealershipId) {
        return res
          .status(400)
          .json({ message: "dealershipId is required for employees" });
      }

      // verify dealership exists
      const dealership = await User.findById(dealershipId);
      if (!dealership || dealership.role !== "carDealership") {
        return res.status(400).json({ message: "Invalid dealership ID" });
      }
    }

    // handle customers (optional dealership)
    if (role === "customer" && dealershipId) {
      const dealership = await User.findById(dealershipId);
      if (!dealership || dealership.role !== "carDealership") {
        return res
          .status(400)
          .json({ message: "Invalid dealership ID for customer" });
      }
    }

    // hash password
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashedPass,
      role,
      dealershipId:
        role === "employee" || (role === "customer" && dealershipId)
          ? dealershipId
          : null,
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, role: newUser.role },
    });
  } catch (error) {
    console.error("Register route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------- LOGIN ----------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
  message: "Login successful",
  user: {
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,       // optional
    dealershipId: user.dealershipId || null // optional
  }
});
  } catch (error) {
    console.error("Login route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------------- LOGOUT ----------------------
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// ---------------------- CHECK TOKEN ----------------------
router.get("/checkToken", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch full user info from DB
    const user = await User.findById(decoded.id).select("id name email role dealershipId");

    if (!user) {
      return res.status(401).json({ loggedIn: false });
    }

    res.json({ loggedIn: true, user });
  } catch (err) {
    return res.status(401).json({ loggedIn: false });
  }
});


module.exports = router;
