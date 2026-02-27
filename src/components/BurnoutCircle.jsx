import React from 'react';

export default function BurnoutCircle({ score = 50 }) {
  // keep small visual similar to the original full-file implementation
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  const getColor = (s) => {
    if (s < 35) return ['#69d98c', '#b9fbc0'];
    if (s < 60) return ['#f9c74f', '#fee08b'];
    if (s < 80) return ['#f4845f', '#f7a072'];
    return ['#f25c54', '#f79d65'];
  };
  const [c1, c2] = getColor(score);

  const label = score < 35 ? 'Safe 🌿' : score < 60 ? 'Watch Out ⚠️' : score < 80 ? 'At Risk 🔥' : 'Critical 🚨';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width={120} height={120} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="circGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <circle cx={60} cy={60} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={10} />
        <circle
          cx={60} cy={60} r={r} fill="none"
          stroke="url(#circGrad)" strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)' }}
        />
        <g transform={`rotate(90, 60, 60)`}>
          <text x="60" y="54" textAnchor="middle" style={{
            fontFamily: "'Comfortaa', cursive", fontWeight: 700, fontSize: 20,
            fill: c1,
          }}>{score}</text>
          <text x="60" y="70" textAnchor="middle" style={{
            fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: 9,
            fill: '#9a8aaa',
          }}>BURNOUT</text>
        </g>
      </svg>
      <span style={{
        fontWeight: 800, fontSize: 13,
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>{label}</span>
    </div>
  );
}
