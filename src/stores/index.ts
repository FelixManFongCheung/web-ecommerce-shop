import { create } from 'zustand'

export interface AppState {
  // State
  isOpen: boolean
  isCheckoutOpen: boolean
  isCartOpen: boolean

  // Actions
  toggleOpen: () => void
  toggleCheckoutDialog: () => void
  toggleCart: () => void
  openCart: () => void
}

const useAppStore = create<AppState>((set) => ({
  // Initial state
  isOpen: false,
  isCheckoutOpen: false,
  isCartOpen: false,

  // Actions
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleCheckoutDialog: () => set((state) => ({ isCheckoutOpen: !state.isCheckoutOpen })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
}))

export default useAppStore