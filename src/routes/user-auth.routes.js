const express = require("express");
const {
  handleRegister,
  handleLogin,
  handleLogout,
} = require("../controller/auth-controller");

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/log-out", handleLogout);

module.exports = router;
