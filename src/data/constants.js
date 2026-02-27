// Centralized constants imported from the original single-file app
export const C = {
  lemonChiffon: '#FBF8CC',
  champagnePink: '#FDE4CF',
  babyPink: '#FFCFD2',
  pinkLavender: '#F1C0E8',
  lavenderBlue: '#CFBAF0',
  babyBlueEyes: '#A3C4F3',
  skyBlue: '#90DBF4',
  electricBlue: '#8EECF5',
  magicMint: '#98F5E1',
  grannySmith: '#B9FBC0',
};

export const gradBg = `linear-gradient(135deg, ${C.lemonChiffon} 0%, ${C.champagnePink} 25%, ${C.babyPink} 45%, ${C.lavenderBlue} 70%, ${C.skyBlue} 100%)`;

export const MOODS = [
  { label: 'Happy', color: C.grannySmith, emoji: '😊' },
  { label: 'Okay', color: C.skyBlue, emoji: '😐' },
  { label: 'Stressed', color: C.pinkLavender, emoji: '😰' },
  { label: 'Tired', color: C.champagnePink, emoji: '😴' },
  { label: 'Anxious', color: C.babyPink, emoji: '😟' },
  { label: 'Great', color: C.magicMint, emoji: '🤩' },
  { label: 'Sad', color: C.babyBlueEyes, emoji: '😢' },
];

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const sampleWeekMoods = [
  { day: 'Mon', mood: MOODS[0], date: 17 },
  { day: 'Tue', mood: MOODS[2], date: 18 },
  { day: 'Wed', mood: MOODS[3], date: 19 },
  { day: 'Thu', mood: MOODS[5], date: 20 },
  { day: 'Fri', mood: MOODS[1], date: 21 },
  { day: 'Sat', mood: MOODS[6], date: 22 },
  { day: 'Sun', mood: null, date: 23 },
];

export const sleepData = [7.5, 5, 8, 6.5, 5.5, 9, 7];
export const stressData = [30, 65, 55, 20, 70, 25, 40];

export const questions = [
  { key: 'sleep', label: 'Sleep Hours', type: 'slider', min: 0, max: 12, step: 0.5, unit: 'hrs', icon: '😴', color: C.skyBlue },
  { key: 'work', label: 'Work / Study Hours', type: 'slider', min: 0, max: 16, step: 0.5, unit: 'hrs', icon: '💼', color: C.lavenderBlue },
  { key: 'motivation', label: 'Motivation Level', type: 'slider', min: 0, max: 10, step: 1, unit: '/10', icon: '🎯', color: C.grannySmith },
  { key: 'productivity', label: 'How Productive Were You?', type: 'slider', min: 0, max: 10, step: 1, unit: '/10', icon: '✅', color: C.magicMint },
  { key: 'stress', label: 'Stress Level', type: 'slider', min: 0, max: 10, step: 1, unit: '/10', icon: '🔥', color: C.babyPink },
  { key: 'mood', label: 'Mood Rating', type: 'mood', icon: '😊', color: C.champagnePink },
  { key: 'social', label: 'Social Interaction', type: 'slider', min: 0, max: 10, step: 1, unit: '/10', icon: '🤝', color: C.pinkLavender },
  { key: 'screentime', label: 'Screen Time', type: 'slider', min: 0, max: 16, step: 0.5, unit: 'hrs', icon: '📱', color: C.electricBlue },
];


export default { C, gradBg, MOODS, DAYS, sampleWeekMoods, sleepData, stressData, questions };
