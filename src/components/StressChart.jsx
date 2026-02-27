import React from 'react';
import { C, DAYS } from '../data/constants';

export default function StressChart({ data = [] }) {
  const w = 100, h = 60;
  const maxV = 100;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / maxV) * h}`).join(' ');

  const getColor = (v) => v > 65 ? '#f25c54' : v > 40 ? '#f9c74f' : '#69d98c';

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 80, overflow: 'visible' }}>
        <defs>
          <linearGradient id="stressGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.grannySmith} />
            <stop offset="50%" stopColor={C.champagnePink} />
            <stop offset="100%" stopColor={C.babyPink} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {[25, 50, 75].map(y => (
          <line key={y} x1="0" y1={h - (y / maxV) * h} x2={w} y2={h - (y / maxV) * h}
            stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" strokeDasharray="2,2" />
        ))}
        <polygon
          points={`0,${h} ${pts} ${w},${h}`}
          fill="url(#stressGrad)" opacity="0.15"
        />
        <polyline points={pts} fill="none" stroke="url(#stressGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
        {data.map((v, i) => (
          <circle key={i}
            cx={(i / (data.length - 1)) * w}
            cy={h - (v / maxV) * h}
            r="2.5"
            fill={getColor(v)}
            stroke="white" strokeWidth="1"
          />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {DAYS.map(d => <span key={d} style={{ fontSize: 10, color: '#9a8aaa', fontWeight: 600, flex: 1, textAlign: 'center' }}>{d}</span>)}
      </div>
    </div>
  );
}
