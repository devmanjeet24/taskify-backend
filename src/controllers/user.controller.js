const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// ✅ Get all users (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -refreshToken");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let users;

    if (req.user.role === "admin") {
      users = await User.find().select("-password");
    } else if (req.user.role === "manager") {
      users = await User.find({ role: "user" }).select("-password");
    } else {
      users = [];
    }

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Update user (Admin)
exports.updateUser = async (req, res) => {
  try {
    const { name, role, password } = req.body;

    let updateData = { name, role };

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete user (Admin)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};