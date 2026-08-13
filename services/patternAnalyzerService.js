function calculateFrequency(items) {
  const total = items.length;

  if (total === 0) {
    return {};
  }

  const frequency = {};

  items.forEach((item) => {
    frequency[item] = (frequency[item] || 0) + 1;
  });

  Object.keys(frequency).forEach((key) => {
    frequency[key] = Number(
      ((frequency[key] / total) * 100).toFixed(2)
    );
  });

  return frequency;
}


// ------------------------------------
// Find the most frequent value
// ------------------------------------

function getDominantValue(frequency) {
  const entries = Object.entries(frequency);

  if (entries.length === 0) {
    return null;
  }

  entries.sort((a, b) => b[1] - a[1]);

  return entries[0][0];
}


// ------------------------------------
// Pattern classification
// ------------------------------------

function classifyPattern(score) {
  if (score < 25) {
    return "Occasional";
  }

  if (score <= 50) {
    return "Emerging pattern";
  }

  return "Frequent pattern";
}


// ------------------------------------
// Multiple-cycle analysis
// ------------------------------------

function analyzeAcrossCycles(logs) {
  const cycleGroups = {};

  logs.forEach((log) => {
    if (log.cycleNumber === undefined) {
      return;
    }

    if (!cycleGroups[log.cycleNumber]) {
      cycleGroups[log.cycleNumber] = [];
    }

    cycleGroups[log.cycleNumber].push(log);
  });

  const cycleAnalysis = {};

  Object.keys(cycleGroups).forEach((cycleNumber) => {
    const cycleLogs = cycleGroups[cycleNumber];

    const phaseGroups = {};

    cycleLogs.forEach((log) => {
      if (!log.phase) {
        return;
      }

      if (!phaseGroups[log.phase]) {
        phaseGroups[log.phase] = [];
      }

      phaseGroups[log.phase].push(log);
    });

    cycleAnalysis[cycleNumber] = {};

    Object.keys(phaseGroups).forEach((phase) => {
      const phaseLogs = phaseGroups[phase];

      const emotions = phaseLogs
        .filter((log) => log.emotion)
        .map((log) => log.emotion);

      const emotionFrequency =
        calculateFrequency(emotions);

      const dominantEmotion =
        getDominantValue(emotionFrequency);

      cycleAnalysis[cycleNumber][phase] = {
        entries: phaseLogs.length,
        emotionFrequency,
        dominantEmotion
      };
    });
  });

  return cycleAnalysis;
}


// ------------------------------------
// Repeated pattern detection
// ------------------------------------

function findRepeatedPatterns(cycleAnalysis) {
  const phaseData = {};

  Object.keys(cycleAnalysis).forEach((cycleNumber) => {
    const phases = cycleAnalysis[cycleNumber];

    Object.keys(phases).forEach((phase) => {
      if (!phaseData[phase]) {
        phaseData[phase] = [];
      }

      const dominantEmotion =
        phases[phase].dominantEmotion;

      if (dominantEmotion) {
        phaseData[phase].push(dominantEmotion);
      }
    });
  });

  const repeatedPatterns = {};

  Object.keys(phaseData).forEach((phase) => {
    const emotions = phaseData[phase];

    const frequency =
      calculateFrequency(emotions);

    const dominantEmotion =
      getDominantValue(frequency);

    const patternScore =
      frequency[dominantEmotion] || 0;

    repeatedPatterns[phase] = {
      cyclesAnalyzed: emotions.length,

      emotionFrequency: frequency,

      repeatedEmotion: dominantEmotion,

      patternScore: patternScore,

      classification:
        classifyPattern(patternScore)
    };
  });

  return repeatedPatterns;
}


// ------------------------------------
// Main Pattern Analyzer
// ------------------------------------

function analyzePatterns(logs) {

  if (!logs || logs.length === 0) {
    return {
      enoughData: false,
      message: "Not enough data to analyze patterns."
    };
  }


  // ------------------------------------
  // Emotion analysis
  // ------------------------------------

  const emotions = logs
    .filter((log) => log.emotion)
    .map((log) => log.emotion);

  const emotionFrequency =
    calculateFrequency(emotions);

  const dominantEmotion =
    getDominantValue(emotionFrequency);


  // ------------------------------------
  // Energy analysis
  // ------------------------------------

  const energies = logs
    .filter((log) => log.energy)
    .map((log) => log.energy);

  const energyFrequency =
    calculateFrequency(energies);

  const dominantEnergy =
    getDominantValue(energyFrequency);


  // ------------------------------------
  // Sleep analysis
  // ------------------------------------

  const sleepValues = logs
    .filter(
      (log) =>
        typeof log.sleepHours === "number"
    )
    .map((log) => log.sleepHours);

  let averageSleep = 0;

  if (sleepValues.length > 0) {
    const totalSleep = sleepValues.reduce(
      (sum, value) => sum + value,
      0
    );

    averageSleep = Number(
      (totalSleep / sleepValues.length).toFixed(2)
    );
  }


  // ------------------------------------
  // Symptoms analysis
  // ------------------------------------

  const symptoms = [];

  logs.forEach((log) => {
    if (
      log.symptoms &&
      log.symptoms.length > 0
    ) {
      symptoms.push(...log.symptoms);
    }
  });

  const symptomFrequency =
    calculateFrequency(symptoms);

  const commonSymptom =
    getDominantValue(symptomFrequency);


  // ------------------------------------
  // Phase analysis
  // ------------------------------------

  const phaseData = {};

  logs.forEach((log) => {
    if (!log.phase) {
      return;
    }

    if (!phaseData[log.phase]) {
      phaseData[log.phase] = [];
    }

    phaseData[log.phase].push(log);
  });


  const phaseAnalysis = {};

  Object.keys(phaseData).forEach((phase) => {

    const phaseLogs =
      phaseData[phase];


    // Emotion by phase

    const phaseEmotions = phaseLogs
      .filter((log) => log.emotion)
      .map((log) => log.emotion);

    const phaseEmotionFrequency =
      calculateFrequency(phaseEmotions);


    // Energy by phase

    const phaseEnergies = phaseLogs
      .filter((log) => log.energy)
      .map((log) => log.energy);

    const phaseEnergyFrequency =
      calculateFrequency(phaseEnergies);


    // Sleep by phase

    const phaseSleep = phaseLogs
      .filter(
        (log) =>
          typeof log.sleepHours === "number"
      )
      .map((log) => log.sleepHours);

    let phaseAverageSleep = 0;

    if (phaseSleep.length > 0) {
      const totalSleep =
        phaseSleep.reduce(
          (sum, value) => sum + value,
          0
        );

      phaseAverageSleep = Number(
        (
          totalSleep / phaseSleep.length
        ).toFixed(2)
      );
    }


    phaseAnalysis[phase] = {
      entries: phaseLogs.length,

      emotionFrequency:
        phaseEmotionFrequency,

      dominantEmotion:
        getDominantValue(
          phaseEmotionFrequency
        ),

      energyFrequency:
        phaseEnergyFrequency,

      dominantEnergy:
        getDominantValue(
          phaseEnergyFrequency
        ),

      averageSleep:
        phaseAverageSleep
    };
  });


  // ------------------------------------
  // Multiple-cycle analysis
  // ------------------------------------

  const cycleAnalysis =
    analyzeAcrossCycles(logs);


  // ------------------------------------
  // Repeated patterns
  // ------------------------------------

  const repeatedPatterns =
    findRepeatedPatterns(
      cycleAnalysis
    );


  // ------------------------------------
  // Find cycle numbers
  // ------------------------------------

  const cycleNumbers = [
    ...new Set(
      logs
        .filter(
          (log) =>
            log.cycleNumber !== undefined
        )
        .map(
          (log) =>
            log.cycleNumber
        )
    )
  ];


  const cyclesAnalyzed =
    cycleNumbers.length;


  // ------------------------------------
  // Data status
  // ------------------------------------

  let dataStatus;

  if (logs.length < 7) {
    dataStatus = "Not enough data";
  }
  else if (cyclesAnalyzed === 1) {
    dataStatus = "Early pattern";
  }
  else if (
    cyclesAnalyzed >= 2 &&
    cyclesAnalyzed <= 3
  ) {
    dataStatus = "Repeated pattern";
  }
  else {
    dataStatus =
      "Strong personal trend";
  }


  // ------------------------------------
  // Final result
  // ------------------------------------

  return {

    enoughData:
      logs.length >= 7,

    totalEntries:
      logs.length,

    cyclesAnalyzed,

    dataStatus,

    emotionFrequency,

    dominantEmotion,

    energyFrequency,

    dominantEnergy,

    averageSleep,

    symptomFrequency,

    commonSymptom,

    phaseAnalysis,

    cycleAnalysis,

    repeatedPatterns
  };
}


// ------------------------------------
// Export
// ------------------------------------

module.exports = {
  analyzePatterns
};