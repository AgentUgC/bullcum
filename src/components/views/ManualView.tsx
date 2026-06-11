import { useState } from 'react';
import { useGameState, useGameActions } from '../../hooks/useGameState';
import { showToast } from '../layout/ToastContainer';
import type { SceneId } from '../../App';

interface Props { goToScene: (s: SceneId) => void; }

type GachaCard = { type: string; name: string; desc: string };

const poses: GachaCard[] = [
  { type: '姿势', name: '站立前倾式', desc: '双臂高举拉伸前链肌群' },
  { type: '姿势', name: '跪趴俯身式', desc: '背沟线从颈椎到尾椎清晰可见' },
  { type: '姿势', name: '仰卧展开式', desc: '全身正面完全暴露' },
  { type: '姿势', name: '骑乘位', desc: '厂长跨坐主动套弄' },
];
const plays: GachaCard[] = [
  { type: '玩法', name: '标准采集', desc: '正常人工采精流程' },
  { type: '玩法', name: '失控潮吹', desc: '持续高频刺激至超出常规射精模式' },
  { type: '玩法', name: '深度质检', desc: '口腔全面接触评估' },
  { type: '玩法', name: '双龙肛交', desc: '两根同时纳入（需改造）' },
];
const statuses: GachaCard[] = [
  { type: '状态', name: '敏感加倍', desc: '该种牛今日敏感度+50%' },
  { type: '状态', name: '前液分泌旺盛', desc: '润滑充足，视觉刺激强' },
  { type: '状态', name: '情绪高涨', desc: '反应热烈，主动索求' },
  { type: '状态', name: '力竭边缘', desc: '肌肉震颤，汗珠流淌' },
];
const events: GachaCard[] = [
  { type: '事件', name: '无事发生', desc: '正常进行' },
  { type: '事件', name: '种牛主动索求', desc: '该种牛突然加大动作幅度' },
  { type: '事件', name: '另一头种牛闯入', desc: '请求加入互动' },
  { type: '事件', name: '设备商来电', desc: '推销新型采精泵' },
];

export default function ManualView({ goToScene }: Props) {
  const state = useGameState();
  const { useManual } = useGameActions();
  const [selectedBullId, setSelectedBullId] = useState<string | null>(null);
  const [gachaResult, setGachaResult] = useState<GachaCard[] | null>(null);
  const [gachaAnimating, setGachaAnimating] = useState(false);

  const selectedBull = selectedBullId ? state.bulls.find(b => b.id === selectedBullId) : null;
  const availableBulls = state.bulls.filter(b => b.status === 'healthy');

  const drawGacha = () => {
    if (!selectedBull) { showToast('请先选择一头种牛', 'warning'); return; }
    if (state.manualUsed >= state.manualLimit) { showToast('厂长体力耗尽', 'error'); return; }
    setGachaAnimating(true);
    setGachaResult(null);
    setTimeout(() => {
      setGachaResult([
        poses[Math.floor(Math.random() * poses.length)],
        plays[Math.floor(Math.random() * plays.length)],
        statuses[Math.floor(Math.random() * statuses.length)],
        events[Math.floor(Math.random() * events.length)],
      ]);
      setGachaAnimating(false);
      useManual(1);
      showToast('抽卡完成！开始采集', 'success');
    }, 1500);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'auto', background: 'linear-gradient(180deg, #FFF8F0 0%, #FFD4B3 100%)' }}>
      <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 24 }}>人工采精室</h2>
            <p style={{ fontSize: 12, opacity: 0.7 }}>柔软大床与各类采集道具，与种牛进行亲密的人工采集</p>
          </div>
          <button onClick={() => goToScene('pasture')} className="back-to-hall">← 返回大厅</button>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div className="pixel-border" style={{ width: 220, padding: 12, background: 'var(--cream)' }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>选择今日伴侣</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 300, overflow: 'auto' }}>
              {availableBulls.map(bull => (
                <button key={bull.id} onClick={() => { setSelectedBullId(bull.id); setGachaResult(null); }} className="pixel-border-thin" style={{ padding: '6px 8px', textAlign: 'left', cursor: 'pointer', background: selectedBullId === bull.id ? 'var(--peach)' : 'var(--warm-milk)', border: selectedBullId === bull.id ? '2px solid var(--espresso)' : '2px solid transparent', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: bull.quality === 'superior' ? 'var(--q-superior)' : bull.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)' }} />
                  <span style={{ fontSize: 11 }}>{bull.name}</span>
                </button>
              ))}
            </div>
            {selectedBull && <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--light-wood)' }}><div style={{ fontSize: 11, opacity: 0.7 }}>已选择: {selectedBull.name}</div></div>}
          </div>

          <div style={{ flex: 1, minWidth: 300 }}>
            <div className="pixel-border" style={{ padding: 20, background: 'var(--cream)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 4 }}>情欲抽卡</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 16 }}>抽取决定本次人工采精的玩法</div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 16 }}>
                {gachaResult ? gachaResult.map((card, i) => (
                  <div key={i} className="pixel-border" style={{ padding: 10, background: 'var(--warm-milk)', animation: 'slide-in-up 0.3s ease' }}>
                    <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 2 }}>{card.type}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{card.name}</div>
                    <div style={{ fontSize: 10, opacity: 0.7 }}>{card.desc}</div>
                  </div>
                )) : (
                  <>
                    {['姿势', '玩法', '状态', '事件'].map((label, i) => (
                      <div key={i} className="pixel-border-thin" style={{ padding: 16, background: 'var(--warm-milk)', opacity: 0.5 }}>
                        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--light-wood)' }}>?</div>
                        <div style={{ fontSize: 10 }}>{label}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <button onClick={drawGacha} disabled={gachaAnimating || !selectedBull} className="pixel-border" style={{ padding: '10px 28px', background: gachaAnimating ? 'var(--light-wood)' : 'var(--rose-gold)', color: '#fff', cursor: gachaAnimating || !selectedBull ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-display)', fontSize: 16, animation: gachaAnimating ? 'shake 0.4s infinite' : 'none' }}>
                {gachaAnimating ? '抽卡中...' : '开始抽卡'}
              </button>

              {gachaResult && (
                <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.6, color: 'var(--warm-brown)' }}>
                  场景预览: {selectedBull?.name} 以 {gachaResult[0].name} 被安置在大床上，本次采用 {gachaResult[1].name} 玩法。种牛处于 {gachaResult[2].name} 状态。{gachaResult[3].name !== '无事发生' ? `突发: ${gachaResult[3].name}` : ''}
                </div>
              )}
            </div>

            <div className="pixel-border" style={{ marginTop: 12, padding: 12, background: 'var(--cream)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span>厂长体力</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{state.manualUsed} / {state.manualLimit}</span>
              </div>
              <div style={{ width: '100%', height: 8, background: 'var(--light-wood)' }}>
                <div style={{ width: `${(state.manualUsed / state.manualLimit) * 100}%`, height: '100%', background: state.manualUsed > state.manualLimit * 0.8 ? 'var(--danger)' : 'var(--rose-gold)', transition: 'width 0.3s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
