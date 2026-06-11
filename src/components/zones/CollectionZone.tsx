import { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { showToast } from '../layout/ToastContainer';

interface Props {
  isFocused: boolean;
  onEnter: () => void;
}

export default function CollectionZone({ isFocused }: Props) {
  const state = useGameState();
  const [configMode, setConfigMode] = useState(false);
  const [inspectBullId, setInspectBullId] = useState<string | null>(null);

  const availableBulls = state.bulls.filter(b => b.status === 'healthy' && !state.pumps.some(p => p.bullId === b.id));

  if (!isFocused) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
          {state.pumps.filter(p => p.bullId).length} / {state.pumps.length} 泵位运行中
        </div>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
          {state.cores.filter(c => c.unlocked).map(core => (
            <div key={core.type} style={{ fontSize: 10, padding: '2px 6px', background: 'var(--warm-milk)', border: '1px solid var(--light-wood)' }}>
              {core.type === 'standard' ? '标准' : core.type === 'premium' ? '优级' : core.type === 'superior' ? '特级' : '终极'}:
              {core.dailyProcessed}/{core.level * 20}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <h2 style={{ fontSize: 18 }}>采精车间</h2>
          <p style={{ fontSize: 11, opacity: 0.7 }}>为核心配置种牛，启动自动化采精流程</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setConfigMode(!configMode)} className="pixel-border" style={{ padding: '6px 10px', background: configMode ? 'var(--peach)' : 'var(--cream)', cursor: 'pointer', fontSize: 12 }}>
            {configMode ? '退出配置' : '批量配置'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
        {state.pumps.map(pump => {
          const bull = pump.bullId ? state.bulls.find(b => b.id === pump.bullId) : null;
          return (
            <div key={`${pump.coreType}-${pump.pumpIndex}`} className="pixel-border-thin" style={{ padding: 8, background: pump.status === 'running' ? 'rgba(255,181,167,0.15)' : pump.status === 'done' ? 'rgba(109,160,109,0.15)' : 'var(--cream)', borderLeft: `3px solid ${pump.coreType === 'ultimate' ? 'var(--q-superior)' : pump.coreType === 'superior' ? 'var(--q-superior)' : pump.coreType === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)'}`, cursor: 'pointer', position: 'relative' }} onClick={() => { if (bull) setInspectBullId(bull.id); }}>
              <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 2 }}>{pump.coreType === 'standard' ? '标准' : pump.coreType === 'premium' ? '优级' : pump.coreType === 'superior' ? '特级' : '终极'} · 泵 {pump.pumpIndex + 1}</div>
              {bull ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: bull.quality === 'superior' ? 'var(--q-superior)' : bull.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 700 }}>
                      {bull.quality === 'superior' ? 'S' : bull.quality === 'premium' ? 'A' : 'B'}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700 }}>{bull.name}</span>
                  </div>
                  <div style={{ fontSize: 9, opacity: 0.7 }}>{bull.dailyCollected} / {bull.dailyMax} 次</div>
                  <div style={{ width: '100%', height: 2, background: 'var(--light-wood)', marginTop: 3 }}><div style={{ width: `${(bull.dailyCollected / bull.dailyMax) * 100}%`, height: '100%', background: 'var(--rose-gold)', transition: 'width 0.3s' }} /></div>
                </>
              ) : (
                <div style={{ fontSize: 10, color: 'var(--warm-brown)', opacity: 0.5, padding: '6px 0', textAlign: 'center' }}>空闲</div>
              )}
              <div style={{ position: 'absolute', top: 4, right: 4, width: 5, height: 5, borderRadius: '50%', background: pump.status === 'running' ? 'var(--rose-gold)' : pump.status === 'done' ? 'var(--success)' : 'var(--light-wood)', animation: pump.status === 'running' ? 'breathe 1.5s ease-in-out infinite' : 'none' }} />
            </div>
          );
        })}
      </div>

      {configMode && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,248,240,0.95)', zIndex: 200, display: 'flex', flexDirection: 'column', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3>批量配置器</h3>
            <button onClick={() => setConfigMode(false)} className="pixel-border" style={{ padding: '4px 10px', background: 'var(--cream)', cursor: 'pointer', fontSize: 12 }}>关闭</button>
          </div>
          <div style={{ display: 'flex', gap: 12, flex: 1, overflow: 'hidden' }}>
            <div className="pixel-border-thin" style={{ width: 280, background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--light-wood)', fontWeight: 700, fontSize: 12 }}>可分配种牛 ({availableBulls.length})</div>
              <div style={{ flex: 1, overflow: 'auto', padding: 6 }}>
                {availableBulls.map(bull => (
                  <div key={bull.id} className="pixel-border-thin" style={{ padding: 6, marginBottom: 4, background: 'var(--warm-milk)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: bull.quality === 'superior' ? 'var(--q-superior)' : bull.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)', fontSize: 7, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {bull.quality === 'superior' ? 'S' : bull.quality === 'premium' ? 'A' : 'B'}
                    </div>
                    <span>{bull.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pixel-border-thin" style={{ flex: 1, background: 'var(--cream)', padding: 10, overflow: 'auto' }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>核心-泵位矩阵</div>
              {state.cores.filter(c => c.unlocked).map(core => (
                <div key={core.type} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, marginBottom: 4, opacity: 0.8 }}>{core.type === 'standard' ? '标准核心' : core.type === 'premium' ? '优级核心' : core.type === 'superior' ? '特级核心' : '终极核心'} Lv.{core.level}</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {Array.from({ length: core.level }).map((_, i) => {
                      const pump = state.pumps.find(p => p.coreType === core.type && p.pumpIndex === i);
                      const bull = pump?.bullId ? state.bulls.find(b => b.id === pump.bullId) : null;
                      return (
                        <div key={i} className="pixel-border-thin" style={{ width: 70, padding: '4px 6px', background: bull ? 'rgba(255,181,167,0.1)' : 'var(--warm-milk)', textAlign: 'center', fontSize: 10 }}>
                          <div style={{ fontSize: 8, opacity: 0.5, marginBottom: 1 }}>泵 {i + 1}</div>
                          <div style={{ fontWeight: 700, fontSize: 10 }}>{bull ? bull.name : '空'}</div>
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
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 340, background: 'rgba(250,243,232,0.97)', zIndex: 150, borderLeft: '2px solid var(--espresso)', boxShadow: '-4px 0 16px rgba(0,0,0,0.1)', padding: 16, overflow: 'auto', animation: 'slide-in-right 0.3s ease' }}>
          {(() => {
            const bull = state.bulls.find(b => b.id === inspectBullId);
            if (!bull) return null;
            return (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 16 }}>巡视面板 · {bull.name}</h3>
                  <button onClick={() => setInspectBullId(null)} className="pixel-border" style={{ padding: '3px 8px', background: 'var(--cream)', cursor: 'pointer', fontSize: 11 }}>关闭</button>
                </div>
                <div className="pixel-border-thin" style={{ padding: 10, background: 'var(--cream)', marginBottom: 10 }}>
                  <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 3 }}>实时数据</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: 11 }}>
                    <div>姿势: 站立前倾式</div>
                    <div>已射精: {bull.dailyCollected} 次</div>
                    <div>品质: {bull.quality === 'superior' ? '特级' : bull.quality === 'premium' ? '优级' : '标准'}</div>
                    <div>状态: {bull.status === 'healthy' ? '健康' : '虚弱'}</div>
                  </div>
                </div>
                <div className="pixel-border-thin" style={{ padding: 10, background: 'var(--cream)', marginBottom: 10, minHeight: 100 }}>
                  <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 3 }}>互动对话</div>
                  <div style={{ fontSize: 11, color: 'var(--warm-brown)', lineHeight: 1.5 }}>
                    [AI] {bull.name} 被固定在跪趴俯身式，透明泵管内已能看到前液分泌...
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {['鼓励', '调整姿势', '质检确认', '亲密触摸'].map(action => (
                    <button key={action} onClick={() => showToast(`对 ${bull.name} 执行: ${action}`, 'success')} className="pixel-border" style={{ padding: '5px 10px', background: 'var(--peach)', cursor: 'pointer', fontSize: 11, flex: 1 }}>{action}</button>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
