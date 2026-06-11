import { useState, useEffect } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

let toastListeners: ((toast: Toast) => void)[] = [];

export function showToast(message: string, type: Toast['type'] = 'info') {
  const toast: Toast = { id: crypto.randomUUID(), message, type };
  toastListeners.forEach(cb => cb(toast));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (t: Toast) => {
      setToasts(prev => [...prev, t]);
      setTimeout(() => {
        setToasts(prev => prev.filter(x => x.id !== t.id));
      }, 3200);
    };
    toastListeners.push(handler);
    return () => { toastListeners = toastListeners.filter(l => l !== handler); };
  }, []);

  const colors = {
    success: { bg: '#e8f5e9', border: 'var(--success)', text: 'var(--success)' },
    warning: { bg: '#fff8e1', border: 'var(--warning)', text: 'var(--warning)' },
    error: { bg: '#ffebee', border: 'var(--danger)', text: 'var(--danger)' },
    info: { bg: '#e3f2fd', border: 'var(--sci-cyan)', text: 'var(--sci-cyan)' },
  };

  return (
    <div style={{ position: 'fixed', top: 68, right: 16, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
      {toasts.map(t => {
        const c = colors[t.type];
        return (
          <div
            key={t.id}
            style={{
              animation: 'slide-in-right 0.3s ease',
              background: c.bg,
              border: `2px solid ${c.border}`,
              boxShadow: '3px 3px 0 rgba(62,39,35,0.15)',
              padding: '10px 16px',
              minWidth: 200,
              maxWidth: 320,
              fontSize: 13,
              color: c.text,
              fontFamily: 'var(--font-body)',
              pointerEvents: 'auto',
            }}
          >
            {t.message}
          </div>
        );
      })}
    </div>
  );
}
