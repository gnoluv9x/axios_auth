const express = require("express");
const app = express();

const PORT = process.env.PORT || "3000";

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

app.get("/api/login", (req, res) => {
  return res.status(200).json({
    status: "success",
    elements: {
      token: "accessToken",
      expiredTime: Date.now() + 60 * 1000,
    },
  });
});

app.get("/api/refreshToken", (req, res) => {
  return res.status(200).json({
    status: "success",
    elements: {
      token: "tokenRefreshed",
      expiredTime: Date.now() + 60 * 1000,
    },
  });
});

app.get("/api/users", (req, res) => {
  return res.status(200).json({
    status: "success",
    elements: [{ name: "gnoluv" }, { name: "long dz" }],
  });
});

app.listen(PORT, () => {
  console.log(`Running at port: ${PORT}`);
});
