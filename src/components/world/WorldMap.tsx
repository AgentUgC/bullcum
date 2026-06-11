import { useState, useCallback } from 'react';
import Camera from './Camera';
import Zone from './Zone';
import Connections from './Connections';
import MiniMap from './MiniMap';
import { zones } from '../../data/worldLayout';
import type { SceneId } from '../../App';

// Import zone content components
import PastureZone from '../zones/PastureZone';
import CollectionZone from '../zones/CollectionZone';
import ManualZone from '../zones/ManualZone';
import RestZone from '../zones/RestZone';
import BreedingZone from '../zones/BreedingZone';
import OrdersZone from '../zones/OrdersZone';
import WarehouseZone from '../zones/WarehouseZone';
import MedicalZone from '../zones/MedicalZone';

interface Props {
  activeZone: SceneId | null;
  onZoneChange: (zoneId: SceneId | null) => void;
}

const zoneContentMap: Record<string, React.FC<{ isFocused: boolean; onEnter: () => void }>> = {
  pasture: PastureZone,
  collection: CollectionZone,
  manual: ManualZone,
  rest: RestZone,
  breeding: BreedingZone,
  orders: OrdersZone,
  warehouse: WarehouseZone,
  medical: MedicalZone,
};

export default function WorldMap({ activeZone, onZoneChange }: Props) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [camState, setCamState] = useState({ x: 0, y: 0, zoom: 1 });

  const handleZoneClick = useCallback((zoneId: string) => {
    if (activeZone === zoneId) {
      onZoneChange(null); // Defocus
    } else {
      onZoneChange(zoneId as SceneId);
    }
  }, [activeZone, onZoneChange]);

  return (
    <Camera
      activeZone={activeZone}
      zones={zones}
      onZoneChange={(id) => onZoneChange(id as SceneId | null)}
      onCameraUpdate={setCamState}
    >
      <Connections activeZone={activeZone} />

      {zones.map((zone) => {
        const isFocused = activeZone === zone.id;
        const isHovered = hoveredZone === zone.id;
        const Content = zoneContentMap[zone.id];

        return (
          <Zone
            key={zone.id}
            zone={zone}
            isActive={isFocused || isHovered}
            isFocused={isFocused}
            onClick={() => handleZoneClick(zone.id)}
          >
            {Content && <Content isFocused={isFocused} onEnter={() => handleZoneClick(zone.id)} />}
          </Zone>
        );
      })}

      {/* Floating zone labels when not focused */}
      {zones.map((zone) => {
        if (activeZone && activeZone !== zone.id) return null;
        return (
          <div
            key={`label-${zone.id}`}
            style={{
              position: 'absolute',
              left: zone.x + zone.width / 2,
              top: zone.y - 30,
              transform: 'translateX(-50%)',
              padding: '2px 10px',
              background: 'var(--espresso)',
              color: 'var(--cream)',
              fontSize: 11,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              opacity: activeZone ? 0 : 0.8,
              pointerEvents: 'none',
              transition: 'opacity 0.5s',
              zIndex: 15,
            }}
          >
            {zone.name}
          </div>
        );
      })}

      <MiniMap
        camX={camState.x}
        camY={camState.y}
        zoom={camState.zoom}
        activeZone={activeZone}
        onZoneClick={handleZoneClick}
      />
    </Camera>
  );
}
