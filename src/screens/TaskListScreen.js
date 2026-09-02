import { useMemo } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from '../components/TaskItem';
import TaskFilters from '../components/TaskFilters';
import EmptyState from '../components/EmptyState';
import {
  selectLista,
  selectFiltro,
  selectPendientes,
  selectCargando,
  setFilter,
} from '../store/tasksSlice';
import { colors } from '../constants/colors';

const MENSAJES_VACIO = {
  todas: '¡No tienes tareas pendientes! Empieza por crear una arriba.',
  pendientes: 'No te queda ninguna tarea pendiente.',
  completadas: 'Todavía no completaste ninguna tarea.',
};

export default function TaskListScreen({ navigation }) {
  const tareas = useSelector(selectLista);
  const filtro = useSelector(selectFiltro);
  const pendientes = useSelector(selectPendientes);
  const cargando = useSelector(selectCargando);
  const dispatch = useDispatch();

  const visibles = useMemo(() => {
    if (filtro === 'pendientes') {
      return tareas.filter((tarea) => !tarea.completada);
    }

    if (filtro === 'completadas') {
      return tareas.filter((tarea) => tarea.completada);
    }

    return tareas;
  }, [tareas, filtro]);

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

      <TaskFilters
        filtroActivo={filtro}
        onCambiarFiltro={(valor) => dispatch(setFilter(valor))}
      />

      <FlatList
        data={visibles}
        keyExtractor={(tarea) => tarea.id}
        renderItem={({ item }) => <TaskItem tarea={item} onPress={abrirDetalle} />}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          cargando ? (
            <ActivityIndicator style={styles.cargando} size="large" color={colors.primary} />
          ) : (
            <EmptyState titulo="Nada por acá" mensaje={MENSAJES_VACIO[filtro]} />
          )
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
  cargando: {
    marginTop: 60,
  },
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
