import { useNavigate } from 'react-router-dom';
import { useGameState } from '../../hooks/useGameState';

export default function PastureView() {
  const state = useGameState();
  const navigate = useNavigate();

  const activeBulls = state.bulls.filter(b => b.status === 'healthy').slice(0, 10);
  const todayOutput = state.inventory.semenStandard + state.inventory.semenPremium + state.inventory.semenSuperior;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'auto' }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #FFF8F0 0%, #FAF3E8 40%, #E6CCB2 100%)',
        zIndex: 0,
      }} />

      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            bottom: -10,
            width: 4 + Math.random() * 4,
            height: 4 + Math.random() * 4,
            borderRadius: '50%',
            background: Math.random() > 0.5 ? 'var(--soft-pink)' : 'var(--peach)',
            opacity: 0.4,
            animation: `float-up ${8 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 24, animation: 'slide-in-up 0.5s ease' }}>
          <h2 style={{ fontSize: 28, marginBottom: 4 }}>人造牧场大厅</h2>
          <p style={{ fontSize: 13, color: 'var(--warm-brown)', opacity: 0.8 }}>
            奶白色与浅木色的温馨空间，种牛在此休憩与等候
          </p>
        </div>

        {/* Dashboard Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
          <DashCard label="当前存栏" value={`${state.bulls.length} / ${state.factoryLevel * 20}`} icon="☾" color="var(--warm-gold)" />
          <DashCard label="今日总产出" value={`${todayOutput} ml`} icon="◆" color="var(--rose-gold)" />
          <DashCard label="待处理订单" value={`${state.orders.length} 份`} icon="☰" color="var(--amber)" />
          <DashCard label="工厂等级" value={`Lv.${state.factoryLevel}`} icon="★" color="var(--sci-cyan)" />
        </div>

        {/* Active Bulls on Pasture */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 12, fontSize: 16 }}>牧场活跃种牛</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {activeBulls.map(bull => (
              <button
                key={bull.id}
                onClick={() => { navigate('/rest'); }}
                className="pixel-border-thin"
                style={{
                  padding: '10px 14px',
                  background: 'var(--cream)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(255,181,167,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: bull.quality === 'superior' ? 'var(--q-superior)' : bull.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: '#fff',
                }}
                >
                  {bull.quality === 'superior' ? 'S' : bull.quality === 'premium' ? 'A' : 'B'}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{bull.name}</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>{bull.personalityDesc.slice(0, 10)}...</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* HolstaurM Display + Portals */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {/* HolstaurM */}
          <div
            className="pixel-border"
            style={{
              width: 220,
              padding: 12,
              background: 'var(--cream)',
              textAlign: 'center',
              animation: 'breathe 4s ease-in-out infinite',
            }}
          >
            <img
              src="/HolstaurM.png"
              alt="灵感来源"
              style={{ width: '100%', imageRendering: 'pixelated', display: 'block' }}
            />
            <div style={{ fontSize: 11, marginTop: 6, color: 'var(--warm-brown)', opacity: 0.8 }}>
              灵感来源 · 种牛世界
            </div>
          </div>

          {/* Portals */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, minWidth: 280 }}>
            <PortalButton label="采精车间" sub="配置泵位 · 启动采集" path="/collection" color="var(--sci-cyan)" onClick={() => navigate('/collection')} />
            <PortalButton label="人工采精室" sub="亲密互动 · 情欲抽卡" path="/manual" color="var(--rose-gold)" onClick={() => navigate('/manual')} />
            <PortalButton label="休息棚" sub={`${state.bulls.length} 头种牛 · 单牛互动`} path="/rest" color="var(--warm-gold)" onClick={() => navigate('/rest')} />
            <PortalButton label="培育室" sub="新生种牛 · 基因融合" path="/breeding" color="var(--peach)" onClick={() => navigate('/breeding')} />
          </div>
        </div>

        {/* Core Preview */}
        <div style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 12, fontSize: 16 }}>采精核心区概览</h3>
          <div style={{ display: 'flex', gap: 10 }}>
            {state.cores.map(core => (
              <div
                key={core.type}
                className="pixel-border-thin"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  background: core.unlocked ? 'var(--cream)' : 'rgba(230,204,178,0.4)',
                  opacity: core.unlocked ? 1 : 0.6,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700 }}>
                  {core.type === 'standard' ? '标准核心' : core.type === 'premium' ? '优级核心' : core.type === 'superior' ? '特级核心' : '终极核心'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--warm-brown)' }}>
                  {core.unlocked ? `Lv.${core.level} · ${core.status === 'normal' ? '正常' : '降效'}` : '未解锁'}
                </div>
                {core.unlocked && (
                  <div style={{
                    width: '100%', height: 4, background: 'var(--light-wood)', marginTop: 2,
                  }}
                  >
                    <div style={{
                      width: `${Math.min(100, (core.dailyProcessed / (core.level * 20)) * 100)}%`,
                      height: '100%',
                      background: core.type === 'ultimate' ? 'var(--q-superior)' : core.type === 'superior' ? 'var(--q-superior)' : core.type === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div className="pixel-border" style={{ padding: 12, background: 'var(--cream)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 20, color }}>{icon}</span>
      <div>
        <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 2 }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700 }}>{value}</div>
      </div>
    </div>
  );
}

function PortalButton({ label, sub, color, onClick }: { label: string; sub: string; color: string; path: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="pixel-border"
      style={{
        padding: '14px 16px',
        background: 'var(--cream)',
        cursor: 'pointer',
        textAlign: 'left',
        borderLeft: `4px solid ${color}`,
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.01)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)'; }}
    >
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 11, opacity: 0.7 }}>{sub}</div>
    </button>
  );
}
