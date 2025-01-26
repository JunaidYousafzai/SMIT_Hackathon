const User = require("../models/registerModel");
const dotenv = require("dotenv").config();

const updateProfile = async (request, response) => {
  try {
    const userId = request.user._id; 
    const { username, contact, address, profilePhoto } = request.body;

    if (!username && !contact && !address && !profilePhoto) {
      return response.status(400).json({
        message: "At least one field must be provided to update."
      });
    }
    const updateData = {};
    if (username) updateData.username = username;
    if (contact) updateData.contact = contact;
    if (address) updateData.address = address;
    if (profilePhoto) updateData.profilePhoto = profilePhoto;


    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return response.status(404).json({ message: "User not found!" });
    }

    return response.status(200).json({
      message: "Profile updated successfully!",
      user: updatedUser
    });
  } catch (err) {
    console.error(err);
    return response.status(500).json({
      message: err.message || "Error updating profile"
    });
  }
};

module.exports =  updateProfile 