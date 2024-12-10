const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hash(password);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: `User registered with the username: ${username}` });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log(error);
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  //    we use .findOne method because it is already stated that the username should be unique in userModel.js
  const user = await User.findOne({ username });
  try {
    if (!user) {
      // 404 = not found
      return res
        .status(404)
        .json({ message: `Username: ${username} not found!` });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      // client error
      return res.status(400).json({ message: `Invalid credentials.` });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {}
};

module.exports = {
  register,
  login,
};
