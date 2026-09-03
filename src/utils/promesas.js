// Firestore no rechaza las escrituras cuando no hay internet: las encola y la
// promesa queda esperando indefinidamente. Sin este límite de tiempo, un botón
// que espera esa promesa se quedaría girando para siempre.
export function conTiempoLimite(promesa, milisegundos) {
  return new Promise((resolver, rechazar) => {
    const reloj = setTimeout(() => {
      const error = new Error('La operación tardó demasiado.');
      error.name = 'TiempoAgotado';
      rechazar(error);
    }, milisegundos);

    promesa
      .then((valor) => {
        clearTimeout(reloj);
        resolver(valor);
      })
      .catch((error) => {
        clearTimeout(reloj);
        rechazar(error);
      });
  });
}
