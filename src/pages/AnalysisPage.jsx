import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Btn from '../components/Btn';
import BurnoutCircle from '../components/BurnoutCircle';
import ScoreBar from '../components/ScoreBar';
import { C, MOODS } from '../data/constants';
import { getAnalysis, computeOverallHealth, computeBurnoutPercent } from '../utils/analysis';

export default function AnalysisPage({ quizAnswers }) {
  const navigate = useNavigate();
  const answers = quizAnswers || {
    sleep: 6.5,
    work: 9,
    motivation: 5,
    productivity: 6,
    stress: 7,
    mood: 2,
    social: 4,
    screentime: 6,
  };

  const items = getAnalysis(answers);
  const overallHealth = computeOverallHealth(answers); // 0-100 where higher is healthier
  const burnoutPercent = computeBurnoutPercent(answers); // 0-100 where higher is worse
  const moodEntry = MOODS[answers.mood];

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(160deg, ${C.lemonChiffon} 0%, ${C.champagnePink}33 100%)`,
      paddingTop: 90, paddingBottom: 60,
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40, animation: 'floatUp 0.5s ease' }}>
          <h1 style={{
            fontFamily: "'Comfortaa', cursive", fontSize: 34, fontWeight: 700, color: '#3a2a4a',
          }}>Your Wellbeing Report 📊</h1>
          <p style={{ color: '#9a8aaa', fontSize: 15, marginTop: 6 }}>Based on today's check-in</p>

          <div style={{ display: 'inline-block', marginTop: 28 }}>
            <BurnoutCircle score={burnoutPercent} />
          </div>
          <div style={{ marginTop: 8, color: '#7c5cbf', fontWeight: 800 }}>Overall health: {overallHealth}%</div>
        </div>

        {/* Analysis Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 18 }}>
          {items.map((item, i) => (
            <Card key={item.key} style={{ padding: '24px 26px', animation: `floatUp 0.5s ease ${0.1 + i * 0.07}s both` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: item.color, fontSize: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 12px ${item.color}88`,
                }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 800, fontSize: 15, color: '#3a2a4a' }}>{item.label}</span>
                    <span style={{ fontWeight: 900, fontSize: 16, color: '#7c5cbf' }}>{Math.round(item.score)}%</span>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <ScoreBar score={item.score} color={item.color} />
                  </div>
                </div>
              </div>
              <p style={{
                fontSize: 13, color: '#6a5a7a', lineHeight: 1.6,
                background: item.color + '22', borderRadius: 10, padding: '10px 14px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                {item.getComment(answers[item.key])}
              </p>
            </Card>
          ))}
        </div>

        {/* Mood Summary */}
        <Card style={{ padding: '24px 28px', marginTop: 18, animation: 'floatUp 0.5s ease 0.7s both' }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#3a2a4a', marginBottom: 14 }}>
            {MOODS[answers.mood]?.emoji} Today's Mood: {MOODS[answers.mood]?.label}
          </h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {MOODS.map((m, i) => (
              <div key={i} style={{
                padding: '8px 16px', borderRadius: 50,
                background: i === answers.mood ? m.color : 'rgba(0,0,0,0.04)',
                fontWeight: i === answers.mood ? 800 : 600,
                color: i === answers.mood ? '#3a2a4a' : '#c0b0cc',
                fontSize: 13,
                boxShadow: i === answers.mood ? `0 4px 12px ${m.color}88` : 'none',
              }}>
                {m.emoji} {m.label}
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap', animation: 'floatUp 0.5s ease 0.8s both' }}>
          <Btn onClick={() => navigate('/dashboard')}>← Back to Dashboard</Btn>
          <Btn onClick={() => navigate('/questionnaire')} variant="outline">Re-take Quiz 🔄</Btn>
        </div>
      </div>
    </div>
  );
}
