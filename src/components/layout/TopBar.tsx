import { useGameState } from '../../hooks/useGameState';

export default function TopBar() {
  const state = useGameState();

  return (
    <header
      className="pixel-border-thin"
      style={{
        height: 56,
        background: 'var(--warm-milk)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        gap: 16,
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--amber)' }}>
          种牛世界
        </span>
        <span style={{ fontSize: 12, color: 'var(--warm-brown)', opacity: 0.7 }}>
          第 {state.day} 日 - 阶段 {state.phase}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ResourcePill icon="🌿" label="牧草" value={state.inventory.grass} unit="kg" color="var(--success)" />
        <ResourcePill icon="💧" label="净水" value={state.inventory.water} unit="L" color="var(--sci-cyan)" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--cream)', border: '2px solid var(--espresso)', boxShadow: '2px 2px 0 var(--espresso)' }}>
          <span style={{ fontSize: 14 }}>★</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>{state.reputation}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--cream)', border: '2px solid var(--amber)', boxShadow: '2px 2px 0 var(--amber)' }}>
          <span style={{ fontSize: 14, color: 'var(--amber)' }}>◎</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>{state.currency.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
}

function ResourcePill({ icon, label, value, unit, color }: { icon: string; label: string; value: number; unit: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
      <span style={{ color }}>{icon}</span>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{value}{unit}</span>
    </div>
  );
}
