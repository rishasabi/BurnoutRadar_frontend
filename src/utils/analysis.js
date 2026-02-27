// Shared analysis utilities (moved from AnalysisPage for reuse)
import { C } from '../data/constants';

function clamp01(v) {
  return Math.max(0, Math.min(100, v));
}

export function getAnalysis(answers) {
  const items = [
    {
      key: 'sleep',
      icon: '😴',
      label: 'Sleep Quality',
      color: C.skyBlue,
      score: clamp01(Math.min(100, (answers.sleep / 9) * 100)),
      getComment: (v) =>
        v >= 80
          ? 'Excellent sleep! Consistent 8+ hours supports cognitive function and stress resilience.'
          : v >= 65
          ? 'Decent sleep. Consider aiming for 7.5–8 hours to optimize recovery.'
          : 'Sleep is below recommended levels. Chronic sleep deprivation significantly elevates burnout risk.',
    },
    {
      key: 'work',
      icon: '💼',
      label: 'Work/Study Load',
      color: C.pinkLavender,
      // lower work hours -> higher score; normalize and clamp
      score: clamp01(Math.min(100, 100 - ((answers.work - 6) / 10) * 100)),
      getComment: (v) =>
        v <= 70
          ? 'Healthy workload! Good boundaries are a key burnout prevention strategy.'
          : v <= 100
          ? 'Moderate load — manageable but watch for sustained weeks above 8hrs.'
          : 'High work hours detected. Extended overwork is one of the strongest predictors of burnout.',
    },
    {
      key: 'motivation',
      icon: '🎯',
      label: 'Motivation',
      color: C.grannySmith,
      score: clamp01((answers.motivation / 10) * 100),
      getComment: (v) =>
        v >= 70
          ? 'High motivation is a protective factor against burnout. Keep nurturing your purpose.'
          : v >= 40
          ? "Moderate motivation. Identify what's energizing you and do more of it."
          : 'Low motivation often signals early burnout. Consider whether your tasks align with your values.',
    },
    {
      key: 'productivity',
      icon: '✅',
      label: 'Productivity',
      color: C.magicMint,
      score: clamp01((answers.productivity / 10) * 100),
      getComment: (v) =>
        v >= 70
          ? "You're in a productive flow. Great conditions for meaningful work."
          : v >= 40
          ? 'Average productivity — check if fatigue, distraction, or stress are limiting you.'
          : 'Low productivity despite high hours often means cognitive fatigue. Rest may be your best productivity hack.',
    },
    {
      key: 'stress',
      icon: '🔥',
      label: 'Stress',
      color: C.babyPink,
      score: clamp01(Math.min(100, 100 - (answers.stress / 10) * 100)),
      getComment: (v) =>
        v <= 30
          ? "Low stress — you're managing well. Keep your current coping strategies."
          : v <= 60
          ? 'Moderate stress. Manageable, but worth monitoring over multiple days.'
          : 'High stress detected. Prolonged high stress without recovery is the core driver of burnout.',
    },
    {
      key: 'social',
      icon: '🤝',
      label: 'Social Connection',
      color: C.lavenderBlue,
      score: clamp01((answers.social / 10) * 100),
      getComment: (v) =>
        v >= 70
          ? 'Strong social connections are a powerful buffer against burnout.'
          : v >= 40
          ? "Some social interaction. Consider investing in relationships — they're protective."
          : 'Social isolation amplifies burnout risk. Even brief meaningful connections make a difference.',
    },
    {
      key: 'screentime',
      icon: '📱',
      label: 'Screen Time',
      color: C.electricBlue,
      // lower screentime -> higher score; normalize and clamp
      score: clamp01(Math.min(100, 100 - ((answers.screentime - 4) / 12) * 100)),
      getComment: (v) =>
        v <= 40
          ? 'Healthy screen usage. Your brain gets necessary offline recovery time.'
          : v <= 70
          ? 'Moderate screen time. Ensure you have true offline wind-down before bed.'
          : 'High screen time, especially before sleep, disrupts rest and increases mental fatigue.',
    },
  ];
  return items;
}

export function computeOverallHealth(answers) {
  const items = getAnalysis(answers);
  const avg = items.reduce((acc, it) => acc + it.score, 0) / items.length;
  return Math.round(clamp01(avg));
}

export function computeBurnoutPercent(answers) {
  // Burnout shown in UI uses inverse of overall health (higher = worse)
  const health = computeOverallHealth(answers);
  return Math.round(clamp01(100 - health));
}

export default { getAnalysis, computeOverallHealth, computeBurnoutPercent };
