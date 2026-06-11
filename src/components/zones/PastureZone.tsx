import { useGameState } from '../../hooks/useGameState';

interface Props {
  isFocused: boolean;
  onEnter: () => void;
}

export default function PastureZone({ isFocused }: Props) {
  const state = useGameState();
  const activeBulls = state.bulls.filter((b) => b.status === 'healthy').slice(0, 6);

  if (!isFocused) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
          存栏 {state.bulls.length} 头
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          {activeBulls.map((bull) => (
            <div
              key={bull.id}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background:
                  bull.quality === 'superior'
                    ? 'var(--q-superior)'
                    : bull.quality === 'premium'
                      ? 'var(--q-premium)'
                      : 'var(--q-standard)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: '#fff',
                fontWeight: 700,
              }}
            >
              {bull.quality === 'superior' ? 'S' : bull.quality === 'premium' ? 'A' : 'B'}
            </div>
          ))}
        </div>
        <img
          src="/HolstaurM.png"
          alt="灵感来源"
          style={{
            width: 80,
            marginTop: 12,
            imageRendering: 'pixelated',
            opacity: 0.6,
          }}
        />
      </div>
    );
  }

  // Focused mode - show full content
  return (
    <div style={{ padding: 16, height: '100%', overflow: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, marginBottom: 4, textShadow: '2px 2px 0 var(--light-wood)' }}>
          人造牧场大厅
        </h2>
        <p style={{ fontSize: 12, color: 'var(--warm-brown)', opacity: 0.8 }}>
          奶白色与浅木色的温馨空间 · 全厂中枢
        </p>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <img
          src="/HolstaurM.png"
          alt="灵感来源"
          style={{
            width: 140,
            imageRendering: 'pixelated',
            display: 'block',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
          {activeBulls.map((bull) => (
            <div
              key={bull.id}
              className="pixel-border-thin"
              style={{
                padding: '4px 10px',
                background: 'var(--cream)',
                fontSize: 11,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background:
                    bull.quality === 'superior'
                      ? 'var(--q-superior)'
                      : bull.quality === 'premium'
                        ? 'var(--q-premium)'
                        : 'var(--q-standard)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 8,
                  color: '#fff',
                  fontWeight: 700,
                }}
              >
                {bull.quality === 'superior' ? 'S' : bull.quality === 'premium' ? 'A' : 'B'}
              </div>
              <span>{bull.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overview stats */}
      <div
        className="pixel-border-thin"
        style={{
          marginTop: 16,
          padding: 12,
          background: 'var(--warm-milk)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: 10, opacity: 0.6 }}>今日产出</div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            {state.inventory.semenStandard + state.inventory.semenPremium + state.inventory.semenSuperior}ml
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, opacity: 0.6 }}>待处理订单</div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            {state.orders.filter((o) => !o.completed).length}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, opacity: 0.6 }}>工厂声誉</div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            {state.reputation}
          </div>
        </div>
      </div>
    </div>
  );
}
