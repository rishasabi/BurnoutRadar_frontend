import React from 'react';
import BurnoutCircle from '../components/BurnoutCircle';
import ScoreBar from '../components/ScoreBar';
import MoodWeekTracker from '../components/MoodWeekTracker';
import Card from '../components/Card';
import SleepChart from '../components/SleepChart';
import StressChart from '../components/StressChart';
import Btn from '../components/Btn';
import { useNavigate } from 'react-router-dom';
import { computeBurnoutPercent, computeOverallHealth } from '../utils/analysis';
import { MOODS } from '../data/constants';

export default function DashboardPage({ quizAnswers, logs = [] }) {

  const navigate = useNavigate();
  const today = new Date();

  const answers = quizAnswers || {
    sleep: 7,
    work: 5,
    motivation: 5,
    productivity: 5,
    stress: 5,
    mood: 6,
    social: 5,
    screentime: 4
  };

  const burnoutScore = computeBurnoutPercent(answers);
  const overallHealth = computeOverallHealth(answers);

  // =============================
  // WEEKLY SLEEP DATA
  // =============================
  function getWeeklySleepData(logs) {
    const daysMap = {
      Mon: 0, Tue: 0, Wed: 0,
      Thu: 0, Fri: 0, Sat: 0, Sun: 0,
    };

    logs.forEach(log => {
      const day = new Date(log.created_at)
        .toLocaleDateString("en-US", { weekday: "short" });

      if (daysMap.hasOwnProperty(day)) {
        daysMap[day] = log.sleep_hours;
      }
    });

    return Object.values(daysMap);
  }

  const sleepData = getWeeklySleepData(logs);

  // =============================
  // WEEKLY STRESS DATA
  // =============================
  function getWeeklyStressData(logs) {
    const daysMap = {
      Mon: 0, Tue: 0, Wed: 0,
      Thu: 0, Fri: 0, Sat: 0, Sun: 0,
    };

    logs.forEach(log => {
      const day = new Date(log.created_at)
        .toLocaleDateString("en-US", { weekday: "short" });

      if (daysMap.hasOwnProperty(day)) {
        daysMap[day] = log.stress_level;
      }
    });

    return Object.values(daysMap);
  }

  const stressData = getWeeklyStressData(logs);

  // =============================
  // WEEKLY MOOD DATA
  // =============================
  function getWeeklyMoodData(logs) {
    const daysMap = {
      Mon: null, Tue: null, Wed: null,
      Thu: null, Fri: null, Sat: null, Sun: null,
    };

    logs.forEach(log => {
      const day = new Date(log.created_at)
        .toLocaleDateString("en-US", { weekday: "short" });

      const moodObj = MOODS.find(m => m.value === log.mood);

      if (daysMap.hasOwnProperty(day)) {
        daysMap[day] = moodObj;
      }
    });

    return Object.entries(daysMap).map(([day, mood]) => ({
      day,
      mood
    }));
  }

  const moodWeekData = getWeeklyMoodData(logs);

  // =============================
  // AVERAGES
  // =============================
  const avgSleep =
    sleepData.length > 0
      ? (sleepData.reduce((a, b) => a + b, 0) / sleepData.length).toFixed(1)
      : 0;

  const avgStress =
    stressData.length > 0
      ? Math.round(
          stressData.reduce((a, b) => a + b, 0) / stressData.length
        )
      : 0;

  // =============================
  // RETURN UI
  // =============================

  return (
    <div className="dashboard-page" style={{
      minHeight: '100vh',
      background: `linear-gradient(160deg, #FBF8CC 0%, #FDE4CF44 50%, #A3C4F322 100%)`,
      paddingTop: 90,
      paddingBottom: 60,
    }}>
      <div style={{ maxWidth: 1050, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 45, fontWeight: 750 }}>
            Hi Sathya!! 👋
          </h1>
          <p style={{ color: '#9a8aaa' }}>
            {today.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })} · Here's your weekly snapshot
          </p>
        </div>

        {/* MOOD + BURNOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, marginBottom: 20 }}>

          <Card>
            <h3>This Week's Mood</h3>
            <MoodWeekTracker moodData={moodWeekData} />
          </Card>

          <Card style={{ textAlign: 'center' }}>
            <h3>Burnout Score</h3>
            <BurnoutCircle score={burnoutScore} />
          </Card>

        </div>

        {/* CHARTS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          <Card>
            <h3>😴 Sleep Hours</h3>
            <div>Avg: {avgSleep}h</div>
            <SleepChart data={sleepData} />
          </Card>

          <Card>
            <h3>😰 Stress Level</h3>
            <div>Avg: {avgStress}%</div>
            <StressChart data={stressData} />
          </Card>

        </div>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Btn onClick={() => navigate('/analysis')} variant="outline">
            📊 View Full Report & Analysis →
          </Btn>
        </div>

      </div>
    </div>
  );
}