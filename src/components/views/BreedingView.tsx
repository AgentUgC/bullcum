import { useState } from 'react';
import { useGameState, useGameDispatch } from '../../hooks/useGameState';
import { showToast } from '../layout/ToastContainer';
import type { SceneId } from '../../App';

interface Props { goToScene: (s: SceneId) => void; }

export default function BreedingView({ goToScene }: Props) {
  const state = useGameState();
  const dispatch = useGameDispatch();
  const [parentA, setParentA] = useState<string | null>(null);
  const [parentB, setParentB] = useState<string | null>(null);
  const [count, setCount] = useState(1);

  const totalCost = count * 500;
  const canAfford = state.currency >= totalCost;
  const canBreed = state.breedingUsed + count <= state.breedingSlots;

  const handleBreed = () => {
    if (!parentA) { showToast('必须选择父本 A', 'warning'); return; }
    if (!canAfford) { showToast('精元不足', 'error'); return; }
    if (!canBreed) { showToast('培育室槽位不足', 'error'); return; }
    dispatch({ type: 'UPDATE_CURRENCY', payload: -totalCost });
    dispatch({ type: 'SET_STATE', payload: { breedingUsed: state.breedingUsed + count } });
    showToast(`已开始培育 ${count} 头新生种牛，明日完成`, 'success');
  };

  const tanks = Array.from({ length: state.breedingSlots }).map((_, i) => ({
    id: i,
    occupied: i < state.breedingUsed,
    progress: i < state.breedingUsed ? 60 + Math.random() * 30 : 0,
  }));

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto', height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 22 }}>培育室</h2>
          <p style={{ fontSize: 12, opacity: 0.7 }}>提取繁殖用精子，培育新生种牛</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>占用: {state.breedingUsed} / {state.breedingSlots}</div>
          <button onClick={() => goToScene('pasture')} className="back-to-hall">← 返回大厅</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10, marginBottom: 20 }}>
        {tanks.map(tank => (
          <div key={tank.id} className="pixel-border-thin" style={{ padding: 10, background: tank.occupied ? 'rgba(127,216,210,0.1)' : 'var(--warm-milk)', textAlign: 'center', position: 'relative' }}>
            <div style={{ width: 40, height: 60, margin: '0 auto 6px', border: '2px solid var(--espresso)', borderRadius: '4px 4px 12px 12px', background: tank.occupied ? 'rgba(127,216,210,0.3)' : 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
              {tank.occupied && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${tank.progress}%`, background: 'linear-gradient(180deg, var(--sci-cyan), #4FA8A0)', animation: 'liquid-move 3s ease infinite', backgroundSize: '200% 200%' }} />
              )}
            </div>
            <div style={{ fontSize: 10 }}>罐 {tank.id + 1}</div>
            <div style={{ fontSize: 9, opacity: 0.6 }}>{tank.occupied ? '培育中' : '空闲'}</div>
          </div>
        ))}
      </div>

      <div className="pixel-border" style={{ padding: 16, background: 'var(--cream)' }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>新建培育</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 11, opacity: 0.7, display: 'block', marginBottom: 4 }}>父本 A (必需)</label>
            <select value={parentA || ''} onChange={e => setParentA(e.target.value || null)} style={{ width: '100%', padding: '6px 8px', border: '2px solid var(--espresso)', background: 'var(--cream)', fontSize: 12 }}>
              <option value="">选择种牛</option>
              {state.bulls.map(b => <option key={b.id} value={b.id}>{b.name} ({b.quality === 'superior' ? '特级' : b.quality === 'premium' ? '优级' : '标准'})</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, opacity: 0.7, display: 'block', marginBottom: 4 }}>父本 B (可选，影响继承)</label>
            <select value={parentB || ''} onChange={e => setParentB(e.target.value || null)} style={{ width: '100%', padding: '6px 8px', border: '2px solid var(--espresso)', background: 'var(--cream)', fontSize: 12 }}>
              <option value="">不选择</option>
              {state.bulls.filter(b => b.id !== parentA).map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <label style={{ fontSize: 11, opacity: 0.7 }}>培育数量</label>
          <button onClick={() => setCount(Math.max(1, count - 1))} className="pixel-border-thin" style={{ width: 28, height: 28, cursor: 'pointer', background: 'var(--warm-milk)' }}>-</button>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{count}</span>
          <button onClick={() => setCount(Math.min(state.breedingSlots - state.breedingUsed, count + 1))} className="pixel-border-thin" style={{ width: 28, height: 28, cursor: 'pointer', background: 'var(--warm-milk)' }}>+</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px dashed var(--light-wood)' }}>
          <div>
            <div style={{ fontSize: 11 }}>单胎成本: 500 ◎</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>总计: {totalCost.toLocaleString()} ◎</div>
          </div>
          <button onClick={handleBreed} disabled={!canAfford || !canBreed} className="pixel-border" style={{ padding: '8px 20px', background: canAfford && canBreed ? 'var(--sci-cyan)' : 'var(--light-wood)', color: canAfford && canBreed ? 'var(--espresso)' : 'var(--warm-brown)', cursor: canAfford && canBreed ? 'pointer' : 'not-allowed', fontSize: 13, fontWeight: 700 }}>
            启动培育
          </button>
        </div>
      </div>
    </div>
  );
}
