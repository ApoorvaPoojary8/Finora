
const test = require("node:test");
const assert = require("node:assert/strict");
const { validateTransaction } = require("../utils/validateTransaction");

const validTransaction = {
  description: "Monthly salary",
  amount: 25000.50,
  type: "income",
  category: "Salary",
  date: "2026-10-23",
};

test("accepts a valid transaction", () => {
  const result = validateTransaction(validTransaction);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test("rejects a non-positive amount", () => {
  const result = validateTransaction({
    ...validTransaction,
    amount: -100,
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.amount);
});

test("rejects an invalid category", () => {
  const result = validateTransaction({
    ...validTransaction,
    category: "Gaming",
  });

  assert.ok(result.errors.category);
});

test("rejects an impossible date", () => {
  const result = validateTransaction({
    ...validTransaction,
    date: "2026-02-31",
  });

  assert.ok(result.errors.date);
});

test("rejects descriptions longer than 120 characters", () => {
  const result = validateTransaction({
    ...validTransaction,
    description: "a".repeat(121),
  });

  assert.ok(result.errors.description);
});
