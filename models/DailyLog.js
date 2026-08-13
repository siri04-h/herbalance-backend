const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  cycleNumber: {
  type: Number,
  required: true
},

  date: {
    type: Date,
    default: Date.now
  },

  cycleDay: {
    type: Number,
    required: true
  },

  phase: {
    type: String,
    required: true
  },

  journal: {
    type: String
  },

  emotion: {
    type: String
  },

  confidence: {
    type: Number
  },

  sleepHours: {
    type: Number
  },

  energy: {
    type: String,
    enum: ["Low", "Medium", "High"]
  },

  symptoms: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model("DailyLog", dailyLogSchema);