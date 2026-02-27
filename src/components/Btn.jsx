import React, { useState } from 'react';

export default function Btn({ children, onClick, variant = 'primary', style }) {
  const [hovered, setHovered] = useState(false);
  const variants = {
    primary: {
      background: hovered
        ? `linear-gradient(135deg, #CFBAF0, #A3C4F3)`
        : `linear-gradient(135deg, #F1C0E8, #CFBAF0)`,
      color: '#4a3560',
      border: 'none',
    },
    outline: {
      background: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
      color: '#4a3560',
      border: `2px solid #CFBAF0`,
    },
    success: {
      background: hovered
        ? `linear-gradient(135deg, #98F5E1, #B9FBC0)`
        : `linear-gradient(135deg, #B9FBC0, #98F5E1)`,
      color: '#1a4a2e',
      border: 'none',
    },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '12px 28px',
        borderRadius: 50,
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 700,
        fontSize: 15,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-2px) scale(1.03)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.08)',
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
