function createInsightSummary(analysis) {
  const summary = {
    dominantEmotion: analysis.dominantEmotion,

    phase: null,

    emotionFrequency: null,

    averageSleep: analysis.averageSleep,

    dominantEnergy: analysis.dominantEnergy,

    commonSymptoms: analysis.commonSymptom
      ? [analysis.commonSymptom]
      : [],

    cyclesAnalyzed: analysis.cyclesAnalyzed
  };

  // Find the strongest repeated pattern
  if (
    analysis.repeatedPatterns &&
    Object.keys(analysis.repeatedPatterns).length > 0
  ) {
    let strongestPhase = null;
    let highestScore = 0;

    Object.keys(analysis.repeatedPatterns).forEach(
      (phase) => {
        const pattern =
          analysis.repeatedPatterns[phase];

        if (pattern.patternScore > highestScore) {
          highestScore = pattern.patternScore;
          strongestPhase = phase;
        }
      }
    );

    if (strongestPhase) {
      const pattern =
        analysis.repeatedPatterns[strongestPhase];

      summary.phase = strongestPhase;
      summary.dominantEmotion =
        pattern.repeatedEmotion;
      summary.emotionFrequency =
        pattern.patternScore;
    }
  }

  return summary;
}

module.exports = {
  createInsightSummary
};