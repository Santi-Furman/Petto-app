import { Image } from 'react-native'

type Accessory = 'none' | 'hat' | 'glasses' | 'crown' | 'scarf'

type Props = {
  mood?:      'idle' | 'happy' | 'sad'
  size?:      number
  accessory?: Accessory
}

export function Penguin({ size = 180, accessory = 'none' }: Props) {
  return (
    <Image
      source={require('../../assets/illustrations/penguin.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  )
}