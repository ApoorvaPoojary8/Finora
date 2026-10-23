
const express = require("express");
const {
  createTransaction,
  getTransactions,
  getSummary,
  deleteTransaction,
} = require("../controllers/transactionController");


const router = express.Router();
router.get("/summary", getSummary);
router.get("/", getTransactions);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);


module.exports = router;
