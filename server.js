const cookieParser = require("cookie-parser");
const express = require("express");
const { signRefreshToken, signAccessToken, verifyToken } = require("./middleware");
const app = express();

const PORT = process.env.PORT || 3000;

// cookie parser
app.use(cookieParser());

// use static files
app.use("/static", express.static("./static/"));

app.get("/", (req, res, next) => {
  return res.sendFile(__dirname + "/index.html");
});

app.get("/api/users", verifyToken, (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: {
      users: [
        { id: 1, name: "vulong" },
        { id: 2, name: "gnoluv" },
      ],
    },
  });
});

app.get("/api/login", (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: {
      accessToken: signAccessToken(),
    },
  });
});

app.get("/api/refreshToken", (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: {
      accessToken: signAccessToken(),
    },
  });
});

app.listen(PORT, () => {
  console.log(`Running at PORT: ${PORT}`);
});
