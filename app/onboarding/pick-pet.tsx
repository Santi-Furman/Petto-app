import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Dimensions
} from 'react-native'
import { router } from 'expo-router'
import { PetViewer } from '../../components/PetViewer'
import { usePetStore } from '../../store/petStore'
import { PETS } from '../../lib/xp'

const { width } = Dimensions.get('window')

export default function PickPet() {
  const [selected, setSelected] = useState<string | null>(null)
  const choosePet = usePetStore(s => s.choosePet)

  function handleConfirm() {
    if (!selected) return
    const pet = PETS.find(p => p.id === selected)!
    choosePet(selected as any, pet.name)
    router.replace('/(tabs)/home')
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>

        {/* Header */}
        <Text style={s.tag}>🌱 Tu nuevo compañero</Text>
        <Text style={s.title}>Elegí tu{'\n'}<Text style={s.titleAccent}>Petto</Text></Text>
        <Text style={s.subtitle}>
          Una mascota que crece con vos. Cada sesión que completás la hace más feliz.
        </Text>

        {/* Preview de la mascota seleccionada */}
        <View style={s.previewCard}>
          {selected ? (
            <>
              <PetViewer
                species={selected as any}
                mood="idle"
                size={180}
              />
              <Text style={s.previewName}>
                {PETS.find(p => p.id === selected)?.name}
              </Text>
              <Text style={s.previewType}>
                {PETS.find(p => p.id === selected)?.type}
              </Text>
            </>
          ) : (
            <Text style={s.previewPlaceholder}>
              Tocá una mascota para verla 👆
            </Text>
          )}
        </View>

        {/* Lista de mascotas */}
        {PETS.map(pet => (
          <TouchableOpacity
            key={pet.id}
            style={[s.petRow, selected === pet.id && s.petRowSelected]}
            onPress={() => setSelected(pet.id)}
            activeOpacity={0.7}
          >
            <View style={s.petRowIcon}>
              <PetViewer species={pet.id as any} mood="idle" size={64} />
            </View>
            <View style={s.petRowInfo}>
              <Text style={s.petRowName}>{pet.name}</Text>
              <Text style={s.petRowType}>The {pet.type}</Text>
            </View>
            {selected === pet.id && (
              <Text style={s.petRowCheck}>✓</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Botón confirmar */}
        {selected && (
          <TouchableOpacity
            style={s.btn}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text style={s.btnText}>¡Vamos! 🚀</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container:          { flex: 1, backgroundColor: '#FDF6ED' },
  scroll:             { padding: 24, paddingBottom: 48 },

  tag:                { alignSelf: 'flex-start', backgroundColor: '#A8E6CF', borderRadius: 24,
                        paddingHorizontal: 14, paddingVertical: 4, fontSize: 13,
                        fontWeight: '700', color: '#3BBFA3', marginBottom: 14 },
  title:              { fontSize: 42, fontWeight: '900', color: '#3A2A1A',
                        lineHeight: 46, marginBottom: 10 },
  titleAccent:        { color: '#FF7A5C' },
  subtitle:           { fontSize: 15, color: '#A08060', lineHeight: 24, marginBottom: 28 },

  previewCard:        { backgroundColor: '#FFFAF4', borderRadius: 24, borderWidth: 1,
                        borderColor: '#F0E0CC', padding: 28, alignItems: 'center',
                        marginBottom: 24, minHeight: 240, justifyContent: 'center' },
  previewName:        { fontSize: 22, fontWeight: '800', color: '#3A2A1A', marginTop: 12 },
  previewType:        { fontSize: 13, color: '#A08060', marginTop: 2 },
  previewPlaceholder: { fontSize: 15, color: '#C8A880' },

  petRow:             { backgroundColor: '#FFFAF4', borderRadius: 18, borderWidth: 1,
                        borderColor: '#F0E0CC', padding: 12, flexDirection: 'row',
                        alignItems: 'center', marginBottom: 10 },
  petRowSelected:     { borderColor: '#FF7A5C', backgroundColor: '#FFF0E8' },
  petRowIcon:         { width: 72, height: 72, justifyContent: 'center', alignItems: 'center' },
  petRowInfo:         { flex: 1, marginLeft: 12 },
  petRowName:         { fontSize: 16, fontWeight: '800', color: '#3A2A1A' },
  petRowType:         { fontSize: 12, color: '#A08060', marginTop: 2 },
  petRowCheck:        { fontSize: 20, color: '#FF7A5C', marginRight: 8 },

  btn:                { backgroundColor: '#FF7A5C', borderRadius: 32, padding: 16,
                        alignItems: 'center', marginTop: 8 },
  btnText:            { color: 'white', fontSize: 16, fontWeight: '800' },
})