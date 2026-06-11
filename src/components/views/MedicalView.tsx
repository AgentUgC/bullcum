import { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { showToast } from '../layout/ToastContainer';

export default function MedicalView() {
  const state = useGameState();
  const [scanning, setScanning] = useState(false);
  const [scanBullId, setScanBullId] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  const queue = state.bulls.filter(b => b.status === 'weak' || b.birthDay === state.day);

  const startScan = (bullId: string) => {
    setScanBullId(bullId);
    setScanning(true);
    setScanProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setScanProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setScanning(false);
        showToast('扫描完成，数据已录入档案', 'success');
      }
    }, 80);
  };

  const scannedBull = scanBullId ? state.bulls.find(b => b.id === scanBullId) : null;

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto', height: '100%', overflow: 'auto' }}>
      <h2 style={{ fontSize: 22, marginBottom: 4 }}>医疗室</h2>
      <p style={{ fontSize: 12, opacity: 0.7, marginBottom: 16 }}>新生种牛身体数据测定，日常医疗护理</p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Scanner */}
        <div className="pixel-border" style={{ flex: 1, minWidth: 280, padding: 20, background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
          <div style={{
            width: 200, height: 200, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Scan rings */}
            <div style={{
              position: 'absolute', inset: 0,
              border: '2px solid var(--sci-cyan)',
              borderRadius: '50%',
              animation: scanning ? 'spin 3s linear infinite' : 'none',
              opacity: 0.5,
            }} />
            <div style={{
              position: 'absolute', inset: 20,
              border: '2px dashed var(--sci-cyan)',
              borderRadius: '50%',
              animation: scanning ? 'spin 5s linear infinite reverse' : 'none',
              opacity: 0.3,
            }} />

            {/* Bull silhouette */}
            <div style={{
              width: 80, height: 120,
              background: scanning ? 'var(--sci-dim)' : 'var(--light-wood)',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 100%, 0% 100%, 0% 30%)',
              transition: 'background 0.3s',
            }} />

            {/* Scan line */}
            {scanning && (
              <div style={{
                position: 'absolute', left: 0, right: 0,
                height: 2, background: 'var(--sci-cyan)',
                boxShadow: '0 0 8px var(--sci-cyan)',
                animation: 'scanline 2s ease-in-out infinite',
              }} />
            )}
          </div>

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            {scanning ? (
              <>
                <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--sci-cyan)' }}>扫描中... {scanProgress}%</div>
                <div style={{ width: 160, height: 4, background: 'var(--light-wood)', marginTop: 6 }}>
                  <div style={{ width: `${scanProgress}%`, height: '100%', background: 'var(--sci-cyan)', transition: 'width 0.1s' }} />
                </div>
              </>
            ) : scannedBull ? (
              <div style={{ fontSize: 12, lineHeight: 1.6 }}>
                <div style={{ fontWeight: 700 }}>{scannedBull.name} 扫描完成</div>
                <div>身高: {scannedBull.height}cm · 体重: {scannedBull.weight}kg</div>
                <div>阴茎: {scannedBull.penisLength}cm / {scannedBull.penisGirth}cm</div>
                <div>睾丸: {scannedBull.testicleVolume}ml</div>
              </div>
            ) : (
              <div style={{ fontSize: 12, opacity: 0.6 }}>选择种牛进行详细身体扫描</div>
            )}
          </div>
        </div>

        {/* Queue */}
        <div className="pixel-border" style={{ width: 300, padding: 14, background: 'var(--cream)' }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>待扫描队列</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 300, overflow: 'auto' }}>
            {queue.length === 0 && (
              <div style={{ fontSize: 11, opacity: 0.5, textAlign: 'center', padding: 20 }}>队列空空如也</div>
            )}
            {queue.map(bull => (
              <button
                key={bull.id}
                onClick={() => startScan(bull.id)}
                disabled={scanning}
                className="pixel-border-thin"
                style={{
                  padding: '8px 10px', textAlign: 'left', cursor: scanning ? 'not-allowed' : 'pointer',
                  background: 'var(--warm-milk)', display: 'flex', alignItems: 'center', gap: 8,
                  opacity: scanning ? 0.5 : 1,
                }}
              >
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: bull.quality === 'superior' ? 'var(--q-superior)' : bull.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)',
                }} />
                <span style={{ fontSize: 11 }}>{bull.name}</span>
                <span style={{ fontSize: 9, opacity: 0.6, marginLeft: 'auto' }}>{bull.status === 'weak' ? '待治疗' : '新生'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
