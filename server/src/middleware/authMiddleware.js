const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const config = require("../config");

const createUser = async (res) => {
  const user = await UserModel.create({});

  const authToken = jwt.sign(
    { id: user._id },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return { user, authToken };
};

const authUser = async (req, res, next) => {
  let token = req.cookies.authToken;

  try {
    if (!token) {
      const { user } = await createUser(res);
      req.user = user;
      return next();
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    let user = await UserModel.findById(decoded.id);

    if (!user) {
      const result = await createUser(res);
      user = result.user;
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = { authUser };