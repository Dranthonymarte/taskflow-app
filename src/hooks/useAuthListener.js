import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { setUsuario } from '../store/authSlice';

// Escucha el estado de la sesión. Es lo que permite que, al reabrir la app,
// el usuario siga adentro sin volver a escribir sus datos.
export function useAuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelarEscucha = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        dispatch(
          setUsuario({
            uid: usuarioFirebase.uid,
            correo: usuarioFirebase.email,
            nombre: usuarioFirebase.displayName ?? null,
            fotoURL: usuarioFirebase.photoURL ?? null,
          })
        );
      } else {
        dispatch(setUsuario(null));
      }
    });

    return cancelarEscucha;
  }, [dispatch]);
}
