import { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import type { SceneId } from '../../App';

interface Props { goToScene: (s: SceneId) => void; }

export default function RestView({ goToScene }: Props) {
  const state = useGameState();
  const [viewMode, setViewMode] = useState<'scene' | 'grid'>('scene');
  const [selectedBullId, setSelectedBullId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'standard' | 'premium' | 'superior'>('all');
  const [chatMessages, setChatMessages] = useState<{ sender: 'player' | 'bull'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');

  const filteredBulls = state.bulls.filter(b => filter === 'all' || b.quality === filter);
  const selectedBull = selectedBullId ? state.bulls.find(b => b.id === selectedBullId) : null;

  const sendAction = (action: string) => {
    if (!selectedBull) return;
    setChatMessages(prev => [...prev, { sender: 'player', text: action }]);
    setTimeout(() => {
      const responses: Record<string, string> = {
        '质检': `${selectedBull.name} 被你的手掌触碰时微微颤抖，前液已从龟头渗出少许...`,
        '喂食': `${selectedBull.name} 温顺地低下头，咀嚼着你递来的牧草，牛耳轻轻抖动。`,
        '接吻': `${selectedBull.name} 的嘴唇温热而柔软，牛源基因使他的唾液带有淡淡的甜腥...`,
        '全身爱抚': `${selectedBull.name} 在你的抚摸下发出低沉的鼻息，胸肌在掌下微微绷紧...`,
      };
      setChatMessages(prev => [...prev, { sender: 'bull', text: responses[action] || `${selectedBull.name} 回应了你的动作...` }]);
    }, 400);
  };

  const sendChat = () => {
    if (!chatInput.trim() || !selectedBull) return;
    setChatMessages(prev => [...prev, { sender: 'player', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'bull', text: `${selectedBull.name} 望着你，牛耳微微颤动：「...嗯，厂长...」` }]);
    }, 600);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'auto' }}>
      <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 22 }}>休息棚</h2>
            <p style={{ fontSize: 12, opacity: 0.7 }}>种牛公用休息恢复场所，与每一头种牛进行单独互动</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setViewMode('scene')} className="pixel-border" style={{ padding: '6px 12px', background: viewMode === 'scene' ? 'var(--peach)' : 'var(--cream)', cursor: 'pointer', fontSize: 12 }}>场景视图</button>
            <button onClick={() => setViewMode('grid')} className="pixel-border" style={{ padding: '6px 12px', background: viewMode === 'grid' ? 'var(--peach)' : 'var(--cream)', cursor: 'pointer', fontSize: 12 }}>管理网格</button>
            <button onClick={() => goToScene('pasture')} className="back-to-hall">← 返回大厅</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['all', 'standard', 'premium', 'superior'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className="pixel-border-thin" style={{ padding: '4px 10px', fontSize: 11, cursor: 'pointer', background: filter === f ? 'var(--peach)' : 'var(--cream)' }}>
                {f === 'all' ? '全部' : f === 'standard' ? '标准' : f === 'premium' ? '优级' : '特级'}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>当前存栏: {state.bulls.length} / {state.factoryLevel * 20}</div>
        </div>

        {viewMode === 'scene' && (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(['standard', 'premium', 'superior'] as const).map(zone => {
              const zoneBulls = filteredBulls.filter(b => b.quality === zone);
              return (
                <div key={zone} className="pixel-border" style={{ flex: 1, minWidth: 200, padding: 12, background: 'var(--cream)' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: zone === 'superior' ? 'var(--q-superior)' : zone === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)' }}>
                    {zone === 'superior' ? '特级区' : zone === 'premium' ? '优级区' : '标准区'} ({zoneBulls.length})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {zoneBulls.map(bull => (
                      <button key={bull.id} onClick={() => { setSelectedBullId(bull.id); setChatMessages([]); }} className="pixel-border-thin" style={{ width: 44, height: 44, borderRadius: '50%', background: zone === 'superior' ? 'var(--q-superior)' : zone === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)', color: '#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', border: selectedBullId === bull.id ? '3px solid var(--espresso)' : '2px solid transparent', transition: 'transform 0.15s' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}>
                        {bull.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === 'grid' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
            {filteredBulls.map(bull => (
              <button key={bull.id} onClick={() => { setSelectedBullId(bull.id); setChatMessages([]); }} className="pixel-border" style={{ padding: 10, background: 'var(--cream)', cursor: 'pointer', textAlign: 'left', borderLeft: `4px solid ${bull.quality === 'superior' ? 'var(--q-superior)' : bull.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)'}` }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{bull.name}</div>
                <div style={{ fontSize: 10, opacity: 0.7 }}>{bull.bodyType} · {bull.personality === 'steady' ? '稳重' : bull.personality === 'direct' ? '直接' : bull.personality === 'energetic' ? '活力' : '沉默'}</div>
                <div style={{ fontSize: 10, marginTop: 4 }}>{bull.dailyCollected}/{bull.dailyMax} 次 · {bull.status === 'healthy' ? '健康' : '虚弱'}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Single Bull Interaction Room */}
      {selectedBull && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,248,240,0.96)', zIndex: 200, display: 'flex', flexDirection: 'column', animation: 'fade-in 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '2px solid var(--light-wood)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: selectedBull.quality === 'superior' ? 'var(--q-superior)' : selectedBull.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
                {selectedBull.quality === 'superior' ? 'S' : selectedBull.quality === 'premium' ? 'A' : 'B'}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{selectedBull.name}</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>{selectedBull.height}cm · {selectedBull.bodyType} · {selectedBull.personality === 'steady' ? '稳重配合型' : selectedBull.personality === 'direct' ? '直接回应型' : selectedBull.personality === 'energetic' ? '活力热情型' : '沉默强烈型'}</div>
              </div>
            </div>
            <button onClick={() => setSelectedBullId(null)} className="pixel-border" style={{ padding: '6px 14px', background: 'var(--cream)', cursor: 'pointer', fontSize: 12 }}>返回休息棚</button>
          </div>

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div style={{ width: '35%', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--light-wood)' }}>
              <div className="pixel-border" style={{ width: 180, height: 180, borderRadius: '50%', background: selectedBull.quality === 'superior' ? 'rgba(201,162,39,0.15)' : selectedBull.quality === 'premium' ? 'rgba(107,142,206,0.15)' : 'rgba(139,154,124,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontFamily: 'var(--font-display)', animation: 'breathe 4s ease-in-out infinite' }}>
                {selectedBull.quality === 'superior' ? 'S' : selectedBull.quality === 'premium' ? 'A' : 'B'}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, textAlign: 'center', maxWidth: 280, lineHeight: 1.7 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{selectedBull.name}</div>
                <div style={{ opacity: 0.8 }}>{selectedBull.bodyDesc}</div>
                <div style={{ marginTop: 8, opacity: 0.7 }}>{selectedBull.faceDesc}</div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16 }}>
              <div style={{ flex: 1, overflow: 'auto', padding: '0 8px', marginBottom: 8 }}>
                {chatMessages.length === 0 && (
                  <div style={{ textAlign: 'center', opacity: 0.5, marginTop: 40, fontSize: 13 }}>
                    与 {selectedBull.name} 的互动记录将显示在这里...<br />
                    使用下方快捷按钮或直接输入文字开始互动
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{ marginBottom: 8, display: 'flex', justifyContent: msg.sender === 'player' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '70%', padding: '8px 12px', fontSize: 12, lineHeight: 1.6, background: msg.sender === 'player' ? 'var(--peach)' : 'var(--warm-milk)', border: `2px solid ${msg.sender === 'player' ? 'var(--rose-gold)' : 'var(--light-wood)'}`, borderRadius: msg.sender === 'player' ? '12px 12px 0 12px' : '12px 12px 12px 0', animation: 'slide-in-up 0.2s ease' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                {['质检', '喂食', '接吻', '全身爱抚'].map(action => (
                  <button key={action} onClick={() => sendAction(action)} className="pixel-border" style={{ padding: '6px 12px', background: 'var(--soft-pink)', cursor: 'pointer', fontSize: 12, flex: 1 }}>{action}</button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 6 }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} placeholder={`对 ${selectedBull.name} 说话...`} style={{ flex: 1, padding: '8px 12px', border: '2px solid var(--espresso)', background: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }} />
                <button onClick={sendChat} className="pixel-border" style={{ padding: '8px 16px', background: 'var(--amber)', color: '#fff', cursor: 'pointer', fontSize: 13 }}>发送</button>
              </div>
            </div>

            <div style={{ width: '22%', padding: 16, borderLeft: '1px solid var(--light-wood)', background: 'rgba(250,243,232,0.5)' }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>实时数据</div>
              <DataRow label="今日采集" value={`${selectedBull.dailyCollected} / ${selectedBull.dailyMax}`} />
              <DataRow label="状态" value={selectedBull.status === 'healthy' ? '健康' : '虚弱'} />
              <DataRow label="服用补充液" value={selectedBull.supplementUsed ? '是' : '否'} />
              <DataRow label="强化料" value={`${selectedBull.supplementCount} 份`} />

              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--light-wood)' }}>
                <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>身体数据</div>
                <DataRow label="身高" value={`${selectedBull.height}cm`} />
                <DataRow label="体重" value={`${selectedBull.weight}kg`} />
                <DataRow label="阴茎长度" value={`${selectedBull.penisLength}cm`} />
                <DataRow label="周长" value={`${selectedBull.penisGirth}cm`} />
                <DataRow label="睾丸体积" value={`${selectedBull.testicleVolume}ml`} />
                <DataRow label="射精模式" value={selectedBull.ejaculationMode === 'burst' ? '爆发猛射' : selectedBull.ejaculationMode === 'uniform' ? '均匀持久' : selectedBull.ejaculationMode === 'escalating' ? '后劲增强' : '溢流涌出'} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '4px 0', borderBottom: '1px dashed var(--light-wood)' }}>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}
