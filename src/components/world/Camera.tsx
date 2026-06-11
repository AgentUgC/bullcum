import { useState, useCallback, useRef, useEffect } from 'react';
import type { ZoneDef } from '../../types/world';
import { WORLD_WIDTH, WORLD_HEIGHT, VIEWPORT_PADDING } from '../../types/world';

interface Props {
  children: React.ReactNode;
  activeZone: string | null;
  zones: ZoneDef[];
  onZoneChange: (zoneId: string | null) => void;
  onCameraUpdate?: (state: { x: number; y: number; zoom: number }) => void;
}

export default function Camera({ children, activeZone, zones, onZoneChange, onCameraUpdate }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [camX, setCamX] = useState(0);
  const [camY, setCamY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, camX: 0, camY: 0 });
  const animRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0, zoom: 1 });

  const focusOnZone = useCallback((zoneId: string | null) => {
    if (!zoneId) {
      targetRef.current = { x: WORLD_WIDTH / 2 - window.innerWidth / 2, y: WORLD_HEIGHT / 2 - window.innerHeight / 2, zoom: 0.85 };
      onZoneChange(null);
      return;
    }
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Center the zone in viewport with padding
    const tx = zone.x + zone.width / 2 - vw / 2;
    const ty = zone.y + zone.height / 2 - vh / 2;

    // Calculate zoom to fit zone + padding
    const zw = vw / (zone.width + VIEWPORT_PADDING * 2);
    const zh = vh / (zone.height + VIEWPORT_PADDING * 2);
    const tz = Math.min(zw, zh, 1);

    targetRef.current = { x: tx, y: ty, zoom: tz };
  }, [zones, onZoneChange]);

  // Animate camera towards target
  useEffect(() => {
    const animate = () => {
      let newX = camX;
      let newY = camY;
      let newZoom = zoom;

      setCamX(prev => {
        const diff = targetRef.current.x - prev;
        if (Math.abs(diff) < 0.5) { newX = targetRef.current.x; return newX; }
        newX = prev + diff * 0.08;
        return newX;
      });
      setCamY(prev => {
        const diff = targetRef.current.y - prev;
        if (Math.abs(diff) < 0.5) { newY = targetRef.current.y; return newY; }
        newY = prev + diff * 0.08;
        return newY;
      });
      setZoom(prev => {
        const diff = targetRef.current.zoom - prev;
        if (Math.abs(diff) < 0.001) { newZoom = targetRef.current.zoom; return newZoom; }
        newZoom = prev + diff * 0.08;
        return newZoom;
      });

      onCameraUpdate?.({ x: newX, y: newY, zoom: newZoom });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [camX, camY, zoom, onCameraUpdate]);

  // Update target when activeZone changes
  useEffect(() => {
    focusOnZone(activeZone);
  }, [activeZone, focusOnZone]);

  // Initialize camera to center overview
  useEffect(() => {
    targetRef.current = {
      x: WORLD_WIDTH / 2 - window.innerWidth / 2,
      y: WORLD_HEIGHT / 2 - window.innerHeight / 2,
      zoom: 0.75,
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('[data-zone]')) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, camX: targetRef.current.x, camY: targetRef.current.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = (e.clientX - dragStart.current.x) / zoom;
    const dy = (e.clientY - dragStart.current.y) / zoom;
    targetRef.current = {
      ...targetRef.current,
      x: dragStart.current.camX - dx,
      y: dragStart.current.camY - dy,
    };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.95 : 1.05;
    targetRef.current = {
      ...targetRef.current,
      zoom: Math.max(0.4, Math.min(1.2, targetRef.current.zoom * delta)),
    };
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        position: 'relative',
        background: '#1a1410',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
    >
      <div
        style={{
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate(${-camX}px, ${-camY}px) scale(${zoom})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : undefined,
          willChange: 'transform',
        }}
      >
        {/* Grid background */}
        <WorldGrid />
        {children}
      </div>
    </div>
  );
}

function WorldGrid() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(rgba(212,163,115,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,163,115,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }}
    />
  );
}
