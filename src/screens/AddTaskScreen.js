import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import { selectUsuario } from '../store/authSlice';
import { crearTarea, nuevoId } from '../services/tasksService';
import { colors } from '../constants/colors';

const FORMULARIO_VACIO = { titulo: '', descripcion: '' };
const TITULO_MINIMO = 5;
const DESCRIPCION_MINIMA = 10;

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

  const errores = validar(valores);
  const hayErrores = Object.keys(errores).length > 0;

  const cambiarCampo = (campo, texto) => {
    setValores((anteriores) => ({ ...anteriores, [campo]: texto }));
  };

  const marcarTocado = (campo) => {
    setTocados((anteriores) => ({ ...anteriores, [campo]: true }));
  };

  const enviar = () => {
    setTocados({ titulo: true, descripcion: true });

    if (hayErrores) {
      return;
    }

    const tarea = {
      id: nuevoId(),
      titulo: valores.titulo.trim(),
      descripcion: valores.descripcion.trim(),
      completada: false,
      creadaEn: new Date().toISOString(),
    };

    console.log('Tarea creada:', tarea);
    dispatch(addTask(tarea));
    crearTarea(usuario.uid, tarea).catch((error) =>
      console.log('No se pudo guardar la tarea:', error.message)
    );

    Alert.alert('Éxito', 'Tarea capturada localmente');

    setValores(FORMULARIO_VACIO);
    setTocados({});
    navigation.navigate('TaskList');
  };

  const errorTitulo = tocados.titulo ? errores.titulo : undefined;
  const errorDescripcion = tocados.descripcion ? errores.descripcion : undefined;

  return (
    <KeyboardAvoidingView
      style={styles.contenedor}
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
          style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
          onPress={enviar}
        >
          <Text style={styles.textoBoton}>Guardar tarea</Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: 24,
    paddingTop: 24,
  },
  volver: {
    marginBottom: 12,
  },
  textoVolver: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
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
  textoBoton: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmacion: {
    marginTop: 16,
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
  },
});
