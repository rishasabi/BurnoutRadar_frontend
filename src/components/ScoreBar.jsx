import React, { useEffect, useState } from 'react';

export default function ScoreBar({ score = 50, color = '#7c5cbf' }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setTimeout(() => setAnimated(true), 100); }, []);
  return (
    <div style={{ height: 8, background: 'rgba(0,0,0,0.06)', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: 99,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        width: animated ? `${score}%` : '0%',
        transition: 'width 0.9s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: `0 2px 8px ${color}88`,
      }} />
    </div>
  );
}
