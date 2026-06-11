import { useGameState } from '../../hooks/useGameState';
import type { SceneId } from '../../App';
import { zones } from '../../data/worldLayout';

interface Props {
  activeZone: SceneId | null;
  onZoneChange: (zone: SceneId | null) => void;
}

export default function TopBar({ activeZone, onZoneChange }: Props) {
  const state = useGameState();
  const currentZone = zones.find(z => z.id === activeZone);

  return (
    <header
      style={{
        height: 48,
        background: 'rgba(250,243,232,0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '2px solid var(--espresso)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        gap: 16,
        pointerEvents: 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--amber)' }}>
          种牛世界
        </span>

        {/* Zone indicator / overview toggle */}
        <button
          onClick={() => onZoneChange(null)}
          style={{
            fontSize: 12,
            color: 'var(--warm-brown)',
            padding: '2px 10px',
            background: activeZone ? 'var(--cream)' : 'var(--peach)',
            border: '2px solid var(--espresso)',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontWeight: activeZone ? 400 : 700,
          }}
        >
          {activeZone ? currentZone?.name : '全景总览'}
        </button>
      </div>

      {/* Quick nav pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center', overflow: 'hidden' }}>
        {zones.map(zone => (
          <button
            key={zone.id}
            onClick={() => onZoneChange(zone.id as SceneId)}
            title={zone.name}
            style={{
              padding: '2px 8px',
              fontSize: 10,
              background: activeZone === zone.id ? zone.color : 'var(--cream)',
              color: activeZone === zone.id ? '#fff' : 'var(--warm-brown)',
              border: `2px solid ${activeZone === zone.id ? zone.color : 'var(--espresso)'}`,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              opacity: activeZone === zone.id ? 1 : 0.7,
              transition: 'all 0.2s',
            }}
          >
            {zone.icon} {zone.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <ResourcePill label="牧草" value={state.inventory.hay} unit="kg" color="var(--success)" />
        <ResourcePill label="净水" value={state.inventory.water} unit="L" color="var(--sci-cyan)" />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 8px',
            background: 'var(--cream)',
            border: '2px solid var(--espresso)',
            boxShadow: '2px 2px 0 var(--espresso)',
          }}
        >
          <span style={{ fontSize: 12 }}>★</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700 }}>{state.reputation}</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 8px',
            background: 'var(--cream)',
            border: '2px solid var(--amber)',
            boxShadow: '2px 2px 0 var(--amber)',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--amber)' }}>◎</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700 }}>{state.currency.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
}

function ResourcePill({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11 }}>
      <span style={{ color, fontWeight: 700 }}>●</span>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{value}{unit}</span>
    </div>
  );
}
