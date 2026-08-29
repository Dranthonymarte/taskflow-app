import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTareaPorId, toggleTaskStatus, deleteTask } from '../store/tasksSlice';
import { colors } from '../constants/colors';

export default function TaskDetailScreen({ route, navigation }) {
  const { tareaId } = route.params;
  const tarea = useSelector(selectTareaPorId(tareaId));
  const dispatch = useDispatch();

  if (!tarea) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.noEncontrada}>Esta tarea ya no existe.</Text>
      </View>
    );
  }

  const borrar = () => {
    dispatch(deleteTask(tarea.id));
    navigation.goBack();
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.tarjeta}>
        <Text style={[styles.estado, tarea.completada && styles.estadoCompletada]}>
          {tarea.completada ? 'COMPLETADA' : 'PENDIENTE'}
        </Text>
        <Text style={styles.titulo}>{tarea.titulo}</Text>
        <Text style={styles.descripcion}>{tarea.descripcion}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
        onPress={() => dispatch(toggleTaskStatus(tarea.id))}
      >
        <Text style={styles.textoBoton}>
          {tarea.completada ? 'Marcar como pendiente' : 'Marcar como completada'}
        </Text>
      </Pressable>

      <Pressable style={styles.botonSecundario} onPress={borrar}>
        <Text style={styles.textoBotonSecundario}>Eliminar tarea</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  tarjeta: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
  },
  estado: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.primaryLight,
    marginBottom: 8,
  },
  estadoCompletada: {
    color: colors.success,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
  },
  boton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 24,
  },
  botonPresionado: {
    opacity: 0.85,
  },
  textoBoton: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  botonSecundario: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotonSecundario: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '600',
  },
  noEncontrada: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
});
