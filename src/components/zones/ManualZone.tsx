import { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';

interface Props {
  isFocused: boolean;
  onEnter: () => void;
}

const cardTypes = ['姿势', '玩法', '状态', '事件'];
const sampleResults = [
  ['跪趴俯身式', '前列腺按摩', '兴奋', '意外大量'],
  ['站立前倾式', '睾丸刺激', '平静', '节奏稳定'],
  ['仰躺抬腿式', '尿道刺激', '敏感', '多段射精'],
  ['侧卧蜷曲式', '臀肌按压', '放松', '持续流溢'],
];

export default function ManualZone({ isFocused }: Props) {
  const state = useGameState();
  const [selectedBullId, setSelectedBullId] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [results, setResults] = useState<string[]>(['?', '?', '?', '?']);
  const [animating, setAnimating] = useState(false);

  const selectedBull = selectedBullId ? state.bulls.find(b => b.id === selectedBullId) : null;

  if (!isFocused) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
          厂长体力: {300 - state.manualUsed * 5} / 300
        </div>
        <div style={{ fontSize: 11, opacity: 0.5 }}>
          今日已处理: {state.manualUsed} 次
        </div>
      </div>
    );
  }

  const handleDraw = () => {
    if (!selectedBull || animating) return;
    setAnimating(true);
    setDrawn(false);
    setResults(['?', '?', '?', '?']);
    const idx = Math.floor(Math.random() * sampleResults.length);
    setTimeout(() => {
      setResults(sampleResults[idx]);
      setDrawn(true);
      setAnimating(false);
    }, 1500);
  };

  return (
    <div style={{ padding: 16, height: '100%', overflow: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <h2 style={{ fontSize: 18 }}>人工采精室</h2>
        <p style={{ fontSize: 11, opacity: 0.7 }}>选择种牛 · 情欲抽卡 · 专属互动</p>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <div className="pixel-border-thin" style={{ flex: 1, padding: 8, background: 'var(--cream)' }}>
          <div style={{ fontSize: 10, opacity: 0.6 }}>厂长体力</div>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{300 - state.manualUsed * 5} / 300</div>
          <div style={{ width: '100%', height: 3, background: 'var(--light-wood)', marginTop: 4 }}>
            <div style={{ width: `${((300 - state.manualUsed * 5) / 300) * 100}%`, height: '100%', background: 'var(--rose-gold)', transition: 'width 0.3s' }} />
          </div>
        </div>
        <div className="pixel-border-thin" style={{ flex: 1, padding: 8, background: 'var(--cream)' }}>
          <div style={{ fontSize: 10, opacity: 0.6 }}>今日次数</div>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{state.manualUsed} / {state.manualLimit}</div>
        </div>
      </div>

      {/* Bull selector */}
      <div className="pixel-border-thin" style={{ padding: 8, background: 'var(--cream)', marginBottom: 12, maxHeight: 120, overflow: 'auto' }}>
        <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 4 }}>选择种牛</div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {state.bulls.filter(b => b.status === 'healthy').map(bull => (
            <button
              key={bull.id}
              onClick={() => setSelectedBullId(bull.id)}
              className="pixel-border-thin"
              style={{
                padding: '3px 8px',
                fontSize: 11,
                cursor: 'pointer',
                background: selectedBullId === bull.id ? 'var(--peach)' : 'var(--warm-milk)',
                border: selectedBullId === bull.id ? '2px solid var(--rose-gold)' : '1px solid var(--light-wood)',
              }}
            >
              {bull.name}
            </button>
          ))}
        </div>
      </div>

      {selectedBull && (
        <div className="pixel-border" style={{ padding: 12, background: 'var(--warm-milk)', marginBottom: 12 }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{selectedBull.name}</div>
            <div style={{ fontSize: 10, opacity: 0.6 }}>{selectedBull.quality === 'superior' ? '特级' : selectedBull.quality === 'premium' ? '优级' : '标准'} · {selectedBull.dailyCollected}/{selectedBull.dailyMax} 次</div>
          </div>

          {/* Gacha Machine */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 10 }}>
            {cardTypes.map((type, i) => (
              <div key={type} className="pixel-border-thin" style={{ padding: '8px 4px', background: 'var(--cream)', textAlign: 'center', minHeight: 70, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 9, opacity: 0.5, marginBottom: 4 }}>{type}</div>
                <div style={{
                  fontSize: animating ? 16 : 12,
                  fontWeight: 700,
                  color: drawn ? 'var(--rose-gold)' : 'var(--warm-brown)',
                  animation: animating ? 'pulse-glow 0.3s ease-in-out infinite' : 'none',
                }}>
                  {results[i]}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleDraw}
            disabled={animating}
            className="pixel-border"
            style={{
              width: '100%',
              padding: '8px',
              background: animating ? 'var(--light-wood)' : 'var(--rose-gold)',
              color: '#fff',
              cursor: animating ? 'not-allowed' : 'pointer',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
            }}
          >
            {animating ? '抽卡中...' : drawn ? '再次抽卡' : '开始抽卡'}
          </button>
        </div>
      )}
    </div>
  );
}
