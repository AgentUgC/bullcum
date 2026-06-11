import { type ReactNode } from 'react';
import type { SceneId } from '../../App';
import TopBar from './TopBar';
import LLMConsole from './LLMConsole';
import ToastContainer from './ToastContainer';

interface Props {
  children: ReactNode;
  scene: SceneId;
  transitioning: boolean;
}

export default function AppLayout({ children, scene, transitioning }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--cream)',
      }}
    >
      <TopBar scene={scene} />

      <main
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'scale(0.96)' : 'scale(1)',
          transition: 'opacity 350ms ease, transform 350ms ease',
        }}
      >
        {children}
      </main>

      <LLMConsole />
      <ToastContainer />
    </div>
  );
}
