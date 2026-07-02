import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type SessionType = 'gym' | 'study' | 'work' | 'run' | 'meditate' | string

type Session = {
  type:     SessionType
  label:    string
  icon:     string
  xpEarned: number
  loggedAt: string
}

type PetSpecies = 'redpanda' | 'koala' | 'penguin' | 'hedgehog' | 'leopard'
type Accessory  = 'none' | 'hat' | 'glasses' | 'crown' | 'scarf'
type Mood       = 'idle' | 'happy' | 'sad'

// Progreso individual de cada mascota
type PetProgress = {
  petName:          string
  accessory:        Accessory
  xp:               number
  level:            number
  coins:            number
  sessions:         Session[]
  ownedAccessories: Accessory[]
}

type PetStore = {
  // Mascota activa
  species: PetSpecies | null
  mood:    Mood

  // Progreso por mascota (clave = species id)
  pets: Partial<Record<PetSpecies, PetProgress>>

  // Acciones
  choosePet:      (species: PetSpecies, name: string) => void
  logSession:     (session: Omit<Session, 'loggedAt'>) => void
  removeSession:  (loggedAt: string) => void
  equipAccessory: (accessory: Accessory) => void
  buyAccessory:   (accessory: Accessory, cost: number) => boolean
  setMood:        (mood: Mood) => void
}

function calcLevel(xp: number)       { return Math.floor(xp / 50) + 1 }
function calcCoinsFromXp(xp: number) { return Math.floor(xp / 10) }

// Progreso vacío para una mascota nueva
function defaultProgress(name: string): PetProgress {
  return {
    petName:          name,
    accessory:        'none',
    xp:               0,
    level:            1,
    coins:            0,
    sessions:         [],
    ownedAccessories: ['none'],
  }
}

// Helper para leer el progreso de la mascota activa
function activePet(state: PetStore): PetProgress | null {
  if (!state.species) return null
  return state.pets[state.species] ?? null
}

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      species: null,
      mood:    'idle',
      pets:    {},

      choosePet: (species, name) => set((state) => ({
        species,
        pets: {
          ...state.pets,
          // Si ya existe, mantenemos su progreso; si es nueva, empezamos de cero
          [species]: state.pets[species] ?? defaultProgress(name),
        },
      })),

      logSession: (session) => set((state) => {
        if (!state.species) return state
        const pet    = state.pets[state.species] ?? defaultProgress('')
        const newXp  = pet.xp + session.xpEarned
        const earned = calcCoinsFromXp(newXp) - calcCoinsFromXp(pet.xp)

        return {
          mood: 'happy',
          pets: {
            ...state.pets,
            [state.species]: {
              ...pet,
              xp:       newXp,
              level:    calcLevel(newXp),
              coins:    pet.coins + earned,
              sessions: [{ ...session, loggedAt: new Date().toISOString() }, ...pet.sessions].slice(0, 20),
            },
          },
        }
      }),

      removeSession: (loggedAt) => set((state) => {
        if (!state.species) return state
        const pet     = state.pets[state.species]
        if (!pet) return state

        const session = pet.sessions.find(s => s.loggedAt === loggedAt)
        if (!session) return state

        const newXp    = Math.max(0, pet.xp - session.xpEarned)
        const lostCoins = calcCoinsFromXp(pet.xp) - calcCoinsFromXp(newXp)

        return {
          pets: {
            ...state.pets,
            [state.species]: {
              ...pet,
              xp:       newXp,
              level:    calcLevel(newXp),
              coins:    Math.max(0, pet.coins - lostCoins),
              sessions: pet.sessions.filter(s => s.loggedAt !== loggedAt),
            },
          },
        }
      }),

      equipAccessory: (accessory) => set((state) => {
        if (!state.species) return state
        const pet = state.pets[state.species]
        if (!pet) return state
        if (accessory !== 'none' && !pet.ownedAccessories.includes(accessory)) return state

        return {
          pets: {
            ...state.pets,
            [state.species]: { ...pet, accessory },
          },
        }
      }),

      buyAccessory: (accessory, cost) => {
        const state = get()
        if (!state.species) return false
        const pet = state.pets[state.species]
        if (!pet) return false
        if (pet.ownedAccessories.includes(accessory)) return false
        if (pet.coins < cost) return false

        set({
          pets: {
            ...state.pets,
            [state.species]: {
              ...pet,
              coins:            pet.coins - cost,
              ownedAccessories: [...pet.ownedAccessories, accessory],
            },
          },
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