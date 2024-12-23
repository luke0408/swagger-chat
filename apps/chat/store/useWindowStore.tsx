import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface WindowPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface WindowState {
  // Window states
  swaggerWindow: WindowPosition;
  chatWindow: WindowPosition;
  isMobile: boolean;

  // Actions
  setSwaggerWindow: (position: Partial<WindowPosition>) => void;
  setChatWindow: (position: Partial<WindowPosition>) => void;
  setIsMobile: (isMobile: boolean) => void;
  resetPositions: () => void;
}

const MOBILE_DEFAULTS = {
  swaggerWindow: {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight / 2,
  },
  chatWindow: {
    x: 0,
    y: window.innerHeight / 2,
    width: window.innerWidth,
    height: window.innerHeight / 2,
  },
};

const DESKTOP_DEFAULTS = {
  swaggerWindow: {
    x: 50,
    y: 50,
    width: 600,
    height: 500,
  },
  chatWindow: {
    x: 700,
    y: 100,
    width: 500,
    height: 500,
  },
};


export const useWindowStore = create<WindowState>()(
  devtools(
    (set) => ({
      // Initial states
      swaggerWindow: typeof window !== 'undefined' && window.innerWidth < 768
        ? MOBILE_DEFAULTS.swaggerWindow
        : DESKTOP_DEFAULTS.swaggerWindow,
      chatWindow: typeof window !== 'undefined' && window.innerWidth < 768
        ? MOBILE_DEFAULTS.chatWindow
        : DESKTOP_DEFAULTS.chatWindow,
      isMobile: false,

      // Actions
      setSwaggerWindow: (position) =>
        set((state) => ({
          swaggerWindow: { ...state.swaggerWindow, ...position },
        })),

      setChatWindow: (position) =>
        set((state) => ({
          chatWindow: { ...state.chatWindow, ...position },
        })),

      setIsMobile: (isMobile) =>
        set((state) => {
          const defaults = isMobile ? MOBILE_DEFAULTS : DESKTOP_DEFAULTS;
          return {
            isMobile,
            // 현재 위치 유지, 너비/높이만 기본값으로 변경
            swaggerWindow: {
              x: state.swaggerWindow.x,
              y: state.swaggerWindow.y,
              width: defaults.swaggerWindow.width,
              height: defaults.swaggerWindow.height,
            },
            chatWindow: {
              x: state.chatWindow.x,
              y: state.chatWindow.y,
              width: defaults.chatWindow.width,
              height: defaults.chatWindow.height,
            },
          };
        }),

      resetPositions: () =>
        set((state) => {
          const defaults = state.isMobile ? MOBILE_DEFAULTS : DESKTOP_DEFAULTS;
          return {
            swaggerWindow: defaults.swaggerWindow,
            chatWindow: defaults.chatWindow,
          };
        }),
    }),
    { name: 'window-store' }
  )
);