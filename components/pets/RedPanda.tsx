import { Image } from 'react-native'

type Accessory = 'none' | 'hat' | 'glasses' | 'crown' | 'scarf'

type Props = {
  mood?:      'idle' | 'happy' | 'sad'
  size?:      number
  accessory?: Accessory
}

export function RedPanda({ size = 180, accessory = 'none' }: Props) {
  return (
    <Image
      source={require('../../assets/illustrations/redPanda.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  )
}