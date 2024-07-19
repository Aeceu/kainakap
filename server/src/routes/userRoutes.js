const express = require("express");
const { getUsers, signup, getUsersColumn } = require("../controllers/userController");

const router = express.Router();

router.get("/user", getUsers);
router.post("/signup", signup);
router.get("/user/column", getUsersColumn);

module.exports = router;
