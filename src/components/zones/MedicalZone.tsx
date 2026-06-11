import { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';

interface Props {
  isFocused: boolean;
  onEnter: () => void;
}

export default function MedicalZone({ isFocused }: Props) {
  const state = useGameState();
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const queue = state.bulls.filter(b => b.status === 'weak').slice(0, 5);

  if (!isFocused) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
          医疗室
        </div>
        <div style={{ fontSize: 11, opacity: 0.5 }}>
          {queue.length} 头待扫描
        </div>
      </div>
    );
  }

  const startScan = () => {
    setScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return p + 4;
      });
    }, 100);
  };

  return (
    <div style={{ padding: 12, height: '100%', overflow: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <h2 style={{ fontSize: 18 }}>医疗室</h2>
        <p style={{ fontSize: 11, opacity: 0.7 }}>健康扫描 · 数据录入</p>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        {/* Scanner visual */}
        <div className="pixel-border" style={{ flex: 1, padding: 16, background: 'var(--warm-milk)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 160 }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '3px solid var(--sci-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: scanning ? '0 0 20px rgba(127,216,210,0.4)' : 'none',
            transition: 'box-shadow 0.3s',
          }}>
            <span style={{ fontSize: 28, color: 'var(--sci-cyan)' }}>+</span>
            {scanning && (
              <div style={{
                position: 'absolute',
                inset: -3,
                borderRadius: '50%',
                border: '2px solid var(--sci-cyan)',
                animation: 'breathe 1s ease-in-out infinite',
              }} />
            )}
          </div>

          {scanning && (
            <div style={{ marginTop: 12, width: '100%' }}>
              <div style={{ width: '100%', height: 4, background: 'var(--light-wood)' }}>
                <div style={{ width: `${scanProgress}%`, height: '100%', background: 'var(--sci-cyan)', transition: 'width 0.1s' }} />
              </div>
              <div style={{ fontSize: 10, textAlign: 'center', marginTop: 4 }}>
                扫描中... {scanProgress}%
              </div>
            </div>
          )}

          {!scanning && (
            <button onClick={startScan} className="pixel-border" style={{ marginTop: 12, padding: '6px 14px', background: 'var(--sci-cyan)', color: '#fff', cursor: 'pointer', fontSize: 12 }}>
              开始扫描
            </button>
          )}
        </div>

        {/* Queue */}
        <div className="pixel-border-thin" style={{ width: 180, background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '6px 10px', borderBottom: '1px solid var(--light-wood)', fontWeight: 700, fontSize: 12 }}>
            待扫描队列 ({queue.length})
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: 6 }}>
            {queue.map(bull => (
              <div key={bull.id} className="pixel-border-thin" style={{ padding: 6, marginBottom: 4, background: 'var(--warm-milk)', fontSize: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: bull.quality === 'superior' ? 'var(--q-superior)' : bull.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)',
                }} />
                <span>{bull.name}</span>
              </div>
            ))}
            {queue.length === 0 && (
              <div style={{ fontSize: 10, opacity: 0.5, textAlign: 'center', padding: 10 }}>
                暂无待扫描种牛
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
