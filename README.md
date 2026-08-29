# TaskFlow

Aplicación móvil de productividad para gestionar tareas, hábitos y metas personales,
construida con React Native y Expo.

## Estado actual

**Checkpoint 4: Listas, renderizado y detalle de elementos.** La lista de tareas ahora se
dibuja con `FlatList`, que solo renderiza lo que entra en pantalla. Cada fila usa el `id` de
la tarea como clave estable en `keyExtractor` (nunca el índice). Al tocar una fila se abre el
detalle: la lista entrega **solo el id**, y la pantalla de detalle busca la tarea a partir de
ese id, que es el patrón maestro-detalle que se usará más adelante con parámetros de ruta.
Cuando no queda ninguna tarea, en lugar de una pantalla en blanco aparece el componente
`EmptyState`. Desde el detalle se puede marcar la tarea como completada o eliminarla.

## Estructura del proyecto

```
taskflow-app/
├── App.js                        # Punto de entrada: estado de las tareas y pantalla activa
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.js       # Pantalla del Checkpoint 1
│   │   ├── ProfileCard.js         # Tarjeta reutilizable (props: name, role, image)
│   │   ├── TaskItem.js            # Fila de la lista de tareas
│   │   └── EmptyState.js          # Mensaje cuando no hay tareas
│   ├── screens/
│   │   ├── TaskListScreen.js      # Lista con FlatList y estado vacío
│   │   ├── TaskDetailScreen.js    # Detalle de una tarea
│   │   ├── AddTaskScreen.js       # Formulario controlado con validación
│   │   ├── HomeScreen.js          # Placeholder de la futura lista de tareas
│   │   └── ProfileScreen.js       # Muestra ProfileCard con datos de prueba
│   ├── constants/
│   │   └── colors.js              # Paleta de colores de TaskFlow
│   ├── data/
│   │   └── tareasIniciales.js     # Datos de ejemplo
│   ├── assets/                    # Imágenes y fuentes locales
│   └── theme/                     # Reservado para próximos módulos
└── assets/                        # Assets generados por Expo (ícono, splash)
```

## Cómo ejecutar el proyecto localmente

1. Instalar las dependencias:
   ```
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```
   npx expo start
   ```
3. Escanear el código QR que aparece en la terminal con la app **Expo Go**
   (disponible en App Store / Google Play) para ver la aplicación en tu teléfono.

## Próximos pasos

- Módulo 5: navegación real entre pantallas con React Navigation.
- Módulo 6: estado global con Redux Toolkit.
- Módulo 7: persistencia con Firebase.
