import { useEffect, useState } from 'react'
import { View, Image } from 'react-native'

type Props = {
  mood?: 'idle' | 'happy' | 'sad'
  size?: number
}

const ANIMATIONS = {
  idle: require('../../assets/illustrations/penguin.png'),
  happy: require('../../assets/illustrations/penguin.png'),
  sad: require('../../assets/illustrations/penguin.png'),
}

export function Penguin({ mood = 'idle', size = 140 }: Props) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % 6)
    }, 120)

    return () => clearInterval(timer)
  }, [])

  return (
    <View
      style={{
        width: size,
        height: size,
        overflow: 'hidden',
      }}
    >
      <Image
        source={ANIMATIONS[mood]}
        style={{
          width: size * 6,
          height: size,
          transform: [
            {
              translateX: -frame * size,
            },
          ],
        }}
        resizeMode="contain"
      />
    </View>
  )
}