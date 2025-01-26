const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: [true, "Username should be unique!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email must be unique!"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required!"],
      unique: [true, "Contact must be unique!"],
    },
    address: {
      type: String,
      required: [true, "Address is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    age: {
      type: Number,
      required: [true, "Age is required!"],
      min: 18,
      max: 50,
    },
    profilePhoto: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", 
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
