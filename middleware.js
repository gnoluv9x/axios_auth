const JWT = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (accessToken) {
      JWT.verify(accessToken, process.env.KEY_ACCESSTOKEN);
      next();
    } else {
      throw new Error("You are not authenticated");
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(200).json({
        status: "failure",
        data: { code: 401, msg: error.message },
      });
    }
    return res.status(200).json({
      status: "failfailure",
      data: {
        code: 500,
        msg: error.message,
      },
    });
  }
};

const signAccessToken = () => {
  const payload = {
    id: 1,
    name: "vulong",
  };
  const newToken = JWT.sign(payload, process.env.KEY_ACCESSTOKEN, { expiresIn: "1m" });
  return newToken;
};

const signRefreshToken = () => {
  const payload = {
    id: 1,
    name: "vulong",
  };
  const newToken = JWT.sign(payload, process.env.KEY_ACCESSTOKEN, { expiresIn: "10m" });
  return newToken;
};

module.exports = {
  verifyToken,
  signAccessToken,
  signRefreshToken,
};
