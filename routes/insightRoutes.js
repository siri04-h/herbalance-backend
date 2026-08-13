const express = require("express");
const DailyLog = require("../models/DailyLog");

const {
  analyzePatterns
} = require("../services/patternAnalyzerService");

const {
  createInsightSummary
} = require("../services/insightGenerator");

const router = express.Router();

router.get("/patterns/:userId", async (req, res) => {
  try {

    const { userId } = req.params;

    const logs = await DailyLog
      .find({ userId })
      .sort({ date: 1 });

    const analysis =
      analyzePatterns(logs);

    const insightSummary =
      createInsightSummary(analysis);

    res.status(200).json({
      userId,
      analysis,
      insightSummary
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to analyze patterns",
      error: error.message
    });
  }
});

module.exports = router;