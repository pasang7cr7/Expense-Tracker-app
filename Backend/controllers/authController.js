const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

exports.register = async (req, res, next) => {
  try {
    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const password = req.body.password;

    const existUser = await User.findOne({ email });

    if (existUser) throw new AppError("Email Already Registeres", 400);

    const newUser = await User.create({ name, email, password });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const existEmail = await User.findOne({ email }).select("+password");

    if (!existEmail) throw new AppError("First register", 404);

    const isMatch = await bcrypt.compare(password, existEmail.password);

    if (!isMatch) throw new AppError("Wrong password", 400);

    const token = jwt.sign({ id: existEmail._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: existEmail._id,
        name: existEmail.name,
        email: existEmail.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
