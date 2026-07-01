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

