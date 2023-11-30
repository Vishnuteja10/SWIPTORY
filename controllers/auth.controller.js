const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const exisingUser = await User.findOne({ username });

    if (exisingUser) {
      return res.status(400).json({
        success: false,
        message: "username already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    const name = user?.username;
    const userId = user?._id;

    res.status(200).json({
      success: true,
      message: "user registerd!",
      user: {
        token,
        username: name,
        userId,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    let token;
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const user = await User.findOne({ username });

    if (user === null) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        const userId = user?._id;
        const username = user?.username;
        return res.status(200).json({
          success: true,
          message: "login success!",
          user: { userId, username, token },
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login, register };
