const express = require("express");
const DailyLog = require("../models/DailyLog");

const router = express.Router();

// Save daily wellbeing log
router.post("/save", async (req, res) => {
  try {
    const {
      userId,
      cycleNumber,
      cycleDay,
      phase,
      journal,
      emotion,
      confidence,
      sleepHours,
      energy,
      symptoms
    } = req.body;

    const dailyLog = new DailyLog({
      userId,
      cycleNumber,
      cycleDay,
      phase,
      journal,
      emotion,
      confidence,
      sleepHours,
      energy,
      symptoms
    });

    await dailyLog.save();

    res.status(201).json({
      message: "Daily log saved successfully",
      dailyLog
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save daily log",
      error: error.message
    });
  }
});

module.exports = router;