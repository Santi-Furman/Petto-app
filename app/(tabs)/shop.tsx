import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Alert
} from 'react-native'
import { usePetStore } from '../../store/petStore'
import { ACCESSORIES } from '../../lib/xp'

export default function Shop() {
  const { species, pets, equipAccessory, buyAccessory } = usePetStore()

  const pet             = species ? pets[species] : null
  const coins           = pet?.coins           ?? 0
  const accessory       = pet?.accessory       ?? 'none'
  const ownedAccessories = pet?.ownedAccessories ?? ['none']

  const equippedItem     = ACCESSORIES.find(item => item.id === accessory)
  const ownedNotEquipped = ACCESSORIES.filter(
    item => ownedAccessories.includes(item.id as any) && item.id !== accessory
  )
  const purchasable = ACCESSORIES.filter(
    item => !ownedAccessories.includes(item.id as any)
  )

  function handleEquip(item: typeof ACCESSORIES[number]) {
    equipAccessory(item.id as any)
  }

  function handlePurchase(item: typeof ACCESSORIES[number]) {
    if (coins < item.cost) {
      Alert.alert(
        'Monedas insuficientes 🪙',
        `Necesitás ${item.cost} monedas. Tenés ${coins}.`,
        [{ text: 'Ok' }]
      )
      return
    }

    Alert.alert(
      `Comprar ${item.label}`,
      `¿Comprar por ${item.cost} 🪙?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Comprar',
          onPress: () => {
            const success = buyAccessory(item.id as any, item.cost)
            if (success) equipAccessory(item.id as any)
          },
        },
      ]
    )
  }

  if (!species || !pet) return null

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>

        {/* Header */}
        <View style={s.header}>
          <Text style={s.title}>Tienda 🛍️</Text>
          <View style={s.coinBadge}>
            <Text style={s.coinText}>🪙 {coins} monedas</Text>
          </View>
        </View>

        <Text style={s.subtitle}>
          Equipá accesorios a tu Petto. Ganás monedas completando sesiones.
        </Text>

        {/* Equipado */}
        {equippedItem && equippedItem.id !== 'none' && (
          <>
            <Text style={s.sectionTitle}>Equipado</Text>
            <View style={s.grid}>
              <View style={[s.card, s.cardEquipped]}>
                <Text style={s.cardIcon}>{equippedItem.icon}</Text>
                <Text style={s.cardLabel}>{equippedItem.label}</Text>
                <View style={s.equippedBadge}>
                  <Text style={s.equippedText}>Equipado</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Comprados, sin equipar */}
        {ownedNotEquipped.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Tus accesorios</Text>
            <View style={s.grid}>
              {ownedNotEquipped.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={s.card}
                  onPress={() => handleEquip(item)}
                  activeOpacity={0.75}
                >
                  <Text style={s.cardIcon}>{item.icon}</Text>
                  <Text style={s.cardLabel}>{item.label}</Text>
                  <View style={s.equipBadge}>
                    <Text style={s.equipText}>Equipar</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Por comprar */}
        {purchasable.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Por comprar</Text>
            <View style={s.grid}>
              {purchasable.map(item => {
                const canAfford = coins >= item.cost
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[s.card, !canAfford && s.cardLocked]}
                    onPress={() => handlePurchase(item)}
                    activeOpacity={0.75}
                  >
                    <Text style={s.cardIcon}>{item.icon}</Text>
                    <Text style={s.cardLabel}>{item.label}</Text>
                    <View style={[s.costBadge, !canAfford && s.costBadgeLocked]}>
                      <Text style={[s.costText, !canAfford && s.costTextLocked]}>
                        {item.cost} 🪙
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </>
        )}

        {/* Info */}
        <View style={s.infoCard}>
          <Text style={s.infoTitle}>¿Cómo ganar monedas?</Text>
          <Text style={s.infoText}>🏋️ Gym — 2 monedas</Text>
          <Text style={s.infoText}>🏃 Run — 1.8 monedas</Text>
          <Text style={s.infoText}>📚 Study — 1.5 monedas</Text>
          <Text style={s.infoText}>💼 Work — 1.5 monedas</Text>
          <Text style={s.infoText}>🧘 Meditate — 1.2 monedas</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container:       { flex: 1, backgroundColor: '#FDF6ED' },
  scroll:          { padding: 20, paddingBottom: 48 },

  header:          { flexDirection: 'row', justifyContent: 'space-between',
                     alignItems: 'center', marginBottom: 8 },
  title:           { fontSize: 26, fontWeight: '900', color: '#3A2A1A' },
  coinBadge:       { backgroundColor: '#FFFAF4', borderRadius: 20, borderWidth: 1,
                     borderColor: '#F0E0CC', paddingHorizontal: 14, paddingVertical: 6 },
  coinText:        { fontSize: 13, fontWeight: '700', color: '#3A2A1A' },
  subtitle:        { fontSize: 14, color: '#A08060', lineHeight: 22, marginBottom: 24 },

  sectionTitle:    { fontSize: 14, fontWeight: '800', color: '#3A2A1A', marginBottom: 12,
                     marginTop: 4 },

  grid:            { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  card:            { width: '47%', backgroundColor: '#FFFAF4', borderRadius: 18,
                     borderWidth: 1, borderColor: '#F0E0CC', padding: 18,
                     alignItems: 'center', gap: 8 },
  cardEquipped:    { borderColor: '#FF7A5C', backgroundColor: '#FFF0E8' },
  cardLocked:      { opacity: 0.45 },

  cardIcon:        { fontSize: 36 },
  cardLabel:       { fontSize: 14, fontWeight: '700', color: '#3A2A1A' },

  equippedBadge:   { backgroundColor: '#FF7A5C', borderRadius: 12,
                     paddingHorizontal: 12, paddingVertical: 4 },
  equippedText:    { fontSize: 11, fontWeight: '700', color: 'white' },

  equipBadge:      { backgroundColor: '#F0E0CC', borderRadius: 12,
                     paddingHorizontal: 12, paddingVertical: 4 },
  equipText:       { fontSize: 11, fontWeight: '700', color: '#8B5E3C' },

  costBadge:       { backgroundColor: '#F0E0CC', borderRadius: 12,
                     paddingHorizontal: 12, paddingVertical: 4 },
  costBadgeLocked: { backgroundColor: '#E8D8C0' },
  costText:        { fontSize: 11, fontWeight: '700', color: '#8B5E3C' },
  costTextLocked:  { color: '#B09070' },

  infoCard:        { backgroundColor: '#FFFAF4', borderRadius: 18, borderWidth: 1,
                     borderColor: '#F0E0CC', padding: 18, gap: 8 },
  infoTitle:       { fontSize: 14, fontWeight: '800', color: '#3A2A1A', marginBottom: 4 },
  infoText:        { fontSize: 13, color: '#A08060' },
})