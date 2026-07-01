import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type SessionType = 'gym' | 'study' | 'work' | 'run' | 'meditate'

type Session = {
  type: SessionType
  label: string
  icon: string
  xpEarned: number
  loggedAt: string
}

type PetSpecies = 'redpanda' | 'koala' | 'penguin' | 'hedgehog' | 'leopard'
type Accessory  = 'none' | 'hat' | 'glasses' | 'crown' | 'scarf'
type Mood       = 'idle' | 'happy' | 'sad'

type PetStore = {
  // Mascota
  species:   PetSpecies | null
  petName:   string
  accessory: Accessory
  mood:      Mood

  // Progreso
  xp:      number
  level:   number
  coins:   number
  sessions: Session[]

  // Tienda
  ownedAccessories: Accessory[]

  // Acciones
  choosePet:      (species: PetSpecies, name: string) => void
  logSession:     (session: Omit<Session, 'loggedAt'>) => void
  removeSession:  (loggedAt: string) => void
  equipAccessory: (accessory: Accessory) => void
  buyAccessory:   (accessory: Accessory, cost: number) => boolean
  setMood:        (mood: Mood) => void
}

function calcLevel(xp: number) { return Math.floor(xp / 50) + 1 }
function calcCoinsFromXp(xp: number) { return Math.floor(xp / 10) }

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      species:   null,
      petName:   '',
      accessory: 'none',
      mood:      'idle',
      xp:        0,
      level:     1,
      coins:     0,
      sessions:  [],

      ownedAccessories: ['none'],

      choosePet: (species, name) => set({ species, petName: name }),

      // coins ahora es un BALANCE real: se incrementa con lo ganado en la
      // sesion (delta), no se recalcula entero desde el xp. Asi lo gastado
      // en la tienda no se "regenera" solo.
      logSession: (session) => set((state) => {
        const newXp = state.xp + session.xpEarned
        const earnedCoins = calcCoinsFromXp(newXp) - calcCoinsFromXp(state.xp)
        return {
          xp:       newXp,
          level:    calcLevel(newXp),
          coins:    state.coins + earnedCoins,
          mood:     'happy',
          sessions: [{ ...session, loggedAt: new Date().toISOString() }, ...state.sessions].slice(0, 20),
        }
      }),

      removeSession: (loggedAt) => set((state) => {
        const session = state.sessions.find(s => s.loggedAt === loggedAt)
        if (!session) return state

        const newXp = Math.max(0, state.xp - session.xpEarned)
        const lostCoins = calcCoinsFromXp(state.xp) - calcCoinsFromXp(newXp)
        return {
          xp:       newXp,
          level:    calcLevel(newXp),
          coins:    Math.max(0, state.coins - lostCoins),
          sessions: state.sessions.filter(s => s.loggedAt !== loggedAt),
        }
      }),

      equipAccessory: (accessory) => set((state) => {
        // Solo se puede equipar algo que ya se compro (o 'none', que es gratis)
        if (accessory !== 'none' && !state.ownedAccessories.includes(accessory)) {
          return state
        }
        return { accessory }
      }),

      // Devuelve true si la compra se concreto, false si no habia monedas
      // o ya estaba comprado
      buyAccessory: (accessory, cost) => {
        const state = get()
        if (state.ownedAccessories.includes(accessory)) return false
        if (state.coins < cost) return false

        set({
          coins:            state.coins - cost,
          ownedAccessories: [...state.ownedAccessories, accessory],
        })
        return true
      },

      setMood: (mood) => set({ mood }),
    }),
    {
      name:    'petto-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export const SESSION_TYPES = [
  { id: 'gym',      label: 'Gym',      icon: '🏋️', xp: 20, color: '#FFCBB5' },
  { id: 'study',    label: 'Study',    icon: '📚', xp: 15, color: '#D9D0FF' },
  { id: 'work',     label: 'Work',     icon: '💼', xp: 15, color: '#B8EDD9' },
  { id: 'run',      label: 'Run',      icon: '🏃', xp: 18, color: '#FFE9A0' },
  { id: 'meditate', label: 'Meditate', icon: '🧘', xp: 12, color: '#FFD6E0' },
] as const

export const ACCESSORIES = [
  { id: 'none',    label: 'None',        icon: '✕', cost: 0  },
  { id: 'hat',     label: 'Party hat',   icon: '🎉', cost: 5  },
  { id: 'glasses', label: 'Cool shades', icon: '😎', cost: 8  },
  { id: 'crown',   label: 'Crown',       icon: '👑', cost: 15 },
  { id: 'scarf',   label: 'Cozy scarf',  icon: '🧣', cost: 10 },
] as const

export const PETS = [
  { id: 'redpanda', name: 'Ringo',  type: 'Red Panda',          color: '#C85A1A' },
  { id: 'koala',    name: 'Cloudy', type: 'Koala',              color: '#9A9290' },
  { id: 'penguin',  name: 'Tux',    type: 'Penguin',            color: '#2A2E3A' },
  { id: 'hedgehog', name: 'Pip',    type: 'Four-toed Hedgehog', color: '#7A6A50' },
  { id: 'leopard',  name: 'Dottie', type: 'Leopard',            color: '#D4A040' },
] as const

export function xpToLevel(xp: number): number {
  return Math.floor(xp / 50) + 1
}

export function xpToCoins(xp: number): number {
  return Math.floor(xp / 10)
}

export function xpToNextLevel(xp: number): number {
  return 50 - (xp % 50)
}

export function xpProgressInLevel(xp: number): number {
  return (xp % 50) / 50
}