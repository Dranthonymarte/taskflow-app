import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const COLECCION = 'usuarios';

// Igual que en tasksService: devuelve la función para cancelar la escucha, y
// quien la llama tiene que ejecutarla en la limpieza del useEffect.
export function suscribirAPerfil(uid, alRecibirPerfil, alFallar) {
  return onSnapshot(
    doc(db, COLECCION, uid),
    (documento) => {
      alRecibirPerfil(documento.exists() ? documento.data() : null);
    },
    alFallar
  );
}

// merge: true para no pisar los campos que no viajen en esta escritura. Las
// reglas de firestore.rules solo aceptan estas tres claves.
export function guardarPerfil(uid, datos) {
  return setDoc(
    doc(db, COLECCION, uid),
    { ...datos, actualizadoEn: new Date().toISOString() },
    { merge: true }
  );
}
