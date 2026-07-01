import { RedPanda  } from './pets/RedPanda'
import { Koala     } from './pets/Koala'
import { Penguin   } from './pets/Penguin'
import { Hedgehog  } from './pets/Hedgehog'
import { Leopard   } from './pets/Leopard'

type Species  = 'redpanda' | 'koala' | 'penguin' | 'hedgehog' | 'leopard'
type Mood     = 'idle' | 'happy' | 'sad'
type Accessory = 'none' | 'hat' | 'glasses' | 'crown' | 'scarf'

type Props = {
  species:    Species
  mood?:      Mood
  size?:      number
  accessory?: Accessory
}

const PET_MAP = {
  redpanda: RedPanda,
  koala:    Koala,
  penguin:  Penguin,
  hedgehog: Hedgehog,
  leopard:  Leopard,
}

export function PetViewer({ species, mood = 'idle', size = 180, accessory = 'none' }: Props) {
  const PetComponent = PET_MAP[species]
  return <PetComponent mood={mood} size={size} accessory={accessory} />
}