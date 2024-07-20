const express = require("express");
const {
  getUsers,
  signup,
  getUsersColumn,
  verifyOTP,
  login,
  logout,
  handleRefreshToken,
  getUserByID,
  deleteUserByID,
  getUserByQR,
} = require("../controllers/userController");
const { extractDataFromID } = require("../controllers/filesController");

const router = express.Router();

router.post("/user/login", login);
router.get("/user/login/qrcode/:userId", getUserByQR);
router.post("/user/verify", verifyOTP);
router.post("/user/signup", signup);
router.get("/user/logout", logout);
router.get("/user/refresh", handleRefreshToken);

router.get("/user/column", getUsersColumn);
router.get("/user", getUsers);
router.post("/user/signup", signup);

router.get("/user/:userId", getUserByID);
router.delete("/user/:userId", deleteUserByID);

router.post("/id/extract", extractDataFromID);

module.exports = router;
