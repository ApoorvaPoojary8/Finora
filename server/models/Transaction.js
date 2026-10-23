
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [1, "Description cannot be empty"],
      maxlength: [120, "Description cannot exceed 120 characters"],
    },

    // Store money as integer paise: ₹100.50 = 10050
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be greater than zero"],
      validate: {
        validator: Number.isSafeInteger,
        message: "Amount must be a safe integer in paise",
      },
    },

    type: {
      type: String,
      required: [true, "Transaction type is required"],
      enum: {
        values: ["income", "expense"],
        message: "Type must be income or expense",
      },
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "Salary",
          "Freelance",
          "Investments",
          "Food",
          "Transport",
          "Shopping",
          "Bills",
          "Education",
          "Healthcare",
          "Other",
        ],
        message: "Invalid transaction category",
      },
    },

    date: {
      type: Date,
      required: [true, "Transaction date is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
