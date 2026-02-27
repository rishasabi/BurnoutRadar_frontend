import React from 'react';

export default function MoodWeekTracker({ moodData = [] }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
        {moodData.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: d.mood ? d.mood.color : 'rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: d.mood ? 20 : 16,
              boxShadow: d.mood ? `0 4px 14px ${d.mood.color}88` : 'none',
              transition: 'all 0.3s',
              cursor: 'default',
              border: d.mood ? '2px solid rgba(255,255,255,0.8)' : '2px dashed rgba(0,0,0,0.12)',
              animation: d.mood ? `bobble ${2.5 + i * 0.2}s ease-in-out infinite` : 'none',
            }}>
              {d.mood ? d.mood.emoji : '○'}
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#9a8aaa' }}>{d.day}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
        {/* Light legend - slice to 4 to keep small */}
        {/** This component expects MOODS to be passed where used (pages import MOODS) */}
      </div>
    </div>
  );
}
