import React from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../components/Btn';
import Card from '../components/Card';
import { MOODS, C, gradBg } from '../data/constants';

export default function LandingPage() {
  const navigate = useNavigate();
const facts = [
  { icon: '📚', stat: '70%', desc: 'of students experience academic stress during exams' },
  { icon: '😴', stat: '60%', desc: 'of students get less than 7 hours of sleep regularly' },
  { icon: '📱', stat: '4–6h', desc: 'average daily screen time among teenagers' },
  { icon: '🧠', stat: '1 in 3', desc: 'students experience symptoms of burnout before graduation' },
] ;

  const features = [
    { icon: '📊', title: 'Daily Mood Tracking', desc: 'Log your mood in seconds. Our visual tracker makes it effortless to see patterns over time.', color: C.grannySmith },
    { icon: '🎯', title: 'Burnout Score', desc: 'A real-time composite score combining sleep, stress, motivation, and more into one clear number.', color: C.lavenderBlue },
    { icon: '😴', title: 'Sleep Analytics', desc: "Beautiful graphs showing your sleep trends with smart insights on what's working.", color: C.skyBlue },
    { icon: '📝', title: 'Smart Questionnaire', desc: "A quick daily check-in that takes under 2 minutes but gives you powerful weekly insights.", color: C.pinkLavender },
    { icon: '📈', title: 'Stress Radar', desc: 'Continuous stress tracking to spot your triggers before they become problems.', color: C.champagnePink },
    { icon: '📋', title: 'Full Reports', desc: 'Deep-dive analysis across all dimensions: productivity, social, screen time and more.', color: C.magicMint },
  ];

  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{
        minHeight: '92vh',
        background: gradBg,
        backgroundSize: '300% 300%',
        animation: 'gradShift 10s ease infinite',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '60px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {[
          { size: 320, top: '10%', left: '5%', color: 'rgba(207,186,240,0.25)', delay: '0s' },
          { size: 200, top: '60%', right: '8%', color: 'rgba(163,196,243,0.3)', delay: '1s' },
          { size: 150, bottom: '15%', left: '20%', color: 'rgba(152,245,225,0.25)', delay: '2s' },
          { size: 100, top: '20%', right: '25%', color: 'rgba(255,207,210,0.3)', delay: '0.5s' },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute', borderRadius: '50%',
            width: b.size, height: b.size,
            background: b.color,
            top: b.top, left: b.left, right: b.right, bottom: b.bottom,
            animation: `bobble ${3 + i * 0.7}s ease-in-out infinite`,
            animationDelay: b.delay,
            filter: 'blur(40px)',
          }} />
        ))}

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720 }}>
          <div style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.7)', borderRadius: 50, padding: '6px 18px',
            fontSize: 13, fontWeight: 700, color: '#7c5cbf', marginBottom: 24, animation: 'floatUp 0.6s ease forwards',
            border: `1px solid ${C.lavenderBlue}`,
          }}>
            🌱 Your wellness companion
          </div>

          <h1 style={{
            fontFamily: "'Comfortaa', cursive", fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 700, lineHeight: 1.15,
            background: `linear-gradient(135deg, #7c5cbf 0%, #4a8fc4 50%, #2a9d72 100%)`, backgroundSize: '200%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 4s linear infinite, floatUp 0.8s ease 0.2s both', marginBottom: 20,
          }}>
            Know Before<br />You Burn Out
          </h1>

          <p style={{ fontSize: 18, color: '#5a4a6a', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 40px', animation: 'floatUp 0.8s ease 0.4s both' }}>
            Track your mood, sleep, stress, and productivity daily. Get your personal burnout score and actionable insights before it's too late.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', animation: 'floatUp 0.8s ease 0.6s both' }}>
            <Btn onClick={() => navigate('/dashboard')} style={{ padding: '14px 36px', fontSize: 16 }}>🚀 Try Dashboard</Btn>
            <Btn onClick={() => navigate('/questionnaire')} variant="outline" style={{ padding: '14px 36px', fontSize: 16 }}>📝 Take Quiz</Btn>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, marginTop: 60, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', animation: 'floatUp 0.8s ease 0.8s both' }}>
          {MOODS.map((m, i) => (
            <div key={i} style={{ background: m.color, borderRadius: 50, padding: '8px 18px', fontSize: 14, fontWeight: 700, color: '#3a2a4a', animation: `bobble ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s`, cursor: 'default', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              {m.emoji} {m.label}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 40px', background: 'rgba(255,255,255,0.5)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontFamily: "'Comfortaa', cursive", fontSize: 36, fontWeight: 700, color: '#4a3560', marginBottom: 12 }}>Why Burnout Matters</h2>
          <p style={{ textAlign: 'center', color: '#7a6a8a', fontSize: 16, marginBottom: 50 }}>The numbers don't lie — burnout is a global crisis.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {facts.map((f, i) => (
              <Card key={i} style={{ padding: 28, textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontSize: 42, fontWeight: 900, fontFamily: "'Comfortaa', cursive", background: 'linear-gradient(135deg, #7c5cbf, #4a8fc4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>{f.stat}</div>
                <p style={{ color: '#6a5a7a', fontSize: 14, lineHeight: 1.5 }}>{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 40px', background: gradBg, backgroundSize: '300% 300%', animation: 'gradShift 12s ease infinite' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontFamily: "'Comfortaa', cursive", fontSize: 36, fontWeight: 700, color: '#4a3560', marginBottom: 12 }}>Everything You Need</h2>
          <p style={{ textAlign: 'center', color: '#6a5a7a', fontSize: 16, marginBottom: 50 }}>One dashboard to understand your wellbeing.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
            {features.map((f, i) => (
              <Card key={i} style={{ padding: 30 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: f.color, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: `0 4px 14px ${f.color}88` }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#3a2a4a', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#7a6a7a', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 40px', textAlign: 'center', background: 'rgba(255,255,255,0.6)' }}>
        <h2 style={{ fontFamily: "'Comfortaa', cursive", fontSize: 40, fontWeight: 700, color: '#4a3560', marginBottom: 16 }}>Ready to Take Control? 🌟</h2>
        <p style={{ color: '#7a6a8a', fontSize: 17, marginBottom: 36 }}>Start tracking today. It only takes 2 minutes.</p>
        <Btn onClick={() => navigate('/login')} style={{ padding: '16px 48px', fontSize: 17 }}>Get Started — It's Free ✨</Btn>
      </section>

      <footer style={{ padding: '28px 40px', textAlign: 'center', background: 'rgba(207,186,240,0.15)', color: '#9a8aaa', fontSize: 13, borderTop: `1px solid ${C.lavenderBlue}44` }}>
        © 2026 BurnoutRadar • Made with 💜 for your wellbeing
      </footer>
    </div>
  );
}
