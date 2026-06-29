import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView
} from 'react-native'
import { router } from 'expo-router'
import { usePetStore } from '../../store/petStore'
import { PETS, xpProgressInLevel, xpToNextLevel } from '../../lib/xp'

export default function Profile() {
  const { species, petName, xp, level, coins, sessions, choosePet } = usePetStore()

  const pet      = PETS.find(p => p.id === species)
  const progress = xpProgressInLevel(xp)
  const xpToNext = xpToNextLevel(xp)

  const sessionCounts = sessions.reduce((acc, s) => {
    acc[s.type] = (acc[s.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  function handleReset() {
    choosePet('' as any, '')
    router.replace('/onboarding/pick-pet')
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>

        {/* Header */}
        <Text style={s.title}>Perfil 👤</Text>

        {/* Tarjeta de mascota */}
        <View style={s.card}>
          <View style={s.petInfo}>
            <View style={s.petDot} />
            <View>
              <Text style={s.petName}>{petName}</Text>
              <Text style={s.petType}>{pet?.type}</Text>
            </View>
          </View>

          {/* XP Bar */}
          <View style={s.xpRow}>
            <Text style={s.xpLabel}>Nivel {level}</Text>
            <Text style={s.xpLabel}>Nivel {level + 1}</Text>
          </View>
          <View style={s.xpTrack}>
            <View style={[s.xpFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={s.xpSub}>{xpToNext} XP para el próximo nivel</Text>
        </View>

        {/* Stats generales */}
        <Text style={s.sectionTitle}>Estadísticas</Text>
        <View style={s.statsGrid}>
          {[
            { label: 'XP total',   value: xp,              icon: '⭐' },
            { label: 'Nivel',      value: level,            icon: '🏆' },
            { label: 'Monedas',    value: coins,            icon: '🪙' },
            { label: 'Sesiones',   value: sessions.length,  icon: '📅' },
          ].map(stat => (
            <View key={stat.label} style={s.statCard}>
              <Text style={s.statIcon}>{stat.icon}</Text>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Sesiones por tipo */}
        {sessions.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Sesiones por tipo</Text>
            <View style={s.card}>
              {Object.entries(sessionCounts).map(([type, count]) => (
                <View key={type} style={s.typeRow}>
                  <Text style={s.typeLabel}>{type}</Text>
                  <View style={s.typeBarTrack}>
                    <View style={[
                      s.typeBarFill,
                      { width: `${(count / sessions.length) * 100}%` }
                    ]} />
                  </View>
                  <Text style={s.typeCount}>{count}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Historial */}
        {sessions.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Historial</Text>
            <View style={s.card}>
              {sessions.map((session, i) => (
                <View
                  key={i}
                  style={[s.historyRow, i < sessions.length - 1 && s.historyRowBorder]}
                >
                  <Text style={s.historyIcon}>{session.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={s.historyLabel}>{session.label}</Text>
                    <Text style={s.historyTime}>
                      {new Date(session.loggedAt).toLocaleString([], {
                        month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </Text>
                  </View>
                  <Text style={s.historyXp}>+{session.xpEarned} XP</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Cambiar mascota */}
        <TouchableOpacity style={s.resetBtn} onPress={handleReset}>
          <Text style={s.resetText}>Cambiar mascota →</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#FDF6ED' },
  scroll:         { padding: 20, paddingBottom: 48 },

  title:          { fontSize: 26, fontWeight: '900', color: '#3A2A1A', marginBottom: 20 },

  card:           { backgroundColor: '#FFFAF4', borderRadius: 18, borderWidth: 1,
                    borderColor: '#F0E0CC', padding: 18, marginBottom: 20 },

  petInfo:        { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  petDot:         { width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF7A5C' },
  petName:        { fontSize: 18, fontWeight: '800', color: '#3A2A1A' },
  petType:        { fontSize: 12, color: '#A08060', marginTop: 2 },

  xpRow:          { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  xpLabel:        { fontSize: 12, fontWeight: '700', color: '#A08060' },
  xpTrack:        { height: 10, backgroundColor: '#F0E0CC', borderRadius: 10,
                    overflow: 'hidden', marginBottom: 6 },
  xpFill:         { height: '100%', backgroundColor: '#FF7A5C', borderRadius: 10 },
  xpSub:          { fontSize: 11, color: '#A08060' },

  sectionTitle:   { fontSize: 14, fontWeight: '800', color: '#3A2A1A', marginBottom: 12 },

  statsGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  statCard:       { width: '47%', backgroundColor: '#FFFAF4', borderRadius: 16,
                    borderWidth: 1, borderColor: '#F0E0CC', padding: 16, alignItems: 'center', gap: 4 },
  statIcon:       { fontSize: 24 },
  statValue:      { fontSize: 22, fontWeight: '900', color: '#FF7A5C' },
  statLabel:      { fontSize: 11, color: '#A08060' },

  typeRow:        { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  typeLabel:      { fontSize: 12, fontWeight: '600', color: '#3A2A1A', width: 70 },
  typeBarTrack:   { flex: 1, height: 6, backgroundColor: '#F0E0CC',
                    borderRadius: 6, overflow: 'hidden' },
  typeBarFill:    { height: '100%', backgroundColor: '#FF7A5C', borderRadius: 6 },
  typeCount:      { fontSize: 12, fontWeight: '700', color: '#A08060', width: 20, textAlign: 'right' },

  historyRow:     { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  historyRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F0E0CC' },
  historyIcon:    { fontSize: 20 },
  historyLabel:   { fontSize: 13, fontWeight: '700', color: '#3A2A1A' },
  historyTime:    { fontSize: 11, color: '#A08060', marginTop: 2 },
  historyXp:      { fontSize: 13, fontWeight: '800', color: '#FF7A5C' },

  resetBtn:       { alignItems: 'center', marginTop: 8 },
  resetText:      { fontSize: 14, fontWeight: '700', color: '#FF7A5C' },
})