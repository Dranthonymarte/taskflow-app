import { useState } from 'react';
import {
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

const CONTRASENA_MINIMA = 6;

function validar(valores) {
  const errores = {};

  if (!valores.correo.trim()) {
    errores.correo = 'El correo es obligatorio';
  } else if (!valores.correo.includes('@') || !valores.correo.includes('.')) {
    errores.correo = 'Escribí un correo válido';
  }

  if (!valores.contrasena) {
    errores.contrasena = 'La contraseña es obligatoria';
  } else if (valores.contrasena.length < CONTRASENA_MINIMA) {
    errores.contrasena = `La contraseña necesita al menos ${CONTRASENA_MINIMA} caracteres`;
  }

  return errores;
}

export default function AuthForm({
  titulo,
  subtitulo,
  textoBoton,
  textoEnlace,
  onEnviar,
  onIrAlOtroFormulario,
}) {
  const [valores, setValores] = useState({ correo: '', contrasena: '' });
  const [tocados, setTocados] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [enviando, setEnviando] = useState(false);

  const errores = validar(valores);
  const hayErrores = Object.keys(errores).length > 0;

  const cambiarCampo = (campo, texto) => {
    setValores((anteriores) => ({ ...anteriores, [campo]: texto }));
    setErrorGeneral('');
  };

  const marcarTocado = (campo) => {
    setTocados((anteriores) => ({ ...anteriores, [campo]: true }));
  };

  const enviar = async () => {
    setTocados({ correo: true, contrasena: true });

    if (hayErrores) {
      return;
    }

    setEnviando(true);
    const mensaje = await onEnviar(valores.correo, valores.contrasena);
    setEnviando(false);

    if (mensaje) {
      setErrorGeneral(mensaje);
    }
  };

  const errorCorreo = tocados.correo ? errores.correo : undefined;
  const errorContrasena = tocados.contrasena ? errores.contrasena : undefined;

  return (
    <SafeAreaView style={styles.contenedor} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.seguro}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.marca}>TaskFlow</Text>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.subtitulo}>{subtitulo}</Text>

          <Text style={styles.etiqueta}>Correo electrónico</Text>
          <TextInput
            style={[styles.campo, errorCorreo && styles.campoConError]}
            value={valores.correo}
            onChangeText={(texto) => cambiarCampo('correo', texto)}
            onBlur={() => marcarTocado('correo')}
            placeholder="vos@ejemplo.com"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />
          {errorCorreo ? <Text style={styles.error}>{errorCorreo}</Text> : null}

          <Text style={styles.etiqueta}>Contraseña</Text>
          <TextInput
            style={[styles.campo, errorContrasena && styles.campoConError]}
            value={valores.contrasena}
            onChangeText={(texto) => cambiarCampo('contrasena', texto)}
            onBlur={() => marcarTocado('contrasena')}
            placeholder="Al menos 6 caracteres"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            autoCapitalize="none"
          />
          {errorContrasena ? <Text style={styles.error}>{errorContrasena}</Text> : null}

          {errorGeneral ? <Text style={styles.errorGeneral}>{errorGeneral}</Text> : null}

          <Pressable
            style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
            onPress={enviar}
            disabled={enviando}
          >
            {enviando ? (
              <ActivityIndicator color={colors.surface} />
            ) : (
              <Text style={styles.textoBoton}>{textoBoton}</Text>
            )}
          </Pressable>

          <Pressable style={styles.enlace} onPress={onIrAlOtroFormulario}>
            <Text style={styles.textoEnlace}>{textoEnlace}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.background,
  },
  seguro: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
  },
  marca: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 28,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  subtitulo: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 24,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  campo: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    marginBottom: 4,
  },
  campoConError: {
    borderColor: colors.danger,
  },
  error: {
    fontSize: 13,
    color: colors.danger,
    marginBottom: 12,
  },
  errorGeneral: {
    fontSize: 14,
    color: colors.danger,
    textAlign: 'center',
    marginTop: 12,
  },
  boton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
    minHeight: 52,
    justifyContent: 'center',
  },
  botonPresionado: {
    opacity: 0.85,
  },
  textoBoton: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  enlace: {
    marginTop: 18,
    alignItems: 'center',
  },
  textoEnlace: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
