import { useGameState } from '../../hooks/useGameState';
import type { SceneId } from '../../App';

const sceneNames: Record<SceneId, string> = {
  pasture: '人造牧场大厅',
  collection: '采精车间',
  manual: '人工采精室',
  rest: '休息棚',
  breeding: '培育室',
  orders: '订单中心',
  warehouse: '仓库',
  medical: '医疗室',
};

interface Props {
  scene: SceneId;
}

export default function TopBar({ scene }: Props) {
  const state = useGameState();

  return (
    <header
      style={{
        height: 48,
        background: 'rgba(250,243,232,0.85)',
        backdropFilter: 'blur(6px)',
        borderBottom: '2px solid var(--espresso)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        gap: 16,
        zIndex: 100,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--amber)' }}>
          种牛世界
        </span>
        <span
          style={{
            fontSize: 12,
            color: 'var(--warm-brown)',
            opacity: 0.8,
            padding: '2px 8px',
            background: 'var(--cream)',
            border: '1px solid var(--espresso)',
          }}
        >
          {sceneNames[scene]}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <ResourcePill label="牧草" value={state.inventory.grass} unit="kg" color="var(--success)" />
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
