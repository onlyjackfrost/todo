// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../model/user");

// 登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

// 登入檢查
router.post("/login", (req, res) => {
  res.send("login");
});

// 註冊頁面
router.get("/register", (req, res) => {
  res.render("register");
});

// 註冊檢查
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      console.log("User already exists");
      return res.render("register", {
        // 使用者已經註冊過
        name,
        email,
        password,
        password2
      });
    }
    const user = new User({ name, email, password });
    await user.save();
    return res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

// 登出
router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;
