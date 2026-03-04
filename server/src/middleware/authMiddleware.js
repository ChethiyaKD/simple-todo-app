const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const config = require("../config");

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    console.log(decoded);
    const user = await UserModel.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { authUser };