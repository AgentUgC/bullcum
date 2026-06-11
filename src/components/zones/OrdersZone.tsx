import { useGameState } from '../../hooks/useGameState';
import { showToast } from '../layout/ToastContainer';

interface Props {
  isFocused: boolean;
  onEnter: () => void;
}

export default function OrdersZone({ isFocused }: Props) {
  const state = useGameState();

  if (!isFocused) {
    return (
      <div style={{ padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
          {state.orders.filter(o => !o.completed).length} 个待处理订单
        </div>
        <div style={{ fontSize: 11, opacity: 0.5 }}>
          库存: 标{state.inventory.semenStandard}ml / 优{state.inventory.semenPremium}ml / 特{state.inventory.semenSuperior}ml
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 12, height: '100%', overflow: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <h2 style={{ fontSize: 18 }}>订单中心</h2>
        <p style={{ fontSize: 11, opacity: 0.7 }}>需求处理 · 收益结算</p>
      </div>

      {/* Inventory strip */}
      <div className="pixel-border-thin" style={{ padding: '6px 10px', background: 'var(--warm-milk)', marginBottom: 10, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <div style={{ fontSize: 10 }}>
          <span style={{ opacity: 0.6 }}>标准: </span>
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{state.inventory.semenStandard}ml</span>
        </div>
        <div style={{ fontSize: 10 }}>
          <span style={{ opacity: 0.6 }}>优级: </span>
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{state.inventory.semenPremium}ml</span>
        </div>
        <div style={{ fontSize: 10 }}>
          <span style={{ opacity: 0.6 }}>特级: </span>
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{state.inventory.semenSuperior}ml</span>
        </div>
      </div>

      {/* Orders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {state.orders.map(order => {
          const progress = order.delivered / order.quantity;
          const isComplete = order.completed;
          return (
            <div key={order.id} className="pixel-border-thin" style={{ padding: 10, background: isComplete ? 'rgba(109,160,109,0.1)' : 'var(--cream)', opacity: isComplete ? 0.6 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{order.client}</div>
                  <div style={{ fontSize: 9, opacity: 0.6 }}>{order.source} · {order.purpose}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--amber)' }}>{order.price}◎</div>
                  <div style={{ fontSize: 9, opacity: 0.5 }}>{order.scale}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ flex: 1, height: 4, background: 'var(--light-wood)' }}>
                  <div style={{ width: `${progress * 100}%`, height: '100%', background: isComplete ? 'var(--success)' : 'var(--rose-gold)', transition: 'width 0.3s' }} />
                </div>
                <div style={{ fontSize: 10, whiteSpace: 'nowrap' }}>
                  {order.delivered} / {order.quantity}ml
                </div>
              </div>

              {!isComplete && (
                <button
                  onClick={() => showToast(`交付订单: ${order.client}`, 'success')}
                  className="pixel-border-thin"
                  style={{ padding: '3px 10px', background: 'var(--peach)', cursor: 'pointer', fontSize: 11, width: '100%' }}
                >
                  交付
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
