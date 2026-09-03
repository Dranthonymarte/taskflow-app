import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { suscribirATareas } from '../services/tasksService';
import { selectUsuario } from '../store/authSlice';
import { setTasks, setTasksError, limpiarTareas } from '../store/tasksSlice';

// Mantiene la lista sincronizada con Firestore en tiempo real, trayendo solo
// las tareas del usuario conectado.
export function useTasksSync() {
  const usuario = useSelector(selectUsuario);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!usuario) {
      dispatch(limpiarTareas());
      return undefined;
    }

    const cancelarEscucha = suscribirATareas(
      usuario.uid,
      (tareas) => dispatch(setTasks(tareas)),
      () => dispatch(setTasksError('No pudimos cargar tus tareas. Revisá tu conexión.'))
    );

    return cancelarEscucha;
  }, [usuario, dispatch]);
}
