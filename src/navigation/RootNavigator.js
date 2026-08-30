import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainTabsNavigator from './MainTabsNavigator';
import { useAuthListener } from '../hooks/useAuthListener';
import { useTasksSync } from '../hooks/useTasksSync';
import { selectUsuario, selectComprobandoSesion } from '../store/authSlice';
import { colors } from '../constants/colors';

export default function RootNavigator() {
  useAuthListener();
  useTasksSync();

  const usuario = useSelector(selectUsuario);
  const comprobandoSesion = useSelector(selectComprobandoSesion);

  // Mientras Firebase revisa si había una sesión guardada no se decide nada,
  // para no mostrar el login un instante a alguien que ya estaba conectado.
  if (comprobandoSesion) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {usuario ? <MainTabsNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cargando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
