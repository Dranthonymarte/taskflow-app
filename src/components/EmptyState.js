import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export default function EmptyState({ titulo, mensaje }) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.circulo}>
        <Text style={styles.icono}>✓</Text>
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  circulo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icono: {
    fontSize: 32,
    color: colors.primary,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  mensaje: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
