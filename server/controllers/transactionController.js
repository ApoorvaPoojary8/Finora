
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


async function getTransactions(req, res, next) {
  try {
    const transactions = await Transaction.find().sort({
      date: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      count: transactions.length,
      transactions: transactions.map((transaction) => ({
        _id: transaction._id,
        description: transaction.description,
        amount: transaction.amount / 100,
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      })),
    });
  } catch (error) {
    next(error);
  }
}


async function getSummary(req, res, next) {
  try {
    const [result] = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [
                { $eq: ["$type", "income"] },
                "$amount",
                0,
              ],
            },
          },
          totalExpenses: {
            $sum: {
              $cond: [
                { $eq: ["$type", "expense"] },
                "$amount",
                0,
              ],
            },
          },
        },
      },
    ]);

    const totalIncome = (result?.totalIncome || 0) / 100;
    const totalExpenses = (result?.totalExpenses || 0) / 100;

    return res.status(200).json({
      totalIncome,
      totalExpenses,
      netSavings: totalIncome - totalExpenses,
    });
  } catch (error) {
    next(error);
  }
}





module.exports = { createTransaction };
module.exports = {
  createTransaction,
  getTransactions,
  getSummary,
};
