import { WORLD_WIDTH, WORLD_HEIGHT } from '../../types/world';
import { zones } from '../../data/worldLayout';

interface Props {
  camX: number;
  camY: number;
  zoom: number;
  activeZone: string | null;
  onZoneClick: (zoneId: string) => void;
}

export default function MiniMap({ camX, camY, zoom, activeZone, onZoneClick }: Props) {
  const scale = 0.06;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        width: WORLD_WIDTH * scale + 4,
        height: WORLD_HEIGHT * scale + 4,
        background: 'rgba(26,20,16,0.85)',
        border: '2px solid var(--espresso)',
        zIndex: 1000,
        padding: 2,
      }}
    >
      {/* Viewport rect */}
      <div
        style={{
          position: 'absolute',
          left: camX * scale,
          top: camY * scale,
          width: (vw / zoom) * scale,
          height: (vh / zoom) * scale,
          border: '1px solid rgba(212,163,115,0.6)',
          background: 'rgba(212,163,115,0.08)',
          pointerEvents: 'none',
        }}
      />

      {/* Zones */}
      {zones.map(zone => (
        <div
          key={zone.id}
          onClick={() => onZoneClick(zone.id)}
          style={{
            position: 'absolute',
            left: zone.x * scale,
            top: zone.y * scale,
            width: zone.width * scale,
            height: zone.height * scale,
            background: activeZone === zone.id ? zone.color : 'rgba(255,248,240,0.2)',
            border: activeZone === zone.id ? `1px solid ${zone.color}` : '1px solid rgba(255,248,240,0.15)',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          title={zone.name}
        />
      ))}
    </div>
  );
}
