import { useEffect } from 'react'
import { Stack, router } from 'expo-router'
import { usePetStore } from '../store/petStore'

export default function RootLayout() {
  const species = usePetStore(s => s.species)

  useEffect(() => {
    if (species) {
      router.replace('/(tabs)/home')
    } else {
      router.replace('/onboarding/pick-pet')
    }
  }, [species])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding/pick-pet" />
      <Stack.Screen name="(tabs)"              />
    </Stack>
  )
}