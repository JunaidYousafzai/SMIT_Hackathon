const express = require("express");
const router = express.Router();
const User = require("../models/registerModel");
const Loan = require("../models/loanModel");
const {allLoans ,loanSeeker, } = require("../controller/adminController");
const  adminVerification = require("../middlewares/adminVerification");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/dashboard",authMiddleware,adminVerification,allLoans);
router.patch("/loans/:loanId",authMiddleware,adminVerification,loanSeeker);

module.exports = router;
