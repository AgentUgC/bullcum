import { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { showToast } from '../layout/ToastContainer';

interface Props {
  isFocused: boolean;
  onEnter: () => void;
}

export default function RestZone({ isFocused }: Props) {
  const state = useGameState();
  const [selectedBullId, setSelectedBullId] = useState<string | null>(null);

  const selectedBull = selectedBullId ? state.bulls.find(b => b.id === selectedBullId) : null;

  if (!isFocused) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
          {state.bulls.length} / 500 头存栏
        </div>
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
          {state.bulls.slice(0, 12).map(bull => (
            <div
              key={bull.id}
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background:
                  bull.quality === 'superior'
                    ? 'var(--q-superior)'
                    : bull.quality === 'premium'
                      ? 'var(--q-premium)'
                      : 'var(--q-standard)',
                opacity: bull.status === 'weak' ? 0.4 : 1,
              }}
            />
          ))}
          {state.bulls.length > 12 && (
            <div style={{ fontSize: 10, opacity: 0.5, display: 'flex', alignItems: 'center' }}>
              +{state.bulls.length - 12}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 12, height: '100%', overflow: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <h2 style={{ fontSize: 18 }}>休息棚</h2>
        <p style={{ fontSize: 11, opacity: 0.7 }}>群体休憩 · 单牛互动 · 质检管理</p>
      </div>

      <div
        className="pixel-border-thin"
        style={{
          padding: '6px 10px',
          background: 'var(--warm-milk)',
          marginBottom: 10,
          fontSize: 11,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>当前存栏: {state.bulls.length} / 500</span>
        <span>健康: {state.bulls.filter(b => b.status === 'healthy').length} | 虚弱: {state.bulls.filter(b => b.status === 'weak').length}</span>
      </div>

      {/* Bull grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 6, marginBottom: 10 }}>
        {state.bulls.map(bull => (
          <div
            key={bull.id}
            onClick={() => setSelectedBullId(bull.id)}
            className="pixel-border-thin"
            style={{
              padding: 6,
              background: selectedBullId === bull.id ? 'var(--peach)' : 'var(--cream)',
              cursor: 'pointer',
              textAlign: 'center',
              fontSize: 10,
              opacity: bull.status === 'weak' ? 0.6 : 1,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                margin: '0 auto 4px',
                background:
                  bull.quality === 'superior'
                    ? 'var(--q-superior)'
                    : bull.quality === 'premium'
                      ? 'var(--q-premium)'
                      : 'var(--q-standard)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                color: '#fff',
                fontWeight: 700,
              }}
            >
              {bull.quality === 'superior' ? 'S' : bull.quality === 'premium' ? 'A' : 'B'}
            </div>
            <div style={{ fontWeight: 700 }}>{bull.name}</div>
            <div style={{ fontSize: 9, opacity: 0.6 }}>{bull.dailyCollected}/{bull.dailyMax}</div>
          </div>
        ))}
      </div>

      {/* Single bull interaction panel */}
      {selectedBull && (
        <div
          className="pixel-border"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(250,243,232,0.95)',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3>单牛互动 · {selectedBull.name}</h3>
            <button onClick={() => setSelectedBullId(null)} className="pixel-border" style={{ padding: '4px 10px', background: 'var(--cream)', cursor: 'pointer', fontSize: 12 }}>
              返回
            </button>
          </div>

          <div style={{ display: 'flex', gap: 12, flex: 1, overflow: 'hidden' }}>
            {/* Left: bull info */}
            <div className="pixel-border-thin" style={{ width: 200, background: 'var(--cream)', padding: 12 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  margin: '0 auto 8px',
                  background:
                    selectedBull.quality === 'superior'
                      ? 'var(--q-superior)'
                      : selectedBull.quality === 'premium'
                        ? 'var(--q-premium)'
                        : 'var(--q-standard)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: 700,
                }}
              >
                {selectedBull.quality === 'superior' ? 'S' : selectedBull.quality === 'premium' ? 'A' : 'B'}
              </div>
              <div style={{ textAlign: 'center', fontWeight: 700, marginBottom: 8 }}>{selectedBull.name}</div>
              <div style={{ fontSize: 11, lineHeight: 1.8 }}>
                <div>品质: {selectedBull.quality === 'superior' ? '特级' : selectedBull.quality === 'premium' ? '优级' : '标准'}</div>
                <div>状态: {selectedBull.status === 'healthy' ? '健康' : '虚弱'}</div>
                <div>今日采集: {selectedBull.dailyCollected}/{selectedBull.dailyMax}</div>
                <div>射精模式: {selectedBull.pattern || '均匀持久型'}</div>
                <div>性格: {selectedBull.personality || '温顺'}</div>
              </div>
            </div>

            {/* Center: chat dialog */}
            <div className="pixel-border-thin" style={{ flex: 1, background: 'var(--cream)', display: 'flex', flexDirection: 'column', padding: 12 }}>
              <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 8 }}>互动记录</div>
              <div style={{ flex: 1, overflow: 'auto', fontSize: 12, lineHeight: 1.6, padding: 8, background: 'var(--warm-milk)' }}>
                <div style={{ marginBottom: 8, color: 'var(--warm-brown)' }}>
                  <span style={{ fontWeight: 700 }}>[系统]</span> 你进入了 {selectedBull.name} 的互动空间
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: 'var(--rose-gold)' }}>[{selectedBull.name}]</span> 呜...主人今天也来了吗？
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <input
                  type="text"
                  placeholder="输入对话..."
                  className="pixel-border-thin"
                  style={{ flex: 1, padding: '6px 10px', fontSize: 12, background: 'var(--warm-milk)', border: '1px solid var(--light-wood)' }}
                />
                <button
                  onClick={() => showToast('对话功能将在接入LLM后启用', 'info')}
                  className="pixel-border"
                  style={{ padding: '6px 12px', background: 'var(--peach)', cursor: 'pointer', fontSize: 12 }}
                >
                  发送
                </button>
              </div>
            </div>

            {/* Right: quick actions */}
            <div style={{ width: 140, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: '质检', desc: '触摸生殖器/睾丸评估' },
                { label: '喂食', desc: '普通/强化料/补充液' },
                { label: '接吻', desc: '亲密接吻互动' },
                { label: '全身爱抚', desc: '全身抚摸安抚' },
                { label: '安排采精', desc: '跳转至采精车间' },
              ].map(action => (
                <button
                  key={action.label}
                  onClick={() => showToast(`对 ${selectedBull.name} 执行: ${action.label}`, 'success')}
                  className="pixel-border"
                  style={{
                    padding: '8px',
                    background: 'var(--cream)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: 11,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{action.label}</div>
                  <div style={{ fontSize: 9, opacity: 0.5 }}>{action.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
