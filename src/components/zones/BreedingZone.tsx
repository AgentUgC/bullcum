import { useGameState } from '../../hooks/useGameState';

interface Props {
  isFocused: boolean;
  onEnter: () => void;
}

export default function BreedingZone({ isFocused }: Props) {
  const state = useGameState();

  if (!isFocused) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
          培育室
        </div>
        <div style={{ fontSize: 11, opacity: 0.5 }}>
          培养罐阵列 · 基因融合
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, height: '100%', overflow: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <h2 style={{ fontSize: 18 }}>培育室</h2>
        <p style={{ fontSize: 11, opacity: 0.7 }}>父本选择 · 新生种牛培育</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="pixel-border-thin" style={{ padding: 10, background: i < 2 ? 'rgba(127,216,210,0.15)' : 'var(--cream)', textAlign: 'center' }}>
            <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 4 }}>培养罐 {i + 1}</div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>
              {i < 2 ? '培育中' : '空闲'}
            </div>
            {i < 2 && (
              <div style={{ fontSize: 9, opacity: 0.5, marginTop: 4 }}>
                剩余 12 小时
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pixel-border" style={{ padding: 12, background: 'var(--warm-milk)' }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>新建培育</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <div className="pixel-border-thin" style={{ flex: 1, padding: 8, background: 'var(--cream)' }}>
            <div style={{ fontSize: 10, opacity: 0.6 }}>父本 A</div>
            <div style={{ fontSize: 12 }}>请选择种牛</div>
          </div>
          <div style={{ fontSize: 14, opacity: 0.4 }}>+</div>
          <div className="pixel-border-thin" style={{ flex: 1, padding: 8, background: 'var(--cream)' }}>
            <div style={{ fontSize: 10, opacity: 0.6 }}>父本 B (可选)</div>
            <div style={{ fontSize: 12 }}>请选择种牛</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 11 }}>成本: 500◎ × 1</div>
          <button className="pixel-border" style={{ padding: '6px 14px', background: 'var(--sci-cyan)', color: '#fff', cursor: 'pointer', fontSize: 12 }}>
            启动培育
          </button>
        </div>
      </div>
    </div>
  );
}
