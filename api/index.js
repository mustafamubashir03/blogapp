
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const path = require('path')
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors());
const multer = require('multer')
const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/user.js")
const postRoute = require("./routes/post.js")
const catRoute = require("./routes/category.js")
const PORT = 3000;

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(console.log("DB has been started"));
app.use(express.json());
app.use("/api/auth",authRoute)
app.use("/api/users", userRoute)
app.use("/api/post", postRoute)
app.use("/api/category",catRoute);


const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"images")
  },filename: (req,file,cb)=>{
    cb(null,req.body.name)
  }
})

const upload = multer({
  storage: storage
})

app.post("/api/upload",upload.single("file"),(req,res)=>{
  res.json({message:"File has been uploaded"})
})
app.listen(PORT, () => {
  console.log("Server has been started");
});
