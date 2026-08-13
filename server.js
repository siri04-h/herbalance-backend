const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cycleRoutes = require("./routes/cycleRoutes");
const userRoutes = require("./routes/userRoutes");
const dailyLogRoutes = require("./routes/dailyLogRoutes");
const insightRoutes = require("./routes/insightRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("HerBalance Backend is running");
});

app.use("/api/users", userRoutes);
app.use("/api/cycles", cycleRoutes);
app.use("/api/daily-logs", dailyLogRoutes);
app.use("/api/insights", insightRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});