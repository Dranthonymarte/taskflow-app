import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

const COLECCION = 'tareas';

// Devuelve la función para cancelar la escucha. Quien la llama tiene que
// ejecutarla en la limpieza del useEffect para no dejar listeners colgados.
export function suscribirATareas(userId, alRecibirTareas, alFallar) {
  const consulta = query(collection(db, COLECCION), where('userId', '==', userId));

  return onSnapshot(
    consulta,
    (snapshot) => {
      const tareas = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      alRecibirTareas(tareas);
    },
    alFallar
  );
}

export function crearTarea(userId, tarea) {
  return setDoc(doc(db, COLECCION, tarea.id), {
    titulo: tarea.titulo,
    descripcion: tarea.descripcion,
    completada: tarea.completada,
    creadaEn: tarea.creadaEn,
    userId,
  });
}

export function actualizarEstado(tareaId, completada) {
  return updateDoc(doc(db, COLECCION, tareaId), { completada });
}

export function borrarTarea(tareaId) {
  return deleteDoc(doc(db, COLECCION, tareaId));
}

export function nuevoId() {
  return doc(collection(db, COLECCION)).id;
}
