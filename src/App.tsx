import { useState } from 'react';
import { GameProvider } from './hooks/useGameState';
import WorldMap from './components/world/WorldMap';
import TopBar from './components/layout/TopBar';
import LLMConsole from './components/layout/LLMConsole';
import ToastContainer from './components/layout/ToastContainer';

export type SceneId =
  | 'pasture'
  | 'collection'
  | 'manual'
  | 'rest'
  | 'breeding'
  | 'orders'
  | 'warehouse'
  | 'medical';

export default function App() {
  const [activeZone, setActiveZone] = useState<SceneId | null>(null);

  return (
    <GameProvider>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
        {/* World Map - full screen canvas */}
        <WorldMap activeZone={activeZone} onZoneChange={setActiveZone} />

        {/* Floating UI overlays */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, pointerEvents: 'none' }}>
          <TopBar activeZone={activeZone} onZoneChange={setActiveZone} />
        </div>

        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
          <LLMConsole />
        </div>

        <ToastContainer />
      </div>
    </GameProvider>
  );
}
