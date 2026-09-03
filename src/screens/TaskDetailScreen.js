import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTareaPorId, toggleTaskStatus, deleteTask, addTask } from '../store/tasksSlice';
import { actualizarEstado, borrarTarea } from '../services/tasksService';
import { conTiempoLimite } from '../utils/promesas';
import { colors } from '../constants/colors';

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

// Las tareas guardadas antes de que existiera el campo pueden no traer la fecha, y
// new Date(undefined) pintaría 'Invalid Date' en pantalla. Si no se puede leer, no se muestra.
// Mismo límite que en el formulario: sin red, Firestore encola la escritura y
// la promesa nunca resolvería.
const ESPERA_MAXIMA = 6000;

function formatearFecha(valor) {
  if (!valor) {
    return null;
  }

  const fecha = new Date(valor);

  if (Number.isNaN(fecha.getTime())) {
    return null;
  }

  return `${fecha.getDate()} de ${MESES[fecha.getMonth()]} de ${fecha.getFullYear()}`;
}

export default function TaskDetailScreen({ route, navigation }) {
  const { tareaId } = route.params;
  const tarea = useSelector(selectTareaPorId(tareaId));
  const dispatch = useDispatch();

  // Este useState va antes del return de abajo a propósito: si se declarara
  // después, al desaparecer la tarea React contaría menos hooks y reventaría.
  const [procesando, setProcesando] = useState(false);

  if (!tarea) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.noEncontrada}>Esta tarea ya no existe.</Text>
      </View>
    );
  }

  const creada = formatearFecha(tarea.creadaEn);

  const alternar = async () => {
    if (procesando) {
      return;
    }

    setProcesando(true);
    dispatch(toggleTaskStatus(tarea.id));

    try {
      await conTiempoLimite(actualizarEstado(tarea.id, !tarea.completada), ESPERA_MAXIMA);
    } catch (error) {
      if (error.name !== 'TiempoAgotado') {
        // Deshacer es volver a alternar: la acción es su propia inversa.
        dispatch(toggleTaskStatus(tarea.id));
        Alert.alert('No se pudo actualizar', 'Revisá tu conexión e intentá otra vez.');
      }
    } finally {
      setProcesando(false);
    }
  };

  const borrar = async () => {
    if (procesando) {
      return;
    }

    setProcesando(true);
    dispatch(deleteTask(tarea.id));
    navigation.goBack();

    try {
      await conTiempoLimite(borrarTarea(tarea.id), ESPERA_MAXIMA);
    } catch (error) {
      if (error.name !== 'TiempoAgotado') {
        // Falló de verdad: se devuelve la tarea a la lista y se avisa.
        dispatch(addTask(tarea));
        Alert.alert('No se pudo eliminar', 'La tarea sigue en tu lista.');
      }
    }
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.tarjeta}>
        <Text style={[styles.estado, tarea.completada && styles.estadoCompletada]}>
          {tarea.completada ? 'COMPLETADA' : 'PENDIENTE'}
        </Text>
        <Text style={styles.titulo}>{tarea.titulo}</Text>
        <Text style={styles.descripcion}>{tarea.descripcion}</Text>
        {creada ? <Text style={styles.fecha}>Creada el {creada}</Text> : null}
      </View>

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
        onPress={alternar}
        disabled={procesando}
      >
        <Text style={styles.textoBoton}>
          {tarea.completada ? 'Marcar como pendiente' : 'Marcar como completada'}
        </Text>
      </Pressable>

      <Pressable style={styles.botonSecundario} onPress={() => navigation.goBack()}>
        <Text style={styles.textoVolver}>Volver a la lista</Text>
      </Pressable>

      <Pressable style={styles.botonSecundario} onPress={borrar} disabled={procesando}>
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
  fecha: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 14,
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
  textoVolver: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
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
