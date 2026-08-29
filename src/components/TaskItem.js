import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export default function TaskItem({ tarea, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPresionado]}
      onPress={() => onPress(tarea.id)}
    >
      <View style={[styles.indicador, tarea.completada && styles.indicadorCompletado]} />
      <View style={styles.textos}>
        <Text style={[styles.titulo, tarea.completada && styles.tituloCompletado]}>
          {tarea.titulo}
        </Text>
        <Text style={styles.descripcion} numberOfLines={1}>
          {tarea.descripcion}
        </Text>
      </View>
      <Text style={styles.flecha}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  itemPresionado: {
    opacity: 0.7,
  },
  indicador: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryLight,
    marginRight: 12,
  },
  indicadorCompletado: {
    backgroundColor: colors.success,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  tituloCompletado: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  descripcion: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  flecha: {
    fontSize: 24,
    color: colors.textMuted,
    marginLeft: 8,
  },
});
