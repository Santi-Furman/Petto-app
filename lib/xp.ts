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