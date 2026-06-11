import { useGameState } from '../../hooks/useGameState';
import type { SceneId } from '../../App';

interface Props {
  goToScene: (s: SceneId) => void;
}

export default function PastureView({ goToScene }: Props) {
  const state = useGameState();
  const activeBulls = state.bulls.filter((b) => b.status === 'healthy').slice(0, 8);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #FFF8F0 0%, #FAF3E8 35%, #E6CCB2 100%)',
      }}
    >
      {/* Particles */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              bottom: -10,
              width: 3 + Math.random() * 5,
              height: 3 + Math.random() * 5,
              borderRadius: '50%',
              background: Math.random() > 0.5 ? 'var(--soft-pink)' : 'var(--peach)',
              opacity: 0.35,
              animation: `float-up ${10 + Math.random() * 14}s linear infinite`,
              animationDelay: `${Math.random() * 12}s`,
            }}
          />
        ))}
      </div>

      {/* Ground texture hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background:
            'linear-gradient(0deg, rgba(212,163,115,0.25) 0%, transparent 100%)',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          padding: '12px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 8,
            animation: 'slide-in-up 0.6s ease',
          }}
        >
          <h2 style={{ fontSize: 26, marginBottom: 2, textShadow: '2px 2px 0 var(--light-wood)' }}>
            人造牧场大厅
          </h2>
          <p style={{ fontSize: 12, color: 'var(--warm-brown)', opacity: 0.8 }}>
            奶白色与浅木色的温馨空间 · 选择一扇门进入功能区
          </p>
        </div>

        {/* Scene Body */}
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          {/* Top Door — Manual Room */}
          <SceneDoor
            label="人工采精室"
            sub="亲密互动 · 情欲抽卡"
            position={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
            color="var(--rose-gold)"
            glowColor="rgba(229,152,155,0.4)"
            onClick={() => goToScene('manual')}
            icon="♥"
          />

          {/* Left Door — Collection */}
          <SceneDoor
            label="采精车间"
            sub="配置泵位 · 启动采集"
            position={{ top: '50%', left: 0, transform: 'translateY(-50%)' }}
            color="var(--sci-cyan)"
            glowColor="rgba(127,216,210,0.35)"
            onClick={() => goToScene('collection')}
            icon="⚙"
          />

          {/* Right Door — Breeding */}
          <SceneDoor
            label="培育室"
            sub="新生种牛 · 基因融合"
            position={{ top: '50%', right: 0, transform: 'translateY(-50%)' }}
            color="var(--peach)"
            glowColor="rgba(255,212,179,0.4)"
            onClick={() => goToScene('breeding')}
            icon="⚗"
          />

          {/* Bottom Door — Rest */}
          <SceneDoor
            label="休息棚"
            sub={`${state.bulls.length} 头种牛 · 单牛互动`}
            position={{ bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
            color="var(--warm-gold)"
            glowColor="rgba(212,163,115,0.4)"
            onClick={() => goToScene('rest')}
            icon="☾"
          />

          {/* Center: HolstaurM + Active Bulls */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {/* HolstaurM Display */}
            <div
              className="pixel-border"
              style={{
                width: 160,
                padding: 8,
                background: 'var(--cream)',
                textAlign: 'center',
                animation: 'breathe 4s ease-in-out infinite',
              }}
            >
              <img
                src="/HolstaurM.png"
                alt="灵感来源"
                style={{
                  width: '100%',
                  imageRendering: 'pixelated',
                  display: 'block',
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  marginTop: 4,
                  color: 'var(--warm-brown)',
                  opacity: 0.8,
                }}
              >
                灵感来源 · 种牛世界
              </div>
            </div>

            {/* Active Bulls */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                justifyContent: 'center',
                maxWidth: 300,
              }}
            >
              {activeBulls.map((bull) => (
                <div
                  key={bull.id}
                  className="pixel-border-thin"
                  style={{
                    padding: '4px 8px',
                    background: 'var(--cream)',
                    fontSize: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    cursor: 'pointer',
                    transition: 'transform 0.15s',
                  }}
                  onClick={() => goToScene('rest')}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
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
                    {bull.quality === 'superior'
                      ? 'S'
                      : bull.quality === 'premium'
                        ? 'A'
                        : 'B'}
                  </div>
                  <span>{bull.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal — Orders + Warehouse */}
          <Terminal
            label="管理终端"
            position={{ bottom: 60, right: 20 }}
            onClickOrders={() => goToScene('orders')}
            onClickWarehouse={() => goToScene('warehouse')}
          />

          {/* Medical Pod */}
          <MedicalPod
            label="医疗舱"
            position={{ bottom: 60, left: 20 }}
            onClick={() => goToScene('medical')}
          />
        </div>
      </div>
    </div>
  );
}

/* ========== Scene Door ========== */
function SceneDoor({
  label,
  sub,
  position,
  color,
  glowColor,
  onClick,
  icon,
}: {
  label: string;
  sub: string;
  position: React.CSSProperties;
  color: string;
  glowColor: string;
  onClick: () => void;
  icon: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        ...position,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        zIndex: 10,
        padding: 8,
      }}
    >
      {/* Door frame */}
      <div
        style={{
          width: 72,
          height: 90,
          border: '3px solid var(--espresso)',
          background: 'var(--cream)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          transition: 'all 0.2s ease',
          boxShadow: `3px 3px 0 rgba(62,39,35,0.15)`,
        }}
        className="scene-door-frame"
      >
        <span
          style={{
            fontSize: 22,
            color,
            lineHeight: 1,
          }}
        >
          {icon}
        </span>
        <div
          style={{
            width: 32,
            height: 3,
            background: color,
            opacity: 0.6,
          }}
        />
      </div>

      {/* Label plate */}
      <div
        style={{
          padding: '3px 10px',
          background: 'var(--cream)',
          border: '2px solid var(--espresso)',
          boxShadow: '2px 2px 0 rgba(62,39,35,0.15)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 9, opacity: 0.7, whiteSpace: 'nowrap' }}>
          {sub}
        </div>
      </div>
    </button>
  );
}

/* ========== Terminal ========== */
function Terminal({
  label,
  position,
  onClickOrders,
  onClickWarehouse,
}: {
  label: string;
  position: React.CSSProperties;
  onClickOrders: () => void;
  onClickWarehouse: () => void;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        zIndex: 10,
      }}
    >
      <div
        className="pixel-border"
        style={{
          padding: '8px 10px',
          background: 'var(--cream)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          minWidth: 100,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'var(--sci-cyan)',
            textAlign: 'center',
            borderBottom: '1px solid var(--light-wood)',
            paddingBottom: 4,
          }}
        >
          {label}
        </div>
        <button
          onClick={onClickOrders}
          className="pixel-border-thin"
          style={{
            padding: '4px 8px',
            fontSize: 11,
            cursor: 'pointer',
            background: 'var(--warm-milk)',
            border: '1px solid var(--espresso)',
            textAlign: 'left',
          }}
        >
          订单中心
        </button>
        <button
          onClick={onClickWarehouse}
          className="pixel-border-thin"
          style={{
            padding: '4px 8px',
            fontSize: 11,
            cursor: 'pointer',
            background: 'var(--warm-milk)',
            border: '1px solid var(--espresso)',
            textAlign: 'left',
          }}
        >
          仓库
        </button>
      </div>
    </div>
  );
}

/* ========== Medical Pod ========== */
function MedicalPod({
  label,
  position,
  onClick,
}: {
  label: string;
  position: React.CSSProperties;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        ...position,
        zIndex: 10,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: 6,
      }}
    >
      <div
        className="pixel-border"
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--cream)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid var(--sci-cyan)',
          boxShadow: '0 0 12px rgba(127,216,210,0.3)',
          animation: 'breathe 3s ease-in-out infinite',
        }}
      >
        <span style={{ fontSize: 20, color: 'var(--sci-cyan)' }}>+</span>
      </div>
      <div
        style={{
          padding: '2px 8px',
          background: 'var(--cream)',
          border: '2px solid var(--espresso)',
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {label}
      </div>
    </button>
  );
}
