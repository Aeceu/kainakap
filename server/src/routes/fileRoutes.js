const express = require("express");
const { extractDataFromID } = require("../controllers/filesController");

const router = express.Router();

router.post("/recognize", extractDataFromID);

module.exports = router;
