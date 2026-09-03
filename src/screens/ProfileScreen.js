import { View, Text, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import { useAvatarPicker } from '../hooks/useAvatarPicker';
import {
  selectUsuario,
  selectGuardandoPerfil,
  selectErrorPerfil,
} from '../store/authSlice';
import { selectLista } from '../store/tasksSlice';
import { cerrarSesion } from '../services/authService';
import { colors } from '../constants/colors';

// Avatar de respaldo: mientras la persona no elija una foto propia, se arma uno
// con sus iniciales en vez de dejar el hueco vacío.
const AVATAR = 'https://ui-avatars.com/api/?background=4C1D95&color=fff&size=200&name=';

export default function ProfileScreen() {
  const usuario = useSelector(selectUsuario);
  const tareas = useSelector(selectLista);
  const guardandoPerfil = useSelector(selectGuardandoPerfil);
  const errorPerfil = useSelector(selectErrorPerfil);
  const { fotoURL, eligiendo, aviso, elegirAvatar, quitarAvatar } = useAvatarPicker();

  const completadas = tareas.filter((tarea) => tarea.completada).length;
  const nombre = usuario?.correo ? usuario.correo.split('@')[0] : 'Invitada o invitado';
  const trabajando = eligiendo || guardandoPerfil;

  const salir = async () => {
    try {
      await cerrarSesion();
    } catch (error) {
      console.error('No se pudo cerrar la sesión:', error);
      Alert.alert('No se pudo cerrar la sesión', 'Intentá otra vez.');
    }
  };

  return (
    <SafeAreaView style={styles.contenedor} edges={['left', 'right']}>
      <ProfileCard
        name={nombre}
        role={usuario ? usuario.correo : 'Sin sesión'}
        image={fotoURL ?? `${AVATAR}${encodeURIComponent(nombre)}`}
        onPressAvatar={elegirAvatar}
      />

      <View style={styles.acciones}>
        {trabajando ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <>
            <Pressable onPress={elegirAvatar} hitSlop={8}>
              <Text style={styles.enlace}>Cambiar foto</Text>
            </Pressable>

            {fotoURL ? (
              <Pressable onPress={quitarAvatar} hitSlop={8}>
                <Text style={styles.enlaceSecundario}>Quitar</Text>
              </Pressable>
            ) : null}
          </>
        )}
      </View>

      {aviso ? <Text style={styles.aviso}>{aviso}</Text> : null}
      {errorPerfil ? <Text style={styles.aviso}>{errorPerfil}</Text> : null}

      <View style={styles.resumen}>
        <View style={styles.dato}>
          <Text style={styles.numero}>{tareas.length}</Text>
          <Text style={styles.etiqueta}>Tareas</Text>
        </View>
        <View style={styles.dato}>
          <Text style={styles.numero}>{completadas}</Text>
          <Text style={styles.etiqueta}>Completadas</Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
        onPress={salir}
      >
        <Text style={styles.textoBoton}>Cerrar sesión</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 24,
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    minHeight: 24,
    marginTop: 14,
  },
  enlace: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  enlaceSecundario: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textMuted,
  },
  aviso: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 24,
  },
  resumen: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  dato: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  numero: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
  },
  etiqueta: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  boton: {
    marginTop: 'auto',
    marginHorizontal: 20,
    marginBottom: 28,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.danger,
  },
  botonPresionado: {
    opacity: 0.7,
  },
  textoBoton: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
});
