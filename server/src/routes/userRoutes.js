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

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
router.get("/refresh", handleRefreshToken);

router.get("/", getUsers);
router.post("/signup", signup);
router.get("/:userId", getUsersColumn);

module.exports = router;
