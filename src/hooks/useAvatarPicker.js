import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { guardarPerfil } from '../services/profileService';
import { conTiempoLimite } from '../utils/promesas';
import {
  selectUsuario,
  selectFotoPerfil,
  setFotoPerfil,
  setGuardandoPerfil,
  setErrorPerfil,
} from '../store/authSlice';

// Un documento de Firestore no puede pasar de 1 MiB y la foto viaja en base64
// dentro del documento, así que se corta bastante antes de ese techo.
const MAXIMO_BASE64 = 700000;

// Firestore encola las escrituras cuando no hay internet, así que sin este
// límite el indicador de guardado quedaría girando para siempre.
const ESPERA_MAXIMA = 8000;

// Concentra todo lo del avatar: permisos, galería, cancelación y guardado.
export function useAvatarPicker() {
  const dispatch = useDispatch();
  const usuario = useSelector(selectUsuario);
  const fotoURL = useSelector(selectFotoPerfil);
  const [eligiendo, setEligiendo] = useState(false);
  const [aviso, setAviso] = useState('');

  const guardarEnLaNube = async (nuevaFoto) => {
    if (!usuario) {
      return;
    }

    if (nuevaFoto && nuevaFoto.length > MAXIMO_BASE64) {
      dispatch(
        setErrorPerfil('La imagen es muy pesada: se ve en este teléfono, pero no se guardó en la nube.')
      );
      return;
    }

    dispatch(setGuardandoPerfil(true));
    dispatch(setErrorPerfil(null));

    try {
      await conTiempoLimite(guardarPerfil(usuario.uid, { fotoURL: nuevaFoto }), ESPERA_MAXIMA);
    } catch (error) {
      // Si solo se agotó el tiempo, Firestore ya la tiene encolada y la va a
      // subir sola. Cualquier otro error sí merece que la persona se entere.
      dispatch(
        setErrorPerfil(
          error.name === 'TiempoAgotado'
            ? 'Sin conexión: la foto se guardará cuando vuelva internet.'
            : 'La foto se ve acá, pero no pudimos guardarla en la nube.'
        )
      );
    } finally {
      dispatch(setGuardandoPerfil(false));
    }
  };

  const elegirAvatar = async () => {
    setAviso('');
    setEligiendo(true);

    try {
      const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permiso.granted) {
        setAviso(
          permiso.canAskAgain
            ? 'Necesitamos permiso para abrir tus fotos.'
            : 'Activá el permiso de fotos desde los ajustes del teléfono.'
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.3,
        base64: true,
      });

      // Cancelar NO es un error: la persona cambió de idea. Se sale sin tocar
      // nada, sin mensaje de error y sin dejar el estado a medio camino.
      if (resultado.canceled) {
        return;
      }

      const imagen = resultado.assets?.[0];

      if (!imagen?.base64) {
        setAviso('No pudimos leer esa imagen. Probá con otra.');
        return;
      }

      const nuevaFoto = `data:image/jpeg;base64,${imagen.base64}`;

      // Primero la pantalla y después la nube: el avatar se ve al instante.
      dispatch(setFotoPerfil(nuevaFoto));

      await guardarEnLaNube(nuevaFoto);
    } catch (error) {
      setAviso('No pudimos abrir la galería. Intentá otra vez.');
    } finally {
      setEligiendo(false);
    }
  };

  const quitarAvatar = async () => {
    setAviso('');
    dispatch(setFotoPerfil(null));
    await guardarEnLaNube(null);
  };

  return { fotoURL, eligiendo, aviso, elegirAvatar, quitarAvatar };
}
