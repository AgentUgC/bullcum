export type Quality = 'standard' | 'premium' | 'superior';
export type CoreType = 'standard' | 'premium' | 'superior' | 'ultimate';
export type Personality = 'steady' | 'direct' | 'energetic' | 'silent';
export type EjaculationMode = 'burst' | 'uniform' | 'escalating' | 'overflow';
export type BullStatus = 'healthy' | 'weak' | 'excited' | 'satisfied';

export interface Bull {
  id: string;
  name: string;
  nickname?: string;
  quality: Quality;
  height: number;
  weight: number;
  bodyType: string;
  bodyDesc: string;
  skinColor: string;
  faceDesc: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  hornShape: string;
  hornColor: string;
  hornSize: string;
  earFurColor: string;
  earDesc: string;
  tailLength: number;
  tailColor: string;
  tailTasselColor: string;
  penisLength: number;
  penisFlaccid: number;
  penisGirth: number;
  foreskin: string;
  veinLevel: string;
  hasRing: boolean;
  ringDesc: string;
  penisDesc: string;
  testicleVolume: number;
  testicleDesc: string;
  ejaculationMode: EjaculationMode;
  ejaculationDesc: string;
  personality: Personality;
  personalityDesc: string;
  birthDay: number;
  dailyCollected: number;
  dailyMax: number;
  status: BullStatus;
  supplementUsed: boolean;
  supplementCount: number;
  boundToUltimate: boolean;
  currentLocation: string;
}

export interface Core {
  type: CoreType;
  unlocked: boolean;
  level: number;
  dailyProcessed: number;
  status: 'normal' | 'degraded';
  boundBulls: string[];
}

export interface PumpSlot {
  coreType: CoreType;
  pumpIndex: number;
  bullId: string | null;
  status: 'idle' | 'running' | 'done';
}

export interface Order {
  id: string;
  type: 'guaranteed' | 'random';
  quality: Quality;
  demand: number;
  delivered: number;
  revenue: number;
  source?: string;
  usage?: string;
  scale?: string;
  completed: boolean;
}

export interface Inventory {
  grass: number;
  water: number;
  supplement: number;
  ultimateSupplement: number;
  semenStandard: number;
  semenPremium: number;
  semenSuperior: number;
}

export interface GameState {
  day: number;
  phase: number;
  currency: number;
  reputation: number;
  factoryLevel: number;
  factoryName: string;
  playerName: string;
  playerUpgraded: boolean;
  manualLimit: number;
  manualUsed: number;
  inventory: Inventory;
  bulls: Bull[];
  cores: Core[];
  pumps: PumpSlot[];
  orders: Order[];
  breedingSlots: number;
  breedingUsed: number;
}

export interface ToastItem {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}
