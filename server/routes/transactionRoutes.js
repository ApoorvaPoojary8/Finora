
const express = require("express");
const {
  createTransaction,
  getTransactions,
  getSummary,
} = require("../controllers/transactionController");


const router = express.Router();
router.get("/summary", getSummary);
router.get("/", getTransactions);
router.post("/", createTransaction);

module.exports = router;
