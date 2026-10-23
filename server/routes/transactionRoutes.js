
const express = require("express");
const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/", getTransactions);
router.post("/", createTransaction);

module.exports = router;
