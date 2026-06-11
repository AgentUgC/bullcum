import { useState, useRef } from 'react';

const tabs = [
  { key: 'narrative', label: '叙事输出' },
  { key: 'context', label: '上下文状态' },
  { key: 'prompt', label: '原始提示词' },
];

export default function LLMConsole() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('narrative');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([
    '[系统] 欢迎来到幸福工厂管理系统。AI 叙事将在此显示。',
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, `[玩家] ${input}`]);
    setTimeout(() => {
      setMessages(prev => [...prev, `[AI] 收到指令：${input}。正在处理中...`]);
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 600);
    setInput('');
  };

  return (
    <div
      className="pixel-border-thin"
      style={{
        height: collapsed ? 40 : 220,
        background: 'rgba(250,243,232,0.95)',
        backdropFilter: 'blur(4px)',
        transition: 'height 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        zIndex: 40,
      }}
    >
      {/* Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          background: 'var(--light-wood)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--espresso)',
          width: '100%',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--success)',
            animation: 'breathe 2s ease-in-out infinite',
          }} />
          <span style={{ fontWeight: 700 }}>AI 叙事控制台</span>
          <span style={{ opacity: 0.6, fontSize: 11 }}>就绪</span>
        </span>
        <span style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }}>▲</span>
      </button>

      {!collapsed && (
        <>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--light-wood)' }}>
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                style={{
                  padding: '6px 12px',
                  fontSize: 12,
                  border: 'none',
                  borderBottom: activeTab === t.key ? '2px solid var(--amber)' : '2px solid transparent',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: activeTab === t.key ? 'var(--espresso)' : 'var(--warm-brown)',
                  fontWeight: activeTab === t.key ? 700 : 400,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 8, fontSize: 12 }} ref={scrollRef}>
            {activeTab === 'narrative' && messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 6, lineHeight: 1.5, animation: 'fade-in 0.3s ease' }}>
                {m}
              </div>
            ))}
            {activeTab === 'context' && (
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--warm-brown)' }}>
                {JSON.stringify({ day: 1, phase: 1, currency: 5000 }, null, 2)}
              </pre>
            )}
            {activeTab === 'prompt' && (
              <div style={{ color: 'var(--warm-brown)', fontStyle: 'italic' }}>
                提示词构造区 - 当前操作触发的系统提示将在此组装
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ display: 'flex', padding: '6px 8px', borderTop: '1px solid var(--light-wood)', gap: 6 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="输入指令或描述，按回车发送至 AI..."
              style={{
                flex: 1,
                padding: '6px 10px',
                border: '2px solid var(--espresso)',
                background: 'var(--cream)',
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                outline: 'none',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                padding: '6px 14px',
                background: 'var(--amber)',
                color: '#fff',
                border: '2px solid var(--espresso)',
                boxShadow: '2px 2px 0 var(--espresso)',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontSize: 13,
              }}
            >
              发送
            </button>
          </div>
        </>
      )}
    </div>
  );
}
