import { useState, useRef } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, FlatList, Dimensions
} from 'react-native'
import { router } from 'expo-router'
import { PetViewer } from '../../components/PetViewer'
import { usePetStore } from '../../store/petStore'
import { PETS } from '../../lib/xp'

const { width } = Dimensions.get('window')

export default function PickPet() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)
  const choosePet = usePetStore(s => s.choosePet)

  const currentPet = PETS[currentIndex]

  function handleConfirm() {
    choosePet(currentPet.id as any, currentPet.name)
    router.replace('/(tabs)/home')
  }

  function handleScroll(e: any) {
    const index = Math.round(e.nativeEvent.contentOffset.x / width)
    setCurrentIndex(index)
  }

  return (
    <SafeAreaView style={s.container}>

      {/* Header */}
      <View style={s.header}>
        <Text style={s.tag}>🌱 Tu nuevo compañero</Text>
        <Text style={s.title}>Elegí tu{'\n'}<Text style={s.titleAccent}>Petto</Text></Text>
        <Text style={s.subtitle}>Deslizá para conocerlos a todos</Text>
      </View>

      {/* Carrusel */}
      <FlatList
        ref={flatListRef}
        data={PETS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={s.slide}>
            <View style={s.petCard}>
              <PetViewer species={item.id as any} mood="idle" size={220} />
            </View>
            <Text style={s.petName}>{item.name}</Text>
            <Text style={s.petType}>The {item.type}</Text>
          </View>
        )}
      />

      {/* Dots indicadores */}
      <View style={s.dots}>
        {PETS.map((_, i) => (
          <View
            key={i}
            style={[s.dot, i === currentIndex && s.dotActive]}
          />
        ))}
      </View>

      {/* Botón confirmar */}
      <View style={s.footer}>
        <TouchableOpacity
          style={s.btn}
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <Text style={s.btnText}>
            Elegir a {currentPet.name} 🐾
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#FDF6ED' },

  header:      { paddingHorizontal: 28, paddingTop: 20, paddingBottom: 8, alignItems: 'center' },
  tag:         { backgroundColor: '#A8E6CF', borderRadius: 24, paddingHorizontal: 14,
                 paddingVertical: 4, fontSize: 13, fontWeight: '700', color: '#3BBFA3', marginBottom: 12 },
  title:       { fontSize: 38, fontWeight: '900', color: '#3A2A1A',
                 lineHeight: 42, marginBottom: 6, textAlign: 'center' },
  titleAccent: { color: '#FF7A5C' },
  subtitle:    { fontSize: 14, color: '#A08060', textAlign: 'center' },

  slide:       { width, alignItems: 'center', paddingTop: 24, paddingBottom: 8 },
  petCard:     { width: width * 0.72, aspectRatio: 1, backgroundColor: '#FFFAF4',
                 borderRadius: 36, borderWidth: 1, borderColor: '#F0E0CC',
                 alignItems: 'center', justifyContent: 'center',
                 shadowColor: '#000', shadowOffset: { width: 0, height: 6 },
                 shadowOpacity: 0.08, shadowRadius: 16, elevation: 4 },
  petName:     { fontSize: 28, fontWeight: '900', color: '#3A2A1A', marginTop: 20 },
  petType:     { fontSize: 14, color: '#A08060', marginTop: 4 },

  dots:        { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 16 },
  dot:         { width: 8, height: 8, borderRadius: 4, backgroundColor: '#F0E0CC' },
  dotActive:   { backgroundColor: '#FF7A5C', width: 20 },

  footer:      { padding: 24, paddingBottom: 36 },
  btn:         { backgroundColor: '#FF7A5C', borderRadius: 32, padding: 16, alignItems: 'center' },
  btnText:     { color: 'white', fontSize: 16, fontWeight: '800' },
})