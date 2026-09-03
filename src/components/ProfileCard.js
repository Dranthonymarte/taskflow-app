import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

// Dos letras sacadas del nombre, para cuando todavía no hay foto que mostrar.
function iniciales(texto) {
  if (!texto) {
    return '?';
  }

  return texto
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase();
}

export default function ProfileCard({ name, role, image, onPressAvatar }) {
  const [falloImagen, setFalloImagen] = useState(false);

  // Cuando llega una foto nueva hay que volver a intentar: puede que la
  // anterior fallara y esta sí cargue.
  useEffect(() => {
    setFalloImagen(false);
  }, [image]);

  const hayFoto = Boolean(image) && !falloImagen;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressAvatar}
        disabled={!onPressAvatar}
        style={styles.zonaAvatar}
      >
        {hayFoto ? (
          <Image
            source={{ uri: image }}
            style={styles.avatar}
            onError={() => setFalloImagen(true)}
          />
        ) : (
          <View style={[styles.avatar, styles.avatarVacio]}>
            <Text style={styles.avatarIniciales}>{iniciales(name)}</Text>
          </View>
        )}

        {onPressAvatar ? (
          <View style={styles.insignia}>
            <Text style={styles.insigniaTexto}>Cambiar</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  zonaAvatar: {
    marginRight: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatarVacio: {
    backgroundColor: colors.primaryPale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIniciales: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.primary,
  },
  insignia: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  insigniaTexto: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.surface,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  role: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
});
