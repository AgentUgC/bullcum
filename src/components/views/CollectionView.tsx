import { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { showToast } from '../layout/ToastContainer';
import type { SceneId } from '../../App';

interface Props { goToScene: (s: SceneId) => void; }

export default function CollectionView({ goToScene }: Props) {
  const state = useGameState();
  const [configMode, setConfigMode] = useState(false);
  const [inspectBullId, setInspectBullId] = useState<string | null>(null);
  const [tourActive, setTourActive] = useState(false);

  const availableBulls = state.bulls.filter(b => b.status === 'healthy' && !state.pumps.some(p => p.bullId === b.id));

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'auto', background: 'linear-gradient(90deg, #FFF8F0 0%, #FAF3E8 50%, #E6CCB2 100%)' }}>
      <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
        {/* Header with Back */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 22 }}>采精车间</h2>
            <p style={{ fontSize: 12, opacity: 0.7 }}>为核心配置种牛，启动自动化采精流程</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setConfigMode(!configMode)} className="pixel-border" style={{ padding: '8px 14px', background: configMode ? 'var(--peach)' : 'var(--cream)', cursor: 'pointer', fontSize: 13 }}>
              {configMode ? '退出配置' : '批量配置'}
            </button>
            <button onClick={() => { setTourActive(true); showToast('开始全景车间巡回', 'info'); setTimeout(() => setTourActive(false), 5000); }} className="pixel-border" style={{ padding: '8px 14px', background: 'var(--cream)', cursor: 'pointer', fontSize: 13 }}>
              全景巡回
            </button>
            <button onClick={() => goToScene('pasture')} className="back-to-hall">← 返回大厅</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {state.cores.filter(c => c.unlocked).map(core => (
            <div key={core.type} className="pixel-border-thin" style={{ flex: 1, padding: '8px 12px', background: 'var(--cream)' }}>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{core.type === 'standard' ? '标准' : core.type === 'premium' ? '优级' : core.type === 'superior' ? '特级' : '终极'}核心</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>{core.dailyProcessed} / {core.type === 'ultimate' ? '∞' : core.level * 20}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {state.pumps.map(pump => {
            const bull = pump.bullId ? state.bulls.find(b => b.id === pump.bullId) : null;
            return (
              <div key={`${pump.coreType}-${pump.pumpIndex}`} className="pixel-border-thin" style={{ padding: 10, background: pump.status === 'running' ? 'rgba(255,181,167,0.15)' : pump.status === 'done' ? 'rgba(109,160,109,0.15)' : 'var(--cream)', borderLeft: `3px solid ${pump.coreType === 'ultimate' ? 'var(--q-superior)' : pump.coreType === 'superior' ? 'var(--q-superior)' : pump.coreType === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)'}`, cursor: 'pointer', position: 'relative' }} onClick={() => { if (bull) setInspectBullId(bull.id); }}>
                <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 4 }}>{pump.coreType === 'standard' ? '标准' : pump.coreType === 'premium' ? '优级' : pump.coreType === 'superior' ? '特级' : '终极'} · 泵 {pump.pumpIndex + 1}</div>
                {bull ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: bull.quality === 'superior' ? 'var(--q-superior)' : bull.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>
                        {bull.quality === 'superior' ? 'S' : bull.quality === 'premium' ? 'A' : 'B'}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{bull.name}</span>
                    </div>
                    <div style={{ fontSize: 10, opacity: 0.7 }}>{bull.dailyCollected} / {bull.dailyMax} 次</div>
                    <div style={{ width: '100%', height: 3, background: 'var(--light-wood)', marginTop: 4 }}><div style={{ width: `${(bull.dailyCollected / bull.dailyMax) * 100}%`, height: '100%', background: 'var(--rose-gold)', transition: 'width 0.3s' }} /></div>
                  </>
                ) : (
                  <div style={{ fontSize: 11, color: 'var(--warm-brown)', opacity: 0.5, padding: '8px 0', textAlign: 'center' }}>空闲</div>
                )}
                <div style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, borderRadius: '50%', background: pump.status === 'running' ? 'var(--rose-gold)' : pump.status === 'done' ? 'var(--success)' : 'var(--light-wood)', animation: pump.status === 'running' ? 'breathe 1.5s ease-in-out infinite' : 'none' }} />
              </div>
            );
          })}
        </div>

        {configMode && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,248,240,0.92)', zIndex: 200, display: 'flex', flexDirection: 'column', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3>批量配置器</h3>
              <button onClick={() => setConfigMode(false)} className="pixel-border" style={{ padding: '6px 12px', background: 'var(--cream)', cursor: 'pointer' }}>关闭</button>
            </div>
            <div style={{ display: 'flex', gap: 16, flex: 1, overflow: 'hidden' }}>
              <div className="pixel-border-thin" style={{ width: 320, background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--light-wood)', fontWeight: 700, fontSize: 13 }}>可分配种牛 ({availableBulls.length})</div>
                <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
                  {availableBulls.map(bull => (
                    <div key={bull.id} className="pixel-border-thin" style={{ padding: 8, marginBottom: 6, background: 'var(--warm-milk)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: bull.quality === 'superior' ? 'var(--q-superior)' : bull.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)', fontSize: 8, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                        {bull.quality === 'superior' ? 'S' : bull.quality === 'premium' ? 'A' : 'B'}
                      </div>
                      <span style={{ fontSize: 12 }}>{bull.name}</span>
                      <span style={{ fontSize: 10, opacity: 0.6, marginLeft: 'auto' }}>{bull.dailyCollected}/{bull.dailyMax}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pixel-border-thin" style={{ flex: 1, background: 'var(--cream)', padding: 12, overflow: 'auto' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>核心-泵位矩阵</div>
                {state.cores.filter(c => c.unlocked).map(core => (
                  <div key={core.type} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, marginBottom: 6, opacity: 0.8 }}>{core.type === 'standard' ? '标准核心' : core.type === 'premium' ? '优级核心' : core.type === 'superior' ? '特级核心' : '终极核心'} Lv.{core.level}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {Array.from({ length: core.level }).map((_, i) => {
                        const pump = state.pumps.find(p => p.coreType === core.type && p.pumpIndex === i);
                        const bull = pump?.bullId ? state.bulls.find(b => b.id === pump.bullId) : null;
                        return (
                          <div key={i} className="pixel-border-thin" style={{ width: 80, padding: '6px 8px', background: bull ? 'rgba(255,181,167,0.1)' : 'var(--warm-milk)', textAlign: 'center', fontSize: 11 }}>
                            <div style={{ fontSize: 9, opacity: 0.5, marginBottom: 2 }}>泵 {i + 1}</div>
                            <div style={{ fontWeight: 700, fontSize: 11 }}>{bull ? bull.name : '空'}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {inspectBullId && (
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 380, background: 'rgba(250,243,232,0.97)', zIndex: 150, borderLeft: '2px solid var(--espresso)', boxShadow: '-4px 0 16px rgba(0,0,0,0.1)', padding: 20, overflow: 'auto', animation: 'slide-in-right 0.3s ease' }}>
            {(() => {
              const bull = state.bulls.find(b => b.id === inspectBullId);
              if (!bull) return null;
              return (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3>巡视面板 · {bull.name}</h3>
                    <button onClick={() => setInspectBullId(null)} className="pixel-border" style={{ padding: '4px 10px', background: 'var(--cream)', cursor: 'pointer' }}>关闭</button>
                  </div>
                  <div className="pixel-border-thin" style={{ padding: 12, background: 'var(--cream)', marginBottom: 12 }}>
                    <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>实时数据</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 12 }}>
                      <div>姿势: 站立前倾式</div>
                      <div>已射精: {bull.dailyCollected} 次</div>
                      <div>品质: {bull.quality === 'superior' ? '特级' : bull.quality === 'premium' ? '优级' : '标准'}</div>
                      <div>状态: {bull.status === 'healthy' ? '健康' : '虚弱'}</div>
                    </div>
                  </div>
                  <div className="pixel-border-thin" style={{ padding: 12, background: 'var(--cream)', marginBottom: 12, minHeight: 120 }}>
                    <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>互动对话</div>
                    <div style={{ fontSize: 12, color: 'var(--warm-brown)', lineHeight: 1.6 }}>
                      [AI] {bull.name} 被固定在跪趴俯身式，透明泵管内已能看到前液分泌。牛尾因快感而僵直绷紧绷...
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {['鼓励', '调整姿势', '质检确认', '亲密触摸'].map(action => (
                      <button key={action} onClick={() => showToast(`对 ${bull.name} 执行: ${action}`, 'success')} className="pixel-border" style={{ padding: '6px 12px', background: 'var(--peach)', cursor: 'pointer', fontSize: 12, flex: 1 }}>{action}</button>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {tourActive && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(62,39,35,0.6)', zIndex: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pixel-border" style={{ background: 'var(--cream)', padding: '24px 32px', textAlign: 'center', maxWidth: 400 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 12 }}>车间巡回中...</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--warm-brown)', marginBottom: 16 }}>
                厂长缓步穿过产精车间，空气中弥漫着淡薄牧草清香与雄性荷尔蒙混合的气息。标准核心的白色呼吸灯带有节奏地明灭，第一台泵位上的 B001 正处于均匀持久型射精的第 6 发，透明泵管内的精液如缎带状稳定流出...
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button onClick={() => setTourActive(false)} className="pixel-border" style={{ padding: '6px 14px', background: 'var(--cream)', cursor: 'pointer' }}>跳过</button>
                <button onClick={() => setTourActive(false)} className="pixel-border" style={{ padding: '6px 14px', background: 'var(--amber)', color: '#fff', cursor: 'pointer' }}>介入互动</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
