import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Btn from '../components/Btn';
import { questions, MOODS } from '../data/constants';

export default function QuestionnairePage({ onSubmit }) {
  const [step, setStep] = useState(0);
  const initialAnswers = {
    sleep: 0,
    work: 0,
    motivation: 0,
    productivity: 0,
    stress: 0,
    mood: 0,
    social: 0,
    screentime: 0,
  };

  const [answers, setAnswers] = useState(initialAnswers);
  const navigate = useNavigate();

  const q = questions[step];
  const isLast = step === questions.length - 1;

  const handleNext = () => {
    if (isLast) {
      if (typeof onSubmit === 'function') onSubmit(answers);
      navigate('/analysis');
    } else setStep(s => s + 1);
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FBF8CC 0%, #FDE4CF 33%, #A3C4F322 100%)',
      backgroundSize: '300% 300%',
      animation: 'gradShift 10s ease infinite',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 20px 40px',
    }}>
      <Card style={{ width: '100%', maxWidth: 520, padding: '40px 40px', animation: 'scaleIn 0.3s ease' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#9a8aaa', fontWeight: 700 }}>Daily Check-in</span>
            <span style={{ fontSize: 12, color: '#7c5cbf', fontWeight: 700 }}>{step + 1}/{questions.length}</span>
          </div>
          <div style={{ height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 99 }}>
            <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #F1C0E8, #CFBAF0, #90DBF4)', width: `${progress}%`, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: q.color, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: `0 8px 24px ${q.color}88`, animation: 'bobble 3s ease-in-out infinite' }}>{q.icon}</div>
          <h2 style={{ fontFamily: "'Comfortaa', cursive", fontSize: 22, fontWeight: 700, color: '#3a2a4a' }}>{q.label}</h2>
        </div>

        <div style={{ marginBottom: 36 }}>
          {q.type === 'slider' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 16, fontSize: 42, fontWeight: 900, fontFamily: "'Comfortaa', cursive", color: '#7c5cbf' }}>{answers[q.key]}{q.unit}</div>
              <input type="range" min={q.min} max={q.max} step={q.step} value={answers[q.key]} onChange={e => setAnswers(a => ({ ...a, [q.key]: parseFloat(e.target.value) }))} style={{ width: '100%', accentColor: '#7c5cbf', height: 6 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}><span style={{ fontSize: 11, color: '#9a8aaa' }}>{q.min}</span><span style={{ fontSize: 11, color: '#9a8aaa' }}>{q.max}</span></div>
            </div>
          )}

          {q.type === 'mood' && (
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                {MOODS.map((m, i) => (
                  <div key={i} onClick={() => setAnswers(a => ({ ...a, mood: i }))} style={{ padding: '10px 18px', borderRadius: 50, background: answers.mood === i ? m.color : 'rgba(0,0,0,0.05)', border: `2px solid ${answers.mood === i ? m.color : 'transparent'}`, cursor: 'pointer', fontSize: 14, fontWeight: 700, color: answers.mood === i ? '#3a2a4a' : '#9a8aaa', transition: 'all 0.2s', transform: answers.mood === i ? 'scale(1.05)' : 'scale(1)', boxShadow: answers.mood === i ? `0 4px 14px ${m.color}88` : 'none' }}>{m.emoji} {m.label}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {step > 0 && <Btn onClick={() => setStep(s => s - 1)} variant="outline" style={{ flex: 1 }}>← Back</Btn>}
          <Btn onClick={handleNext} style={{ flex: 2 }}>{isLast ? '✨ Submit & See Results' : 'Next →'}</Btn>
        </div>
      </Card>
    </div>
  );
}
