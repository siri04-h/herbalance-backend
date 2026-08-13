const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  lastPeriodStart: {
    type: Date,
    required: true
  },

  averageCycleLength: {
    type: Number,
    required: true
  },

  averagePeriodLength: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Cycle", cycleSchema);