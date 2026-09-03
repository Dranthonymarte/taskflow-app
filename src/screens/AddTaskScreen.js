import { useState } from 'react';
import {
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../store/tasksSlice';
import { selectUsuario } from '../store/authSlice';
import { crearTarea, nuevoId } from '../services/tasksService';
import { conTiempoLimite } from '../utils/promesas';
import { colors } from '../constants/colors';

const FORMULARIO_VACIO = { titulo: '', descripcion: '' };
const TITULO_MINIMO = 5;
const DESCRIPCION_MINIMA = 10;

// Firestore encola las escrituras cuando no hay red, así que sin este límite el
// botón se quedaría girando para siempre.
const ESPERA_MAXIMA = 6000;

function validar(valores) {
  const errores = {};

  if (valores.titulo.trim().length === 0) {
    errores.titulo = 'El título es obligatorio';
  } else if (valores.titulo.trim().length < TITULO_MINIMO) {
    errores.titulo = `El título necesita al menos ${TITULO_MINIMO} caracteres`;
  }

  if (valores.descripcion.trim().length === 0) {
    errores.descripcion = 'La descripción es obligatoria';
  } else if (valores.descripcion.trim().length < DESCRIPCION_MINIMA) {
    errores.descripcion = `La descripción necesita al menos ${DESCRIPCION_MINIMA} caracteres`;
  }

  return errores;
}

export default function AddTaskScreen({ navigation }) {
  const dispatch = useDispatch();
  const usuario = useSelector(selectUsuario);
  const [valores, setValores] = useState(FORMULARIO_VACIO);
  const [tocados, setTocados] = useState({});
  const [guardando, setGuardando] = useState(false);

  const errores = validar(valores);
  const hayErrores = Object.keys(errores).length > 0;

  const cambiarCampo = (campo, texto) => {
    setValores((anteriores) => ({ ...anteriores, [campo]: texto }));
  };

  const marcarTocado = (campo) => {
    setTocados((anteriores) => ({ ...anteriores, [campo]: true }));
  };

  const enviar = async () => {
    setTocados({ titulo: true, descripcion: true });

    if (hayErrores || guardando) {
      return;
    }

    const tarea = {
      id: nuevoId(),
      titulo: valores.titulo.trim(),
      descripcion: valores.descripcion.trim(),
      completada: false,
      creadaEn: new Date().toISOString(),
    };

    setGuardando(true);

    // Se agrega primero al store para que la lista responda al instante, y
    // recién después se espera la confirmación de la nube.
    dispatch(addTask(tarea));

    try {
      await conTiempoLimite(crearTarea(usuario.uid, tarea), ESPERA_MAXIMA);
      Alert.alert('Éxito', 'Tarea capturada localmente');
    } catch (error) {
      if (error.name === 'TiempoAgotado') {
        // Firestore la dejó encolada y la va a subir sola cuando vuelva la red,
        // así que la tarea se conserva y el formulario sigue su curso.
        Alert.alert('Sin conexión', 'Guardamos la tarea y se sincronizará cuando vuelva internet.');
      } else {
        // Acá falló de verdad: se deshace el agregado optimista y la persona se
        // queda en el formulario, con lo que había escrito todavía a la vista.
        dispatch(deleteTask(tarea.id));
        Alert.alert('No se pudo guardar', 'Revisá tu conexión e intentá otra vez.');
        setGuardando(false);
        return;
      }
    }

    setGuardando(false);
    setValores(FORMULARIO_VACIO);
    setTocados({});
    navigation.navigate('TaskList');
  };

  const errorTitulo = tocados.titulo ? errores.titulo : undefined;
  const errorDescripcion = tocados.descripcion ? errores.descripcion : undefined;

  return (
    <SafeAreaView style={styles.contenedor} edges={['left', 'right']}>
      <KeyboardAvoidingView
        style={styles.seguro}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.titulo}>Nueva tarea</Text>
          <Text style={styles.subtitulo}>Completá los datos para agregarla a tu lista</Text>

          <Text style={styles.etiqueta}>Título</Text>
          <TextInput
            style={[styles.campo, errorTitulo && styles.campoConError]}
            value={valores.titulo}
            onChangeText={(texto) => cambiarCampo('titulo', texto)}
            onBlur={() => marcarTocado('titulo')}
            placeholder="Ej: Preparar la reunión del lunes"
            placeholderTextColor={colors.textMuted}
          />
          {errorTitulo ? <Text style={styles.error}>{errorTitulo}</Text> : null}

          <Text style={styles.etiqueta}>Descripción</Text>
          <TextInput
            style={[styles.campo, styles.campoLargo, errorDescripcion && styles.campoConError]}
            value={valores.descripcion}
            onChangeText={(texto) => cambiarCampo('descripcion', texto)}
            onBlur={() => marcarTocado('descripcion')}
            placeholder="¿Qué hay que hacer exactamente?"
            placeholderTextColor={colors.textMuted}
            multiline
            textAlignVertical="top"
          />
          {errorDescripcion ? <Text style={styles.error}>{errorDescripcion}</Text> : null}

          <Pressable
            style={({ pressed }) => [
              styles.boton,
              pressed && styles.botonPresionado,
              guardando && styles.botonInactivo,
            ]}
            onPress={enviar}
            disabled={guardando}
          >
            {guardando ? (
              <ActivityIndicator color={colors.surface} />
            ) : (
              <Text style={styles.textoBoton}>Guardar tarea</Text>
            )}
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
    padding: 24,
    paddingTop: 24,
  },
  titulo: {
    fontSize: 24,
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
  campoLargo: {
    height: 110,
  },
  campoConError: {
    borderColor: colors.danger,
  },
  error: {
    fontSize: 13,
    color: colors.danger,
    marginBottom: 12,
  },
  boton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  botonPresionado: {
    opacity: 0.85,
  },
  botonInactivo: {
    opacity: 0.6,
  },
  textoBoton: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});
