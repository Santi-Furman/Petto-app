import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown:     false,
        tabBarStyle: {
          backgroundColor: '#FFFAF4',
          borderTopColor:  '#F0E0CC',
          height:          60,
          paddingBottom:   8,
        },
        tabBarActiveTintColor:   '#FF7A5C',
        tabBarInactiveTintColor: '#A08060',
        tabBarLabelStyle: {
          fontSize:   11,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title:        'Inicio',
          tabBarIcon:   ({ color }) => (
            <TabIcon emoji="🐾" active={color === '#FF7A5C'} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title:       'Tienda',
          tabBarIcon:  ({ color }) => (
            <TabIcon emoji="🛍️" active={color === '#FF7A5C'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title:       'Perfil',
          tabBarIcon:  ({ color }) => (
            <TabIcon emoji="👤" active={color === '#FF7A5C'} />
          ),
        }}
      />
    </Tabs>
  )
}

function TabIcon({ emoji, active }: { emoji: string, active: boolean }) {
  const { Text } = require('react-native')
  return <Text style={{ fontSize: 22, opacity: active ? 1 : 0.5 }}>{emoji}</Text>
}