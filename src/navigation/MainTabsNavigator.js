import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksStackNavigator from './TasksStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

function IconoPestana({ simbolo, color }) {
  return <Text style={[styles.icono, { color }]}>{simbolo}</Text>;
}

export default function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.surface,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tab.Screen
        name="Tareas"
        component={TasksStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <IconoPestana simbolo="☰" color={color} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          title: 'Mi perfil',
          tabBarIcon: ({ color }) => <IconoPestana simbolo="☺" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icono: {
    fontSize: 20,
  },
});
