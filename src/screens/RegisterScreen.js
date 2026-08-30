import AuthForm from '../components/AuthForm';
import { registrar, traducirError } from '../services/authService';

export default function RegisterScreen({ navigation }) {
  const crearCuenta = async (correo, contrasena) => {
    try {
      await registrar(correo, contrasena);
      return null;
    } catch (error) {
      return traducirError(error);
    }
  };

  return (
    <AuthForm
      titulo="Crear cuenta"
      subtitulo="Tus tareas quedan guardadas en la nube, solo para vos."
      textoBoton="Registrarme"
      textoEnlace="¿Ya tenés cuenta? Iniciá sesión"
      onEnviar={crearCuenta}
      onIrAlOtroFormulario={() => navigation.navigate('Login')}
    />
  );
}
