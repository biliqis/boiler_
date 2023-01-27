const express = require('express')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const app = express()
const dotenv = require("dotenv");

const mongoose = require('mongoose')

dotenv.config();
app.use(express.json())
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  app.use("/auth", authRoute)
  app.use("/user", userRoute)
  

app.listen(5000, ()=>{
    console.log('server is up an running')
})