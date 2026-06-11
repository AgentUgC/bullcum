import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import LLMConsole from './LLMConsole';
import ToastContainer from './ToastContainer';

const navItems = [
  { path: '/', label: '牧场大厅' },
  { path: '/collection', label: '采精车间' },
  { path: '/manual', label: '人工采精室' },
  { path: '/rest', label: '休息棚' },
  { path: '/breeding', label: '培育室' },
  { path: '/orders', label: '订单中心' },
  { path: '/warehouse', label: '仓库' },
  { path: '/medical', label: '医疗室' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar Nav */}
        <aside
          className="pixel-border"
          style={{
            width: navOpen ? 180 : 56,
            background: 'var(--warm-milk)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            padding: '8px 4px',
            transition: 'width 0.25s ease',
            overflow: 'hidden',
            zIndex: 50,
          }}
        >
          <button
            onClick={() => setNavOpen(!navOpen)}
            style={{
              width: '100%',
              padding: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              color: 'var(--espresso)',
              fontSize: navOpen ? 14 : 18,
              textAlign: 'center',
            }}
          >
            {navOpen ? '《 收起' : '》'}
          </button>

          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); if (window.innerWidth < 768) setNavOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 10px',
                  background: active ? 'var(--peach)' : 'transparent',
                  border: active ? '2px solid var(--espresso)' : '2px solid transparent',
                  boxShadow: active ? '2px 2px 0 var(--espresso)' : 'none',
                  cursor: 'pointer',
                  color: 'var(--espresso)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: active ? 700 : 400,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>
                  {item.path === '/' && '⌂'}
                  {item.path === '/collection' && '⚙'}
                  {item.path === '/manual' && '♥'}
                  {item.path === '/rest' && '☾'}
                  {item.path === '/breeding' && '⚗'}
                  {item.path === '/orders' && '☰'}
                  {item.path === '/warehouse' && '□'}
                  {item.path === '/medical' && '+'}
                </span>
                {navOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
            {children}
          </div>
          <LLMConsole />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
