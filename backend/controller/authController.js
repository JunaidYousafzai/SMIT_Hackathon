const User = require("../models/registerModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken.js");
const dotenv = require("dotenv").config();

const registerUser = async (request, response) => {
  try {
    const { username, email, contact, address, password, age, profilePhoto, role } = request.body;
    if (!username || !email || !contact || !address || !password || !age) {
      return response.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return response.status(400).json({ message: "Email already exists!" });
    }

    const userRole = role || "user";
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      contact,
      address,
      password: hashedPassword,
      age,
      profilePhoto,
      role: userRole,
    });

    await newUser.save();

    response.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "Both fields must be filled!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: "User not found!" });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return response.status(401).json({ message: "Invalid password!" });
    }

    const token = generateToken(user._id, user.role);

    response.cookie("token", token);

    return response.status(200).json({
      message: "User login successful",
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        token: token,
        contact: user.contact,
        address: user.address,
        profilePhoto: user.profilePhoto,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return response.status(500).json({ message: "Internal server error" });
  }
};

const profile = async (request, response) => {
  try {
    const userProfile = await User.findById(request.user._id);
    if (!userProfile) {
      return response.status(401).json({ message: "Not authorized" });
    }
    response.status(200).json(userProfile);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  profile,
};
