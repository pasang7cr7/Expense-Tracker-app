const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log(authHeader);

    if (!authHeader)
      return res
        .status(401)
        .json({ success: false, message: "No token Provided" });

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    const user = await User.findById(decoded.id);
    if (!user) throw new AppError("User not found", 401);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
