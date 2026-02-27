import React, { useState } from 'react';

export default function Card({ children, style, hover = true, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(14px)',
        borderRadius: 20,
        border: '1.5px solid rgba(255,255,255,0.9)',
        boxShadow: hovered
          ? '0 20px 60px rgba(160,120,200,0.18), 0 4px 20px rgba(0,0,0,0.06)'
          : '0 8px 32px rgba(160,120,200,0.10), 0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
