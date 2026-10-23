
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "10kb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "Finora API",
    message: "Server is running",
  });
});

// Transaction routes
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;

// Start server only when this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Finora API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
