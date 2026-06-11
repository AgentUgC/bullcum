import { useGameState } from '../../hooks/useGameState';

export default function WarehouseView() {
  const state = useGameState();
  const inv = state.inventory;

  const resources = [
    { label: '牧草', value: inv.grass, unit: 'kg', icon: '草', color: 'var(--success)' },
    { label: '净水', value: inv.water, unit: 'L', icon: '水', color: 'var(--sci-cyan)' },
    { label: '营养强化料', value: inv.强化料, unit: '份', icon: '✦', color: 'var(--amber)' },
    { label: '终极营养补充液', value: inv.supplement, unit: '份', icon: '◆', color: 'var(--q-superior)' },
    { label: '标准精液', value: inv.semenStandard, unit: 'ml', icon: '○', color: 'var(--q-standard)' },
    { label: '优级精液', value: inv.semenPremium, unit: 'ml', icon: '◇', color: 'var(--q-premium)' },
    { label: '特级精液', value: inv.semenSuperior, unit: 'ml', icon: '◆', color: 'var(--q-superior)' },
  ];

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto', height: '100%', overflow: 'auto' }}>
      <h2 style={{ fontSize: 22, marginBottom: 4 }}>仓库</h2>
      <p style={{ fontSize: 12, opacity: 0.7, marginBottom: 16 }}>堆放资源，无等级限制，无上限保存</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {resources.map(r => (
          <div key={r.label} className="pixel-border" style={{ padding: 14, background: 'var(--cream)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--warm-milk)', border: '2px solid var(--espresso)',
              fontSize: 18, color: r.color,
            }}>
              {r.icon}
            </div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{r.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16 }}>
                {r.value.toLocaleString()} {r.unit}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
