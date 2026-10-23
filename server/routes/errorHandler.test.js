
const test = require("node:test");
const assert = require("node:assert/strict");
const errorHandler = require("../middleware/errorHandler");

function createResponse() {
  return {
    statusCode: null,
    body: null,
    headersSent: false,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test("returns 400 for invalid database data", () => {
  const res = createResponse();
  errorHandler({ name: "ValidationError" }, {}, res, () => {});
  assert.equal(res.statusCode, 400);
});

test("returns 409 for duplicate records", () => {
  const res = createResponse();
  errorHandler(
    { name: "MongoServerError", code: 11000 },
    {},
    res,
    () => {}
  );
  assert.equal(res.statusCode, 409);
});

test("returns 500 for unexpected errors", () => {
  const res = createResponse();
  const original = console.error;
  console.error = () => {};

  try {
    errorHandler(new Error("Unexpected failure"), {}, res, () => {});
    assert.equal(res.statusCode, 500);
  } finally {
    console.error = original;
  }
});

test("forwards errors if headers were already sent", () => {
  const res = createResponse();
  res.headersSent = true;
  let receivedError;

  errorHandler(new Error("Late error"), {}, res, (err) => {
    receivedError = err;
  });

  assert.equal(receivedError.message, "Late error");
});
