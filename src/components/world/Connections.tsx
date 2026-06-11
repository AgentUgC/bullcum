import { zones } from '../../data/worldLayout';
import { connections } from '../../data/worldLayout';

interface Props {
  activeZone: string | null;
}

export default function Connections({ activeZone }: Props) {
  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="rgba(212,163,115,0.4)" />
        </marker>
      </defs>
      {connections.map((conn, i) => {
        const from = zones.find(z => z.id === conn.from);
        const to = zones.find(z => z.id === conn.to);
        if (!from || !to) return null;

        const fx = from.x + from.width / 2;
        const fy = from.y + from.height / 2;
        const tx = to.x + to.width / 2;
        const ty = to.y + to.height / 2;

        const isActive = activeZone === conn.from || activeZone === conn.to;

        return (
          <line
            key={i}
            x1={fx}
            y1={fy}
            x2={tx}
            y2={ty}
            stroke={isActive ? 'rgba(212,163,115,0.5)' : 'rgba(212,163,115,0.2)'}
            strokeWidth={isActive ? 3 : 2}
            strokeDasharray="8 6"
            style={{
              transition: 'stroke 0.5s ease, stroke-width 0.5s ease',
            }}
          />
        );
      })}
    </svg>
  );
}
