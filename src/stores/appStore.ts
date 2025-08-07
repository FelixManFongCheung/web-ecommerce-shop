import { create } from "zustand";

interface AppStateActions {
  toggleOpen: () => void;
  toggleCheckoutDialog: () => void;
  toggleCart: () => void;
  openCart: () => void;
}

export interface AppState {
  // State
  isOpen: boolean;
  isCheckoutOpen: boolean;
  isCartOpen: boolean;
  // Actions
  actions: AppStateActions;
}

const AppStore = create<AppState>((set) => ({
  // Initial state
  isOpen: false,
  isCheckoutOpen: false,
  isCartOpen: false,

  // Actions
  actions: {
    toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    toggleCheckoutDialog: () =>
      set((state) => ({ isCheckoutOpen: !state.isCheckoutOpen })),
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    openCart: () => set({ isCartOpen: true }),
  },
}));

export const useIsOpen = () => AppStore((state) => state.isOpen);
export const useIsCheckoutOpen = () =>
  AppStore((state) => state.isCheckoutOpen);
export const useIsCartOpen = () => AppStore((state) => state.isCartOpen);
export const useAppActions = () => AppStore((state) => state.actions);
