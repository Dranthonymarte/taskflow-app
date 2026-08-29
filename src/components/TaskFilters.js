import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const OPCIONES = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'pendientes', etiqueta: 'Pendientes' },
  { valor: 'completadas', etiqueta: 'Completadas' },
];

export default function TaskFilters({ filtroActivo, onCambiarFiltro }) {
  return (
    <View style={styles.contenedor}>
      {OPCIONES.map((opcion) => {
        const activo = opcion.valor === filtroActivo;

        return (
          <Pressable
            key={opcion.valor}
            style={[styles.chip, activo && styles.chipActivo]}
            onPress={() => onCambiarFiltro(opcion.valor)}
          >
            <Text style={[styles.texto, activo && styles.textoActivo]}>{opcion.etiqueta}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActivo: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  texto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  textoActivo: {
    color: colors.surface,
  },
});
