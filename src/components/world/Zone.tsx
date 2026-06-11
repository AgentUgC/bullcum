import { useState } from 'react';
import type { ZoneDef } from '../../types/world';

interface Props {
  zone: ZoneDef;
  isActive: boolean;
  isFocused: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function Zone({ zone, isActive, isFocused, onClick, children }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-zone={zone.id}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        left: zone.x,
        top: zone.y,
        width: zone.width,
        height: zone.height,
        border: `3px solid ${isFocused ? zone.color : 'var(--espresso)'}`,
        background: isFocused
          ? `linear-gradient(180deg, rgba(255,248,240,0.97) 0%, rgba(250,243,232,0.95) 100%)`
          : `linear-gradient(180deg, rgba(255,248,240,0.85) 0%, rgba(250,243,232,0.8) 100%)`,
        boxShadow: isHovered || isFocused
          ? `0 0 30px ${zone.glowColor}, 4px 4px 0 rgba(62,39,35,0.2)`
          : '4px 4px 0 rgba(62,39,35,0.15)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        zIndex: isFocused ? 50 : isHovered ? 20 : 10,
        opacity: isActive || isFocused ? 1 : 0.7,
      }}
    >
      {/* Zone header */}
      <div
        style={{
          padding: '8px 12px',
          borderBottom: `2px solid ${isFocused ? zone.color : 'var(--light-wood)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: isFocused ? `linear-gradient(90deg, ${zone.glowColor}, transparent)` : undefined,
          transition: 'all 0.3s ease',
        }}
      >
        <span
          style={{
            fontSize: 18,
            color: zone.color,
            lineHeight: 1,
            filter: isFocused ? `drop-shadow(0 0 4px ${zone.glowColor})` : undefined,
            transition: 'filter 0.3s',
          }}
        >
          {zone.icon}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            {zone.name}
          </div>
          <div style={{ fontSize: 10, opacity: 0.6 }}>{zone.subtitle}</div>
        </div>
      </div>

      {/* Zone content */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'calc(100% - 50px)',
          overflow: isFocused ? 'auto' : 'hidden',
        }}
      >
        {children}
      </div>

      {/* Focus indicator */}
      {isFocused && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: `2px solid ${zone.color}`,
            opacity: 0.3,
            pointerEvents: 'none',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
}
