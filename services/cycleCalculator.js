function calculateCycleDay(lastPeriodStart, currentDate = new Date()) {
  const start = new Date(lastPeriodStart);
  const current = new Date(currentDate);

  start.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  const difference = current - start;

  const cycleDay = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  ) + 1;

  return cycleDay;
}

function calculatePhase(cycleDay, cycleLength = 28) {
  if (cycleDay <= 5) {
    return "Menstrual";
  }

  if (cycleDay <= Math.floor(cycleLength / 2) - 1) {
    return "Follicular";
  }

  if (cycleDay <= Math.floor(cycleLength / 2) + 1) {
    return "Ovulation";
  }

  return "Luteal";
}

module.exports = {
  calculateCycleDay,
  calculatePhase
};