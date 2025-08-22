const express = require('express');
const mongoose = require('mongoose');
const cookieParser= require('cookie-parser')
const cors = require('cors');
const { requireAuth, requireRole } = require("./middleware/authMiddleware");


const homeRoutes = require("./routes/home");
const customerRoutes = require("./routes/customer");
const dealershipRoutes = require("./routes/dealership");

require('dotenv').config();

const appRoutes= require("./routes/auth")

const app = express();
const port= process.env.PORT

// Connected MongoDB Atlas Database
const mongouri= process.env.MONGODB_URI;
mongoose.connect(mongouri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));



app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));
app.use('/api/auth', appRoutes);
app.use("/", homeRoutes);
app.use("/", customerRoutes);
app.use("/", dealershipRoutes);


app.get("/home", requireAuth, (req, res) => {
  if (req.user.role === "customer") {
    return res.redirect("/customer/home");
  } else if (req.user.role === "carDealership") {
    return res.redirect("/dealership/home");
  }
  return res.redirect("/");
});


app.get("/", (req, res) => {
    console.log("GET / request received");
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Server is running on port 8080");
});
