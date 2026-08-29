import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import { colors } from '../constants/colors';

export default function TaskListScreen({ tareas, onSeleccionarTarea, onNuevaTarea }) {
  const pendientes = tareas.filter((tarea) => !tarea.completada).length;

  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <View style={styles.encabezadoTextos}>
          <Text style={styles.titulo}>Mis tareas</Text>
          <Text style={styles.subtitulo}>
            {pendientes === 0
              ? 'No te queda nada pendiente'
              : `${pendientes} pendiente${pendientes === 1 ? '' : 's'}`}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.botonNueva, pressed && styles.botonPresionado]}
          onPress={onNuevaTarea}
        >
          <Text style={styles.textoBotonNueva}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(tarea) => tarea.id}
        renderItem={({ item }) => <TaskItem tarea={item} onPress={onSeleccionarTarea} />}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <EmptyState
            titulo="Todo en orden"
            mensaje="No tenés tareas cargadas. Tocá el botón + para crear la primera."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.background,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 16,
  },
  encabezadoTextos: {
    flex: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
  },
  subtitulo: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
  botonNueva: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPresionado: {
    opacity: 0.85,
  },
  textoBotonNueva: {
    color: colors.surface,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '600',
  },
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
