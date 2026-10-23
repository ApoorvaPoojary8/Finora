
const CATEGORIES = [
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
];

function validateTransaction(data) {
  const errors = {};

  if (
    typeof data.description !== "string" ||
    data.description.trim().length === 0
  ) {
    errors.description = "Description is required";
  } else if (data.description.trim().length > 120) {
    errors.description = "Description cannot exceed 120 characters";
  }

  if (
    typeof data.amount !== "number" ||
    !Number.isFinite(data.amount) ||
    data.amount <= 0
  ) {
    errors.amount = "Amount must be a positive number";
  } else {
    const paise = data.amount * 100;

    if (
      !Number.isSafeInteger(Math.round(paise)) ||
      Math.abs(paise - Math.round(paise)) > 1e-7
    ) {
      errors.amount = "Amount must have at most two decimal places";
    }
  }

  if (!["income", "expense"].includes(data.type)) {
    errors.type = "Type must be income or expense";
  }

  if (!CATEGORIES.includes(data.category)) {
    errors.category = "Invalid transaction category";
  }

  if (typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.date = "Date must be in YYYY-MM-DD format";
  } else {
    const parsedDate = new Date(`${data.date}T00:00:00.000Z`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== data.date
    ) {
      errors.date = "Date is invalid";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = { validateTransaction, CATEGORIES };
