import { Image } from 'react-native'

type Props = {
  mood?: 'idle' | 'happy' | 'sad'
  size?: number
}

export function Penguin({ size = 180 }: Props) {
  return (
    <Image
      source={require('../../assets/illustrations/penguin.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  )
}