import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export default function TaskDetailScreen({ tarea, onVolver, onAlternarEstado, onEliminar }) {
  if (!tarea) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.noEncontrada}>Esta tarea ya no existe.</Text>
        <Pressable style={styles.botonSecundario} onPress={onVolver}>
          <Text style={styles.textoBotonSecundario}>Volver a la lista</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Pressable style={styles.volver} onPress={onVolver}>
        <Text style={styles.textoVolver}>‹ Volver</Text>
      </Pressable>

      <View style={styles.tarjeta}>
        <Text style={[styles.estado, tarea.completada && styles.estadoCompletada]}>
          {tarea.completada ? 'COMPLETADA' : 'PENDIENTE'}
        </Text>
        <Text style={styles.titulo}>{tarea.titulo}</Text>
        <Text style={styles.descripcion}>{tarea.descripcion}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
        onPress={() => onAlternarEstado(tarea.id)}
      >
        <Text style={styles.textoBoton}>
          {tarea.completada ? 'Marcar como pendiente' : 'Marcar como completada'}
        </Text>
      </Pressable>

      <Pressable style={styles.botonSecundario} onPress={() => onEliminar(tarea.id)}>
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
    paddingTop: 64,
  },
  volver: {
    marginBottom: 16,
  },
  textoVolver: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
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
