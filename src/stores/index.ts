import { create } from 'zustand'

interface AppState {
  // State
  isOpen: boolean
  isCheckoutOpen: boolean

  // Actions
  toggleOpen: () => void
  toggleCheckoutDialog: () => void
}

const useAppStore = create<AppState>((set) => ({
  // Initial state
  isOpen: false,
  isCheckoutOpen: false,
  // Actions
  toggleOpen: () => set((state) => ({isOpen: !state.isOpen})),

  toggleCheckoutDialog: () => set((state) => ({isCheckoutOpen: !state.isCheckoutOpen}))
}))

export default useAppStore