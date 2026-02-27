import { C, MOODS } from '../data/constants';

function clamp0to100(v) {
  return Math.max(0, Math.min(100, v));
}

function mapMoodValue(answers) {
  const m = answers?.mood;

  if (typeof m === 'number') {
    if (Number.isInteger(m) && MOODS[m]?.value != null) {
      return MOODS[m].value;
    }
    if (m >= 0 && m <= 10) return m;
  }

  return 5; // neutral
}

// -----------------------------
// 🔥 Balanced Burnout Formula
// -----------------------------
function calculateBurnout(a) {
  const moodValue = mapMoodValue(a);

  // Normalize all to 0–10 scale first

  const stressNorm = a.stress; // already 0-10
  const moodNorm = 10 - moodValue;
  const sleepNorm = a.sleep < 8 ? (8 - a.sleep) : 0;
  const workNorm = Math.min(a.work / 10, 10);
  const screenNorm = Math.min(a.screentime / 10, 10);
  const disengageNorm =
    (10 - a.motivation) +
    (10 - a.productivity) +
    (10 - a.social);

  // Weighted combination
  const rawScore =
    stressNorm * 0.25 +
    moodNorm * 0.15 +
    sleepNorm * 0.15 +
    workNorm * 0.15 +
    screenNorm * 0.10 +
    disengageNorm * 0.20;

  // Convert approx 0–20 scale → 0–100
  return clamp0to100(Math.round((rawScore / 20) * 100));
}

export function getAnalysis(answers = {}) {
  const a = {
    sleep: 0,
    work: 0,
    motivation: 0,
    productivity: 0,
    stress: 0,
    mood: 0,
    social: 0,
    screentime: 0,
    ...answers,
  };

  const moodValue = mapMoodValue(a);

  const items = [
    {
      key: 'sleep',
      icon: '😴',
      label: 'Sleep Hours',
      color: C.skyBlue,
      score: clamp0to100(Math.round((a.sleep / 9) * 100)),
    },
    {
      key: 'work',
      icon: '💼',
      label: 'Work Hours',
      color: C.pinkLavender,
      score: clamp0to100(Math.round((1 - Math.min(a.work, 12) / 12) * 100)),
    },
    {
      key: 'motivation',
      icon: '🎯',
      label: 'Motivation',
      color: C.grannySmith,
      score: clamp0to100(Math.round((a.motivation / 10) * 100)),
    },
    {
      key: 'productivity',
      icon: '✅',
      label: 'Productivity',
      color: C.magicMint,
      score: clamp0to100(Math.round((a.productivity / 10) * 100)),
    },
    {
      key: 'stress',
      icon: '🔥',
      label: 'Stress',
      color: C.babyPink,
      score: clamp0to100(Math.round((1 - a.stress / 10) * 100)),
    },
    {
      key: 'social',
      icon: '🤝',
      label: 'Social Interaction',
      color: C.lavenderBlue,
      score: clamp0to100(Math.round((a.social / 10) * 100)),
    },
    {
      key: 'screentime',
      icon: '📱',
      label: 'Screen Time',
      color: C.electricBlue,
      score: clamp0to100(Math.round((1 - Math.min(a.screentime, 12) / 12) * 100)),
    },
    {
      key: 'mood',
      icon: '😊',
      label: 'Mood',
      color: C.champagnePink,
      score: clamp0to100(Math.round((moodValue / 10) * 100)),
      rawMoodValue: moodValue,
    },
  ];

  return items;
}

export function computeBurnoutPercent(answers) {
  return calculateBurnout({
    sleep: answers.sleep ?? 0,
    work: answers.work ?? 0,
    motivation: answers.motivation ?? 0,
    productivity: answers.productivity ?? 0,
    stress: answers.stress ?? 0,
    mood: answers.mood ?? 0,
    social: answers.social ?? 0,
    screentime: answers.screentime ?? 0,
  });
}

export function computeOverallHealth(answers) {
  const burnout = computeBurnoutPercent(answers);
  return clamp0to100(100 - burnout);
}
/*// Shared analysis utilities (moved from AnalysisPage for reuse)
import { C, MOODS } from '../data/constants';

function clamp0to100(v) {
  return Math.max(0, Math.min(100, v));
}

function mapMoodValue(answers) {
  // `answers.mood` may be either an index into MOODS (from the questionnaire) or a direct numeric rating.
  const m = answers?.mood;
  if (typeof m === 'number') {
    // if it's a valid index into MOODS, prefer the mood.value mapping
    if (Number.isInteger(m) && MOODS[m] && typeof MOODS[m].value === 'number') return MOODS[m].value;
    // otherwise, if it's already a 0-10 rating, use it directly (clamp)
    if (m >= 0 && m <= 10) return m;
  }
  // default neutral value
  return 5;
}

// The new burnout calculation follows the formula provided by the user.
function calculateBurnout(a) {
  const moodValue = mapMoodValue(a);

  const exhaustion = (a.stress * 2) + ((10 - moodValue) * 1.5);

  const overload = ((a.work / 12) * 10) + ((a.screentime / 12) * 8);

  const recovery = a.sleep < 8 ? (8 - a.sleep) * 3 : 0;

  const disengagement = (10 - a.motivation) * 1.5 + (10 - a.productivity) * 1.2 + (10 - a.social);

  let score = (exhaustion * 0.4) + (overload * 0.25) + (recovery * 0.2) + (disengagement * 0.15);

  return clamp0to100(Math.round(score));
}

export function getAnalysis(answers = {}) {
  // Ensure answers has defaults so callers can call this safely
  const a = {
    sleep: 0,
    work: 0,
    motivation: 0,
    productivity: 0,
    stress: 0,
    mood: 0,
    social: 0,
    screentime: 0,
    ...answers,
  };

  const moodValue = mapMoodValue(a);

  const items = [
    {
      key: 'sleep',
      icon: '😴',
      label: 'Sleep Hours',
      color: C.skyBlue,
      // Map sleep hours to a 0-100 recovery-style score where more sleep is better
      score: clamp0to100(Math.round((a.sleep / 9) * 100)),
    },
    {
      key: 'work',
      icon: '💼',
      label: 'Work Hours',
      color: C.pinkLavender,
      // lower work hours -> higher score
      score: clamp0to100(Math.round(100 - ((a.work - 6) / 10) * 100)),
    },
    {
      key: 'motivation',
      icon: '🎯',
      label: 'Motivation',
      color: C.grannySmith,
      score: clamp0to100(Math.round((a.motivation / 10) * 100)),
    },
    {
      key: 'productivity',
      icon: '✅',
      label: 'Productivity',
      color: C.magicMint,
      score: clamp0to100(Math.round((a.productivity / 10) * 100)),
    },
    {
      key: 'stress',
      icon: '🔥',
      label: 'Stress',
      color: C.babyPink,
      // higher stress => lower score
      score: clamp0to100(Math.round(100 - (a.stress / 10) * 100)),
    },
    {
      key: 'social',
      icon: '🤝',
      label: 'Social Interaction',
      color: C.lavenderBlue,
      score: clamp0to100(Math.round((a.social / 10) * 100)),
    },
    {
      key: 'screentime',
      icon: '📱',
      label: 'Screen Time',
      color: C.electricBlue,
      // lower screen time -> higher score
      score: clamp0to100(Math.round(100 - ((a.screentime - 4) / 12) * 100)),
    },
    {
      key: 'mood',
      icon: '😊',
      label: 'Mood',
      color: C.champagnePink,
      // Map moodValue (0-10) into 0-100
      score: clamp0to100(Math.round((moodValue / 10) * 100)),
      rawMoodValue: moodValue,
    },
  ];

  return items;
}

export function computeBurnoutPercent(answers) {
  // computeBurnoutPercent now uses the explicit formula requested by the user
  const b = calculateBurnout({
    sleep: answers.sleep ?? 0,
    work: answers.work ?? 0,
    motivation: answers.motivation ?? 0,
    productivity: answers.productivity ?? 0,
    stress: answers.stress ?? 0,
    mood: answers.mood ?? 0,
    social: answers.social ?? 0,
    screentime: answers.screentime ?? 0,
  });
  return b;
}

export function computeOverallHealth(answers) {
  // keep compatibility: overall health is inverse of burnout
  const burnout = computeBurnoutPercent(answers);
  return Math.round(clamp0to100(100 - burnout));
}
*/
export default { getAnalysis, computeOverallHealth, computeBurnoutPercent };
