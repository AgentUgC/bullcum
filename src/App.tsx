import { HashRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <GameProvider>
      <HashRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<PastureView />} />
            <Route path="/collection" element={<CollectionView />} />
            <Route path="/manual" element={<ManualView />} />
            <Route path="/rest" element={<RestView />} />
            <Route path="/breeding" element={<BreedingView />} />
            <Route path="/orders" element={<OrdersView />} />
            <Route path="/warehouse" element={<WarehouseView />} />
            <Route path="/medical" element={<MedicalView />} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </GameProvider>
  );
}

export default App;
