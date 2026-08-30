import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import { selectUsuario } from '../store/authSlice';
import { selectLista } from '../store/tasksSlice';
import { cerrarSesion } from '../services/authService';
import { colors } from '../constants/colors';

const AVATAR = 'https://ui-avatars.com/api/?background=4C1D95&color=fff&size=200&name=';

export default function ProfileScreen() {
  const usuario = useSelector(selectUsuario);
  const tareas = useSelector(selectLista);
  const completadas = tareas.filter((tarea) => tarea.completada).length;

  const nombre = usuario ? usuario.correo.split('@')[0] : 'Invitada o invitado';

  return (
    <View style={styles.contenedor}>
      <ProfileCard
        name={nombre}
        role={usuario ? usuario.correo : 'Sin sesión'}
        image={`${AVATAR}${encodeURIComponent(nombre)}`}
      />

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
        onPress={cerrarSesion}
      >
        <Text style={styles.textoBoton}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 24,
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
