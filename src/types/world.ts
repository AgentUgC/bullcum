export interface ZoneDef {
  id: string;
  name: string;
  subtitle: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  glowColor: string;
  icon: string;
}

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
  targetZone: string | null;
}

export const WORLD_WIDTH = 3200;
export const WORLD_HEIGHT = 2000;
export const VIEWPORT_PADDING = 120;
