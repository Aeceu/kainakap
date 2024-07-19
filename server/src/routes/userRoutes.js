const express = require("express");
const {
  getUsers,
  signup,
  getUsersColumn,
  login,
  logout,
  handleRefreshToken,
} = require("../controllers/userController");

const router = express.Router();

router.post("/user/login", login);
router.post("/user/signup", signup);
router.get("/user/logout", logout);
router.get("/user/refresh", handleRefreshToken);

router.get("/user/", getUsers);
router.post("/user/signup", signup);
router.get("/user/:userId", getUsersColumn);

module.exports = router;
