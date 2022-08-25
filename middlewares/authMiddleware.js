const jwt = require("jsonwebtoken");
const IUser = require("../models/userModel");
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      error: "You Are Not Authorize To Access This Resource",
    });
  }

  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  try {
    req.user = await IUser.findById(decodeToken.id);
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Some Problem in Cookies",
    });
  }
};
