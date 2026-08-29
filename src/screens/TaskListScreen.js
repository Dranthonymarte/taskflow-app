import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import { useTasks } from '../context/TasksContext';
import { colors } from '../constants/colors';

export default function TaskListScreen({ navigation }) {
  const { tareas } = useTasks();
  const pendientes = tareas.filter((tarea) => !tarea.completada).length;

  const abrirDetalle = (tareaId) => {
    navigation.navigate('TaskDetail', { tareaId });
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Text style={styles.subtitulo}>
          {pendientes === 0
            ? 'No te queda nada pendiente'
            : `${pendientes} pendiente${pendientes === 1 ? '' : 's'}`}
        </Text>
        <Pressable
          style={({ pressed }) => [styles.botonNueva, pressed && styles.botonPresionado]}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.textoBotonNueva}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(tarea) => tarea.id}
        renderItem={({ item }) => <TaskItem tarea={item} onPress={abrirDetalle} />}
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
    paddingTop: 16,
    paddingBottom: 12,
  },
  subtitulo: {
    fontSize: 15,
    color: colors.textMuted,
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
