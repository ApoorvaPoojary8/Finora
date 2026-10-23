
const Transaction = require("../models/Transaction");
const { validateTransaction } = require("../utils/validateTransaction");

async function createTransaction(req, res, next) {
  try {
    const validation = validateTransaction(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { description, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      description: description.trim(),
      amount: Math.round(amount * 100),
      type,
      category,
      date: new Date(`${date}T00:00:00.000Z`),
    });

    return res.status(201).json({
      message: "Transaction created successfully",
      transaction: {
        _id: transaction._id,
        description: transaction.description,
        amount: transaction.amount / 100,
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createTransaction };
