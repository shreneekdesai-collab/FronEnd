import { create } from 'zustand'
import type { User } from '@/api/types'

interface AppState { user: User | null; theme: 'dark' | 'light'; reducedMotion: boolean; setUser: (user: User | null) => void; toggleTheme: () => void; setReducedMotion: (value: boolean) => void }
export const useAppStore = create<AppState>((set) => ({ user: { id: 'u_01', name: 'Alex Morgan', email: 'alex@memorynest.app' }, theme: 'dark', reducedMotion: false, setUser: (user) => set({ user }), toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })), setReducedMotion: (reducedMotion) => set({ reducedMotion }) }))
