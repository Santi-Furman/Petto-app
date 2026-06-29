import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, Alert
} from 'react-native'
import { usePetStore } from '../../store/petStore'
import { ACCESSORIES } from '../../lib/xp'

export default function Shop() {
  const { coins, accessory, equipAccessory } = usePetStore()

  function handleBuy(item: typeof ACCESSORIES[number]) {
    if (item.id === 'none') {
      equipAccessory('none')
      return
    }
    if (coins < item.cost) {
      Alert.alert(
        'Monedas insuficientes 🪙',
        `Necesitás ${item.cost} monedas. Tenés ${coins}.`,
        [{ text: 'Ok' }]
      )
      return
    }
    equipAccessory(item.id as any)
  }

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

        {/* Grid de accesorios */}
        <Text style={s.sectionTitle}>Accesorios</Text>
        <View style={s.grid}>
          {ACCESSORIES.map(item => {
            const isEquipped  = accessory === item.id
            const canAfford   = coins >= item.cost || item.cost === 0
            const isFree      = item.cost === 0

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  s.card,
                  isEquipped  && s.cardEquipped,
                  !canAfford  && s.cardLocked,
                ]}
                onPress={() => handleBuy(item)}
                activeOpacity={0.75}
              >
                <Text style={s.cardIcon}>{item.icon}</Text>
                <Text style={s.cardLabel}>{item.label}</Text>

                {isEquipped ? (
                  <View style={s.equippedBadge}>
                    <Text style={s.equippedText}>Equipado</Text>
                  </View>
                ) : (
                  <View style={[s.costBadge, !canAfford && s.costBadgeLocked]}>
                    <Text style={[s.costText, !canAfford && s.costTextLocked]}>
                      {isFree ? 'Gratis' : `${item.cost} 🪙`}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </View>

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

  sectionTitle:    { fontSize: 14, fontWeight: '800', color: '#3A2A1A', marginBottom: 12 },

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