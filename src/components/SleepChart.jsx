import React from 'react';
import { DAYS } from '../data/constants';

export default function SleepChart({ data = [], labels = DAYS }) {

  // Prevent empty chart crash
  if (!data || data.length === 0) {
    return <p style={{ color: '#9a8aaa', fontSize: 12 }}>No sleep data available</p>;
  }

  // Dynamic max (minimum 8 so bars don’t look too large)
  const max = Math.max(...data, 8);

  return (
    <div style={{ padding: '0 4px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          height: 120,
          justifyContent: 'space-between'
        }}
      >
        {data.map((val, i) => {

          const safeVal = val || 0; // handle null/undefined
          const pct = (safeVal / max) * 100;

          const color =
            safeVal < 6
              ? '#FFCFD2'
              : safeVal < 7.5
              ? '#FDE4CF'
              : '#B9FBC0';

          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#9a8aaa'
                }}
              >
                {safeVal}h
              </span>

              <div
                style={{
                  width: '100%',
                  borderRadius: '8px 8px 4px 4px',
                  background: color,
                  height: `${pct}%`,
                  boxShadow: `0 4px 12px ${color}88`,
                  transition: 'height 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                  minHeight: 4
                }}
              />

              <span
                style={{
                  fontSize: 10,
                  color: '#9a8aaa',
                  fontWeight: 600
                }}
              >
                {labels[i] || ''}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
        {[
          { color: '#B9FBC0', label: 'Good (7h+)' },
          { color: '#FDE4CF', label: 'Okay (6–7h)' },
          { color: '#FFCFD2', label: 'Low (<6h)' }
        ].map((l, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: l.color
              }}
            />
            <span style={{ color: '#9a8aaa' }}>
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
/*original
import React from 'react';
import { DAYS } from '../data/constants';

export default function SleepChart({ data = [] }) {
  const max = 10;
  return (
    <div style={{ padding: '0 4px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100, justifyContent: 'space-between' }}>
        {data.map((val, i) => {
          const pct = (val / max) * 100;
          const color = val < 6 ? '#FFCFD2' : val < 7.5 ? '#FDE4CF' : '#B9FBC0';
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#9a8aaa' }}>{val}h</span>
              <div style={{
                width: '100%', borderRadius: '8px 8px 4px 4px',
                background: color,
                height: `${pct}%`,
                boxShadow: `0 4px 12px ${color}88`,
                transition: 'height 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                animationDelay: `${i * 0.1}s`,
                minHeight: 4,
              }} />
              <span style={{ fontSize: 10, color: '#9a8aaa', fontWeight: 600 }}>{DAYS[i]}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
        {[{ color: '#B9FBC0', label: 'Good (7h+)' }, { color: '#FDE4CF', label: 'Okay (6-7h)' }, { color: '#FFCFD2', label: 'Low (<6h)' }].map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />
            <span style={{ color: '#9a8aaa' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
*/