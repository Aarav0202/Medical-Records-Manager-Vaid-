const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 
const jwt=require('jsonwebtoken')
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error('Register route error:', error);
    res.status(500).json({ message: "Server error" });
  }
});


// Login Route API
router.post("/login" , async (req, res)=>{
  try{
    const{email , password}= req.body ;
    if(!email || !password){
      return res.status(400).json({message:"Email and password are required"});
    }
    const user= await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid email or password"});
    }
    const foundUser= await bcrypt.compare(password , user.password);
    if(!foundUser){
      return res.status(400).json({message:"Invalid email or password"});
    }
    const token = jwt.sign({
      id:user._id , email:user.email,
    }, process.env.JWT_SECRET);

    res.cookie('token', token,{
      httpOnly:true, 
      secure:process.env.NODE_ENV === 'production',
      sameSite:'strict',
    });

    res.status(200).json({message:"Login Successful"});

  }catch(error){
    res.status(500).json({message:"Server error"});
  }
});


//Logout Route API
router.post("/logout" , (req , res)=>{
  res.clearCookie('token',{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:'strict'
  });
  res.status(200).json({message:"Logged out successfully"})
})

// Check weather token present or not 
router.get("/checkToken", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }
  // Optionally verify token here
  res.json({ loggedIn: true });
});

module.exports= router;