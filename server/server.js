
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "10kb" }));


app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "Finora API",
    message: "Server is running",
  });
});


app.use("/api/transactions", transactionRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Finora API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
