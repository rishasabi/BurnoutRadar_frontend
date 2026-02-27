import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Btn from '../components/Btn';
import { gradBg, C } from '../data/constants';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      // set simple client-side auth state
      localStorage.setItem('user', name);
      // notify other components in this window
      window.dispatchEvent(new Event('userChanged'));
      navigate('/dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: gradBg,
      backgroundSize: '300% 300%',
      animation: 'gradShift 10s ease infinite',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '100px 20px 40px',
    }}>
      <Card style={{ padding: '48px 40px', width: '100%', maxWidth: 420, animation: 'scaleIn 0.4s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Comfortaa', cursive", fontSize: 28, fontWeight: 700, background: 'linear-gradient(135deg, #7c5cbf, #4a8fc4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome back</h2>
          <p style={{ color: '#9a8aaa', fontSize: 14, marginTop: 6 }}>Track your burnout, reclaim your energy</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#6a5a7a', marginBottom: 6 }}>Your Name</label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Alex"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: `2px solid ${C.lavenderBlue}88`, fontFamily: "'Nunito', sans-serif", fontSize: 15, outline: 'none', background: 'rgba(255,255,255,0.8)', color: '#3a2a4a', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = C.lavenderBlue}
              onBlur={e => e.target.style.borderColor = `${C.lavenderBlue}88`}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#6a5a7a', marginBottom: 6 }}>Password</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: `2px solid ${C.lavenderBlue}88`, fontFamily: "'Nunito', sans-serif", fontSize: 15, outline: 'none', background: 'rgba(255,255,255,0.8)', color: '#3a2a4a', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = C.lavenderBlue}
                onBlur={e => e.target.style.borderColor = `${C.lavenderBlue}88`}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
              <button type="button" onClick={() => setShowPassword(s => !s)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#7c5cbf', fontWeight: 700 }}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <Btn onClick={handleLogin} style={{ width: '100%', marginTop: 8, padding: '14px', fontSize: 16 }}>Sign In ✨</Btn>
          <p style={{ textAlign: 'center', color: '#9a8aaa', fontSize: 13 }}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')} style={{ color: '#7c5cbf', cursor: 'pointer', fontWeight: 700 }}>Signup here!</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
