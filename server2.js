const express = require("express");
const { verifyToken, signAccessToken, signRefreshToken } = require("./middleware");
const app = express();

const PORT = process.env.PORT || "3000";

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index2.html");
});

app.get("/login", (req, res) => {
  return res.sendFile(__dirname + "/login.html");
});

app.get("/api/login", (req, res) => {
  return res.status(200).json({
    status: "success",
    elements: {
      accessToken: signAccessToken(),
      // refreshToken: signRefreshToken(),
    },
  });
});

app.get("/api/refreshToken", (req, res) => {
  return res.status(200).json({
    status: "success",
    elements: {
      accessToken: signAccessToken(),
    },
  });
});

app.get("/api/users", verifyToken, (req, res) => {
  return res.status(200).json({
    status: "success",
    elements: [{ name: "gnoluv" }, { name: "long dz" }],
  });
});

app.listen(PORT, () => {
  console.log(`Running at port: ${PORT}`);
});
