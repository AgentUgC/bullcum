import { useGameState, useGameActions } from '../../hooks/useGameState';
import { showToast } from '../layout/ToastContainer';
import type { SceneId } from '../../App';

interface Props { goToScene: (s: SceneId) => void; }

export default function OrdersView({ goToScene }: Props) {
  const state = useGameState();
  const { updateOrder, addCurrency } = useGameActions();

  const deliver = (order: typeof state.orders[0]) => {
    const key = `semen${order.quality.charAt(0).toUpperCase() + order.quality.slice(1)}` as keyof typeof state.inventory;
    const current = state.inventory[key] as number;
    if (current < order.demand) {
      showToast(`库存不足，需要 ${order.demand}ml ${order.quality === 'superior' ? '特级' : order.quality === 'premium' ? '优级' : '标准'}精液`, 'error');
      return;
    }
    updateOrder(order.id, { delivered: order.demand, completed: true });
    addCurrency(order.revenue);
    showToast(`订单交付成功！获得 ${order.revenue} ◎`, 'success');
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: '0 auto', height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 22, marginBottom: 4 }}>订单中心</h2>
          <p style={{ fontSize: 12, opacity: 0.7 }}>通过国家统一平台接单、交付、结算</p>
        </div>
        <button onClick={() => goToScene('pasture')} className="back-to-hall">← 返回大厅</button>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <InvCard label="标准库存" value={`${state.inventory.semenStandard} ml`} color="var(--q-standard)" />
        <InvCard label="优级库存" value={`${state.inventory.semenPremium} ml`} color="var(--q-premium)" />
        <InvCard label="特级库存" value={`${state.inventory.semenSuperior} ml`} color="var(--q-superior)" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {state.orders.map(order => {
          const progress = Math.min(100, (order.delivered / order.demand) * 100);
          const qualityLabel = order.quality === 'superior' ? '特级' : order.quality === 'premium' ? '优级' : '标准';
          return (
            <div key={order.id} className="pixel-border" style={{ padding: 14, background: order.completed ? 'rgba(109,160,109,0.1)' : 'var(--cream)', opacity: order.completed ? 0.7 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, padding: '2px 6px', background: order.quality === 'superior' ? 'var(--q-superior)' : order.quality === 'premium' ? 'var(--q-premium)' : 'var(--q-standard)', color: '#fff', fontWeight: 700 }}>{qualityLabel}</span>
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{order.type === 'guaranteed' ? '保底订单' : '随机订单'}</span>
                  </div>
                  {order.source && <div style={{ fontSize: 11, opacity: 0.8 }}>{order.source} · {order.usage} · {order.scale}</div>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14 }}>{order.revenue} ◎</div>
                  <div style={{ fontSize: 10, opacity: 0.6 }}>预计收益</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ flex: 1, height: 6, background: 'var(--light-wood)' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: order.completed ? 'var(--success)' : 'var(--amber)', transition: 'width 0.3s' }} />
                </div>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>{order.delivered.toLocaleString()} / {order.demand.toLocaleString()} ml</span>
              </div>

              {!order.completed && (
                <button onClick={() => deliver(order)} className="pixel-border" style={{ padding: '6px 14px', background: 'var(--amber)', cursor: 'pointer', fontSize: 12, float: 'right' }}>交付订单</button>
              )}
              {order.completed && <div style={{ fontSize: 11, color: 'var(--success)', fontWeight: 700, textAlign: 'right' }}>已完成</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InvCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="pixel-border" style={{ flex: 1, padding: 10, background: 'var(--cream)', borderLeft: `4px solid ${color}` }}>
      <div style={{ fontSize: 11, opacity: 0.7 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14 }}>{value}</div>
    </div>
  );
}
