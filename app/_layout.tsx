import { useEffect, useState } from 'react'
import { Stack, router } from 'expo-router'
import { usePetStore } from '../store/petStore'

export default function RootLayout() {
  const species  = usePetStore(s => s.species)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const unsub = usePetStore.persist.onFinishHydration(() => {
      setReady(true)
    })

    if (usePetStore.persist.hasHydrated()) {
      setReady(true)
    }

    return unsub
  }, [])

  useEffect(() => {
    if (!ready) return

    if (species) {
      router.replace('/(tabs)/home')
    } else {
      router.replace('/onboarding/pick-pet')
    }
  }, [ready, species])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding/pick-pet" />
      <Stack.Screen name="(tabs)"              />
    </Stack>
  )
}