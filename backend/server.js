const express = require("express")
const errorHanler = require("./middlewares/errorHandler")
const connectDB = require("./config/db")
const app = express()
const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const bcrypt = require('bcrypt');
const cors = require("cors")
const cookieParser = require("cookie-parser")
const verifyAdmin = require("./middlewares/adminVerification")
// Middleware
app.use(express.json())
app.use(
    cors({
      origin: 'http://localhost:5173', 
      credentials: true, 
    })
  );
app.use(cookieParser())

// DataBase connected 
connectDB()
// Router

app.use("/api/auth",require("./routes/auth.routes")) 
app.use("/api/admin", require("./routes/admin.route"));
app.use("/api/auth/loans", require("./routes/loan.routes")); 

app.use(errorHanler)
app.listen(PORT,()=>console.log(`Server is running at port : ${PORT}`))
