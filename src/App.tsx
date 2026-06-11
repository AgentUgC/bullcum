import { useState, useCallback } from 'react';
import { GameProvider } from './hooks/useGameState';
import AppLayout from './components/layout/AppLayout';
import PastureView from './components/views/PastureView';
import CollectionView from './components/views/CollectionView';
import ManualView from './components/views/ManualView';
import RestView from './components/views/RestView';
import BreedingView from './components/views/BreedingView';
import OrdersView from './components/views/OrdersView';
import WarehouseView from './components/views/WarehouseView';
import MedicalView from './components/views/MedicalView';

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
  const [scene, setScene] = useState<SceneId>('pasture');
  const [transitioning, setTransitioning] = useState(false);

  const goToScene = useCallback((target: SceneId) => {
    if (target === scene) return;
    setTransitioning(true);
    setTimeout(() => {
      setScene(target);
      setTimeout(() => setTransitioning(false), 50);
    }, 350);
  }, [scene]);

  return (
    <GameProvider>
      <AppLayout scene={scene} transitioning={transitioning}>
        <SceneRenderer scene={scene} goToScene={goToScene} />
      </AppLayout>
    </GameProvider>
  );
}

function SceneRenderer({ scene, goToScene }: { scene: SceneId; goToScene: (s: SceneId) => void }) {
  switch (scene) {
    case 'pasture':    return <PastureView    goToScene={goToScene} />;
    case 'collection': return <CollectionView goToScene={goToScene} />;
    case 'manual':     return <ManualView     goToScene={goToScene} />;
    case 'rest':       return <RestView       goToScene={goToScene} />;
    case 'breeding':   return <BreedingView   goToScene={goToScene} />;
    case 'orders':     return <OrdersView     goToScene={goToScene} />;
    case 'warehouse':  return <WarehouseView  goToScene={goToScene} />;
    case 'medical':    return <MedicalView    goToScene={goToScene} />;
    default:           return <PastureView    goToScene={goToScene} />;
  }
}
