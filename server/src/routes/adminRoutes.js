const express = require("express");
const { login, signup, logout, handleRefreshToken } = require("../controllers/adminController");

const router = express.Router();

router.post("/admin/login", login);
router.post("/admin/signup", signup);
router.get("/admin/logout", logout);
router.get("/admin/refresh", handleRefreshToken);

module.exports = router;
