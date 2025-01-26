const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const loanController = require("../controller/loanController");


router.post("/submit", authMiddleware, loanController);

module.exports = router;
