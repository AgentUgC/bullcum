import { createContext, useContext, useReducer, useCallback } from 'react';
import type { GameState, Bull, Core, PumpSlot, Order, Inventory } from '../types/game';
import { initialGameState } from '../data/mockData';

type Action =
  | { type: 'NEXT_DAY' }
  | { type: 'UPDATE_CURRENCY'; payload: number }
  | { type: 'UPDATE_REPUTATION'; payload: number }
  | { type: 'ADD_BULL'; payload: Bull }
  | { type: 'UPDATE_BULL'; id: string; payload: Partial<Bull> }
  | { type: 'UPDATE_CORE'; coreType: string; payload: Partial<Core> }
  | { type: 'UPDATE_PUMP'; coreType: string; pumpIndex: number; payload: Partial<PumpSlot> }
  | { type: 'UPDATE_ORDER'; id: string; payload: Partial<Order> }
  | { type: 'UPDATE_INVENTORY'; payload: Partial<Inventory> }
  | { type: 'USE_MANUAL'; count: number }
  | { type: 'RESET_MANUAL' }
  | { type: 'SET_STATE'; payload: Partial<GameState> };

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'NEXT_DAY':
      return {
        ...state,
        day: state.day + 1,
        phase: 1,
        manualUsed: 0,
        bulls: state.bulls.map(b => ({
          ...b,
          dailyCollected: 0,
          dailyMax: 10,
          status: b.status === 'weak' ? 'weak' : 'healthy',
          supplementUsed: false,
          强化料Count: 0,
          boundToUltimate: false,
          currentLocation: '休息棚',
        })),
        cores: state.cores.map(c => ({ ...c, dailyProcessed: 0, boundBulls: [] })),
        pumps: state.pumps.map(p => ({ ...p, bullId: null, status: 'idle' as const })),
      };
    case 'UPDATE_CURRENCY':
      return { ...state, currency: Math.max(0, state.currency + action.payload) };
    case 'UPDATE_REPUTATION':
      return { ...state, reputation: Math.max(0, Math.min(100, state.reputation + action.payload)) };
    case 'ADD_BULL':
      return { ...state, bulls: [...state.bulls, action.payload] };
    case 'UPDATE_BULL':
      return {
        ...state,
        bulls: state.bulls.map(b => b.id === action.id ? { ...b, ...action.payload } : b),
      };
    case 'UPDATE_CORE':
      return {
        ...state,
        cores: state.cores.map(c => c.type === action.coreType ? { ...c, ...action.payload } : c),
      };
    case 'UPDATE_PUMP':
      return {
        ...state,
        pumps: state.pumps.map(p =>
          p.coreType === action.coreType && p.pumpIndex === action.pumpIndex
            ? { ...p, ...action.payload }
            : p
        ),
      };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(o => o.id === action.id ? { ...o, ...action.payload } : o),
      };
    case 'UPDATE_INVENTORY':
      return { ...state, inventory: { ...state.inventory, ...action.payload } };
    case 'USE_MANUAL':
      return { ...state, manualUsed: Math.min(state.manualLimit, state.manualUsed + action.count) };
    case 'RESET_MANUAL':
      return { ...state, manualUsed: 0 };
    case 'SET_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const GameStateContext = createContext<GameState | null>(null);
const GameDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const state = useContext(GameStateContext);
  if (!state) throw new Error('useGameState must be used within GameProvider');
  return state;
}

export function useGameDispatch() {
  const dispatch = useContext(GameDispatchContext);
  if (!dispatch) throw new Error('useGameDispatch must be used within GameProvider');
  return dispatch;
}

export function useGameActions() {
  const dispatch = useGameDispatch();
  return {
    nextDay: useCallback(() => dispatch({ type: 'NEXT_DAY' }), [dispatch]),
    addCurrency: useCallback((n: number) => dispatch({ type: 'UPDATE_CURRENCY', payload: n }), [dispatch]),
    updateBull: useCallback((id: string, payload: Partial<Bull>) => dispatch({ type: 'UPDATE_BULL', id, payload }), [dispatch]),
    updatePump: useCallback((coreType: string, pumpIndex: number, payload: Partial<PumpSlot>) =>
      dispatch({ type: 'UPDATE_PUMP', coreType, pumpIndex, payload }), [dispatch]),
    updateOrder: useCallback((id: string, payload: Partial<Order>) => dispatch({ type: 'UPDATE_ORDER', id, payload }), [dispatch]),
    useManual: useCallback((count: number) => dispatch({ type: 'USE_MANUAL', count }), [dispatch]),
  };
}
