import { useEffect, useState, useRef } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView
} from 'react-native'
import * as Haptics from 'expo-haptics'
import { PetViewer } from '../../components/PetViewer'
import { usePetStore } from '../../store/petStore'
import { SESSION_TYPES, xpProgressInLevel, xpToNextLevel } from '../../lib/xp'

export default function Home() {
  const { species, petName, mood, xp, level, coins, sessions, logSession, setMood, removeSession } = usePetStore()

  const [undoTimer, setUndoTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [showUndo, setShowUndo]   = useState(false)
  const prevLevel = useRef(level)

  // Vuelve a idle después de 3 segundos de happy
  useEffect(() => {
    if (mood === 'happy') {
      const t = setTimeout(() => setMood('idle'), 3000)
      return () => clearTimeout(t)
    }
  }, [mood])

  // Detecta subida de nivel y dispara vibración de logro
  useEffect(() => {
    if (level > prevLevel.current) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
    prevLevel.current = level
  }, [level])

  if (!species) return null

  const progress    = xpProgressInLevel(xp)
  const xpToNext    = xpToNextLevel(xp)
  const lastSession = sessions[0]

  function handleSession(st: typeof SESSION_TYPES[number]) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    logSession({
      type:     st.id as any,
      label:    st.label,
      icon:     st.icon,
      xpEarned: st.xp,
    })

    setShowUndo(true)
    if (undoTimer) clearTimeout(undoTimer)
    const timer = setTimeout(() => setShowUndo(false), 5000)
    setUndoTimer(timer)
  }

  function handleUndo() {
    if (sessions[0]) {
      removeSession(sessions[0].loggedAt)
    }
    setShowUndo(false)
    if (undoTimer) clearTimeout(undoTimer)
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scroll}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Hola 👋</Text>
            <Text style={s.headerTitle}>{petName} te espera</Text>
          </View>
          <View style={s.coinBadge}>
            <Text style={s.coinText}>🪙 {coins}</Text>
          </View>
        </View>

        {/* Toast de deshacer */}
        {showUndo && (
          <View style={s.undoToast}>
            <Text style={s.undoText}>Sesión registrada ✓</Text>
            <TouchableOpacity onPress={handleUndo}>
              <Text style={s.undoBtn}>Deshacer</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tarjeta de la mascota */}
        <View style={s.petCard}>

          {/* Stats arriba */}
          <View style={s.statsRow}>
            <View style={s.statBox}>
              <Text style={s.statValue}>{xp}</Text>
              <Text style={s.statLabel}>XP total</Text>
            </View>
            <View style={s.statBox}>
              <Text style={s.statValue}>{level}</Text>
              <Text style={s.statLabel}>Nivel</Text>
            </View>
            <View style={s.statBox}>
              <Text style={s.statValue}>{sessions.length}</Text>
              <Text style={s.statLabel}>Sesiones</Text>
            </View>
          </View>

          {/* Mascota */}
          <View style={s.petWrapper}>
            <PetViewer species={species} mood={mood} size={200} />
          </View>

          {/* Nombre y nivel */}
          <Text style={s.petName}>
            {petName} {mood === 'happy' ? '😊' : ''}
          </Text>
          <Text style={s.petLevel}>Nivel {level}</Text>

          {/* XP Bar */}
          <View style={s.xpBarTrack}>
            <View style={[s.xpBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={s.xpBarLabel}>{xpToNext} XP para nivel {level + 1}</Text>

        </View>

        {/* Registrar sesión */}
        <Text style={s.sectionTitle}>⚡ Registrar sesión</Text>
        <View style={s.sessionGrid}>
          {SESSION_TYPES.map(st => (
            <TouchableOpacity
              key={st.id}
              style={[s.sessionBtn, { backgroundColor: st.color }]}
              onPress={() => handleSession(st)}
              activeOpacity={0.75}
            >
              <Text style={s.sessionIcon}>{st.icon}</Text>
              <Text style={s.sessionLabel}>{st.label}</Text>
              <Text style={s.sessionXp}>+{st.xp} XP</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Última sesión */}
        {lastSession && (
          <>
            <Text style={s.sectionTitle}>📋 Última sesión</Text>
            <View style={s.lastSession}>
              <Text style={s.lastSessionIcon}>{lastSession.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.lastSessionLabel}>{lastSession.label}</Text>
                <Text style={s.lastSessionTime}>
                  {new Date(lastSession.loggedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              <Text style={s.lastSessionXp}>+{lastSession.xpEarned} XP</Text>
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container:        { flex: 1, backgroundColor: '#FDF6ED' },
  scroll:           { padding: 20, paddingBottom: 48 },

  header:           { flexDirection: 'row', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: 20 },
  greeting:         { fontSize: 13, color: '#A08060', fontWeight: '600' },
  headerTitle:      { fontSize: 22, fontWeight: '900', color: '#3A2A1A' },
  coinBadge:        { backgroundColor: '#FFFAF4', borderRadius: 20, borderWidth: 1,
                      borderColor: '#F0E0CC', paddingHorizontal: 14, paddingVertical: 6 },
  coinText:         { fontSize: 14, fontWeight: '700', color: '#3A2A1A' },

  undoToast:        { backgroundColor: '#3A2A1A', borderRadius: 14, padding: 14,
                      flexDirection: 'row', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: 16 },
  undoText:         { color: '#FDF6ED', fontSize: 13, fontWeight: '600' },
  undoBtn:          { color: '#FFE57A', fontSize: 13, fontWeight: '800' },

  petCard:          { backgroundColor: '#FFFAF4', borderRadius: 24, borderWidth: 1,
                      borderColor: '#F0E0CC', padding: 20, alignItems: 'center', marginBottom: 24 },
  statsRow:         { flexDirection: 'row', gap: 16, marginBottom: 8 },
  statBox:          { alignItems: 'center' },
  statValue:        { fontSize: 20, fontWeight: '900', color: '#FF7A5C' },
  statLabel:        { fontSize: 11, color: '#A08060', marginTop: 2 },

  petWrapper:       { marginVertical: 8 },
  petName:          { fontSize: 22, fontWeight: '800', color: '#3A2A1A', marginTop: 8 },
  petLevel:         { fontSize: 13, color: '#A08060', marginBottom: 14 },

  xpBarTrack:       { width: '100%', height: 10, backgroundColor: '#F0E0CC',
                      borderRadius: 10, overflow: 'hidden', marginBottom: 6 },
  xpBarFill:        { height: '100%', backgroundColor: '#FF7A5C', borderRadius: 10 },
  xpBarLabel:       { fontSize: 11, color: '#A08060' },

  sectionTitle:     { fontSize: 14, fontWeight: '800', color: '#3A2A1A', marginBottom: 12 },

  sessionGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  sessionBtn:       { width: '30%', borderRadius: 16, padding: 14,
                      alignItems: 'center', gap: 4 },
  sessionIcon:      { fontSize: 24 },
  sessionLabel:     { fontSize: 12, fontWeight: '800', color: '#3A2A1A' },
  sessionXp:        { fontSize: 10, fontWeight: '600', color: '#A08060' },

  lastSession:      { backgroundColor: '#FFFAF4', borderRadius: 16, borderWidth: 1,
                      borderColor: '#F0E0CC', padding: 14, flexDirection: 'row',
                      alignItems: 'center', gap: 12 },
  lastSessionIcon:  { fontSize: 24 },
  lastSessionLabel: { fontSize: 14, fontWeight: '700', color: '#3A2A1A' },
  lastSessionTime:  { fontSize: 12, color: '#A08060', marginTop: 2 },
  lastSessionXp:    { fontSize: 14, fontWeight: '800', color: '#FF7A5C' },
})