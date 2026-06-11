import { useGameState } from '../../hooks/useGameState';

interface Props {
  isFocused: boolean;
  onEnter: () => void;
}

export default function WarehouseZone({ isFocused }: Props) {
  const state = useGameState();

  const resources = [
    { label: '牧草', value: state.inventory.hay, unit: 'kg', icon: '≋' },
    { label: '净水', value: state.inventory.water, unit: 'L', icon: '≈' },
    { label: '营养强化料', value: state.inventory.supplement, unit: '份', icon: '◆' },
    { label: '终极营养补充液', value: state.inventory.ultimateSupplement, unit: '份', icon: '◇' },
    { label: '标准精液', value: state.inventory.semenStandard, unit: 'ml', icon: '○' },
    { label: '优级精液', value: state.inventory.semenPremium, unit: 'ml', icon: '◎' },
    { label: '特级精液', value: state.inventory.semenSuperior, unit: 'ml', icon: '◉' },
  ];

  if (!isFocused) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
          仓库
        </div>
        <div style={{ fontSize: 11, opacity: 0.5 }}>
          {resources.length} 类资源 · {resources.reduce((s, r) => s + r.value, 0)} 单位
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 12, height: '100%', overflow: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <h2 style={{ fontSize: 18 }}>仓库</h2>
        <p style={{ fontSize: 11, opacity: 0.7 }}>资源储备 · 库存管理</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 8 }}>
        {resources.map(res => (
          <div key={res.label} className="pixel-border-thin" style={{ padding: 10, background: 'var(--cream)', textAlign: 'center' }}>
            <div style={{ fontSize: 16, marginBottom: 4, opacity: 0.7 }}>{res.icon}</div>
            <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 4 }}>{res.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              {res.value}
              <span style={{ fontSize: 9, opacity: 0.5 }}>{res.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
