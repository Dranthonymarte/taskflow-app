import AuthForm from '../components/AuthForm';
import { iniciarSesion, traducirError } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const entrar = async (correo, contrasena) => {
    try {
      await iniciarSesion(correo, contrasena);
      return null;
    } catch (error) {
      return traducirError(error);
    }
  };

  return (
    <AuthForm
      titulo="Iniciar sesión"
      subtitulo="Entrá para ver tus tareas desde cualquier dispositivo."
      textoBoton="Entrar"
      textoEnlace="¿No tenés cuenta? Registrate"
      onEnviar={entrar}
      onIrAlOtroFormulario={() => navigation.navigate('Register')}
    />
  );
}
