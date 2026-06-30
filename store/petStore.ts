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

  // Acciones
  choosePet:      (species: PetSpecies, name: string) => void
  logSession:     (session: Omit<Session, 'loggedAt'>) => void
  removeSession:  (loggedAt: string) => void
  equipAccessory: (accessory: Accessory) => void
  setMood:        (mood: Mood) => void
}

function calcLevel(xp: number) { return Math.floor(xp / 50) + 1 }
function calcCoins(xp: number) { return Math.floor(xp / 10) }

export const usePetStore = create<PetStore>()(
  persist(
    (set) => ({
      species:   null,
      petName:   '',
      accessory: 'none',
      mood:      'idle',
      xp:        0,
      level:     1,
      coins:     0,
      sessions:  [],

      choosePet: (species, name) => set({ species, petName: name }),

      logSession: (session) => set((state) => {
        const newXp = state.xp + session.xpEarned
        return {
          xp:       newXp,
          level:    calcLevel(newXp),
          coins:    calcCoins(newXp),
          mood:     'happy',
          sessions: [{ ...session, loggedAt: new Date().toISOString() }, ...state.sessions].slice(0, 20),
        }
      }),

      removeSession: (loggedAt) => set((state) => {
        const session = state.sessions.find(s => s.loggedAt === loggedAt)
        if (!session) return state

        const newXp = Math.max(0, state.xp - session.xpEarned)
        return {
          xp:       newXp,
          level:    calcLevel(newXp),
          coins:    calcCoins(newXp),
          sessions: state.sessions.filter(s => s.loggedAt !== loggedAt),
        }
      }),

      equipAccessory: (accessory) => set({ accessory }),
      setMood:        (mood)      => set({ mood }),
    }),
    {
      name:    'petto-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)