const JWT = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    if (token) {
      const tokenVerified = JWT.verify(token, process.env.KEY_ACCESSTOKEN);
      req.users = tokenVerified;
      next();
    }
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      return res.status(200).json({
        code: 401,
        msg: error.message,
      });
    }
    return res.status(200).json({
      code: 500,
      msg: error.message,
    });
  }
};

const signAccessToken = () => {
  const payload = {
    userId: 1,
    name: "gnoluv",
  };
  const token = JWT.sign(payload, process.env.KEY_ACCESSTOKEN, { expiresIn: "1m" });
  return token;
};

const signRefreshToken = () => {
  const payload = {
    userId: 1,
    name: "gnoluv",
  };
  const token = JWT.sign(payload, process.env.KEY_ACCESSTOKEN, { expiresIn: "10m" });
  return token;
};

module.exports = {
  verifyToken,
  signAccessToken,
  signRefreshToken,
};
