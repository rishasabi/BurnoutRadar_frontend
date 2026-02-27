import React from 'react';
import BurnoutCircle from '../components/BurnoutCircle';
import ScoreBar from '../components/ScoreBar';
import MoodWeekTracker from '../components/MoodWeekTracker';
import Card from '../components/Card';
import SleepChart from '../components/SleepChart';
import StressChart from '../components/StressChart';
import Btn from '../components/Btn';
import { useNavigate } from 'react-router-dom';
import { sampleWeekMoods, sleepData, stressData } from '../data/constants';
import { computeBurnoutPercent, computeOverallHealth } from '../utils/analysis';

export default function DashboardPage({ quizAnswers }) {
  const navigate = useNavigate();
  const today = new Date();
  const answers = quizAnswers || { sleep: 7, work: 5, motivation: 5, productivity: 5, stress: 5, mood: 0, social: 5, screentime: 4 };
  const burnoutScore = computeBurnoutPercent(answers);
  const overallHealth = computeOverallHealth(answers);

  return (
    <div className="dashboard-page" style={{
      minHeight: '100vh',
      background: `linear-gradient(160deg, #FBF8CC 0%, #FDE4CF44 50%, #A3C4F322 100%)`,
      paddingTop: 90,
      paddingBottom: 60,
    }}>
      <div className="dashboard-inner" style={{ maxWidth: 1050, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 28, animation: 'floatUp 0.5s ease' }}>
          <h1 style={{ fontFamily: "'Comfortaa', cursive", fontSize: 45, fontWeight: 750, color: '#3a2a4a' }}>Hi Sathya!! 👋</h1>
          <p style={{ color: '#9a8aaa', fontSize: 15, marginTop: 4 }}>{today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · Here's your weekly snapshot</p>
        </div>

  <div className="top-row" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, marginBottom: 20 }}>
          <Card style={{ padding: '24px 28px', animation: 'floatUp 0.5s ease 0.1s both' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#3a2a4a' }}>This Week's Mood</h3>
                <p style={{ fontSize: 14, color: '#9a8aaa', marginTop: 2 }}>Daily emotional check-in</p>
              </div>
              <span style={{ fontSize: 14, color: '#7c5cbf', fontWeight: 700, cursor: 'pointer' }}>See More →</span>
            </div>
            <MoodWeekTracker moodData={sampleWeekMoods} />
          </Card>

          <Card style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 160, animation: 'floatUp 0.5s ease 0.2s both' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#3a2a4a', marginBottom: 16, textAlign: 'center' }}>Burnout<br />Score</h3>
            <BurnoutCircle score={burnoutScore} />
            <p style={{ fontSize: 13, color: '#9a8aaa', marginTop: 12, textAlign: 'center', lineHeight: 1.4 }}>Based on 6 days<br />of data this week</p>
          </Card>
        </div>

        <div style={{ textAlign: 'center', margin: '28px 0', animation: 'floatUp 0.5s ease 0.3s both' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ position: 'absolute', inset: -6, borderRadius: 50, background: 'linear-gradient(135deg, #F1C0E8, #CFBAF0, #90DBF4)', filter: 'blur(8px)', opacity: 0.5, animation: 'pulse 2s ease-in-out infinite' }} />
            <Btn onClick={() => navigate('/questionnaire')} style={{ position: 'relative', padding: '16px 48px', fontSize: 17, background: 'linear-gradient(135deg, #F1C0E8, #CFBAF0)' }}>📝 Take Today's Questionnaire</Btn>
          </div>
          <p style={{ fontSize: 12, color: '#9a8aaa', marginTop: 10 }}>Takes only ~2 minutes · Updates your burnout score</p>
        </div>

  <div className="charts-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, animation: 'floatUp 0.5s ease 0.4s both' }}>
          <Card style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#3a2a4a' }}>😴 Sleep Hours</h3>
                <p style={{ fontSize: 12, color: '#9a8aaa', marginTop: 2 }}>Weekly sleep tracker</p>
              </div>
              <div style={{ background: '#B9FBC0', borderRadius: 10, padding: '4px 10px', fontSize: 12, fontWeight: 700, color: '#1a4a2e' }}>Avg: 7.0h</div>
            </div>
            <SleepChart data={sleepData} />
          </Card>

          <Card style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#3a2a4a' }}>😰 Stress Level</h3>
                <p style={{ fontSize: 12, color: '#9a8aaa', marginTop: 2 }}>Continuous stress radar</p>
              </div>
              <div style={{ background: '#FDE4CF', borderRadius: 10, padding: '4px 10px', fontSize: 12, fontWeight: 700, color: '#6a3a1a' }}>Avg: 44%</div>
            </div>
            <StressChart data={stressData} />
          </Card>
        </div>

        <div style={{ marginTop: 20, animation: 'floatUp 0.5s ease 0.5s both' }}>
          <Card style={{ padding: '24px 28px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#3a2a4a', marginBottom: 16 }}>💡 Insights This Week</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[{ icon: '🛌', text: 'Sleep 2 days below 6h — try a consistent bedtime', color: '#FFCFD2' }, { icon: '📈', text: 'Your stress spiked Tuesday — what was different?', color: '#F1C0E8' }, { icon: '✅', text: "4 of 6 days in 'Happy' or 'Great' mood — great work!", color: '#B9FBC0' }].map((tip, i) => (
                <div key={i} style={{ background: tip.color + '55', borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start', border: `1.5px solid ${tip.color}88` }}>
                  <span style={{ fontSize: 20 }}>{tip.icon}</span>
                  <p style={{ fontSize: 13, color: '#4a3560', lineHeight: 1.5 }}>{tip.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div style={{ textAlign: 'center', marginTop: 28, animation: 'floatUp 0.5s ease 0.6s both' }}>
          <Btn onClick={() => navigate('/analysis')} variant="outline" style={{ padding: '12px 36px' }}>📊 View Full Report & Analysis →</Btn>
        </div>
      </div>
    </div>
  );
}
