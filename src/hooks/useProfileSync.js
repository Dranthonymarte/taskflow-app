import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { suscribirAPerfil } from '../services/profileService';
import { selectUsuario, setPerfil, setErrorPerfil } from '../store/authSlice';

// Mantiene el perfil sincronizado con Firestore, igual que useTasksSync hace
// con la lista de tareas. Gracias a esto la foto sobrevive al cierre de la app.
export function useProfileSync() {
  const usuario = useSelector(selectUsuario);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!usuario) {
      return undefined;
    }

    const cancelarEscucha = suscribirAPerfil(
      usuario.uid,
      (perfil) => {
        // Si todavía no existe el documento, se deja lo que ya sembró la sesión.
        if (perfil) {
          dispatch(
            setPerfil({
              nombre: perfil.nombre ?? null,
              fotoURL: perfil.fotoURL ?? null,
            })
          );
        }
      },
      () => dispatch(setErrorPerfil('No pudimos cargar tu perfil.'))
    );

    return cancelarEscucha;
  }, [usuario, dispatch]);
}
