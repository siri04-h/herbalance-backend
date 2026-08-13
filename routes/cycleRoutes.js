const express = require("express");
const Cycle = require("../models/Cycle");

const {
  calculateCycleDay,
  calculatePhase
} = require("../services/cycleCalculator");

const router = express.Router();

// Save cycle information
router.post("/save", async (req, res) => {
  try {
    const {
      userId,
      lastPeriodStart,
      averageCycleLength,
      averagePeriodLength
    } = req.body;

    // Calculate current cycle day
    const cycleDay = calculateCycleDay(lastPeriodStart);

    // Calculate estimated cycle phase
    const phase = calculatePhase(
      cycleDay,
      averageCycleLength
    );

    // Save cycle information
    const cycle = new Cycle({
      userId,
      lastPeriodStart,
      averageCycleLength,
      averagePeriodLength
    });

    await cycle.save();

    res.status(201).json({
      message: "Cycle information saved successfully",
      cycleDay,
      phase,
      cycle
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save cycle information",
      error: error.message
    });
  }
});

module.exports = router;