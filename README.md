# TaskFlow

Aplicación móvil de productividad para gestionar tareas, hábitos y metas personales,
construida con React Native y Expo.

## Estado actual

**Checkpoint 5: Navegación en React Native.** La app dejó de cambiar de pantalla con
condicionales y ahora usa React Navigation de verdad. Hay un único `NavigationContainer` en
la raíz, y dentro un **Bottom Tab Navigator** con dos pestañas: *Tareas* y *Perfil*. La
pestaña *Tareas* no es una pantalla suelta sino un **Stack Navigator anidado** con el
recorrido `TaskList → TaskDetail → AddTask`. Entre pantallas se pasa **solo el id** de la
tarea por `route.params`, nunca el objeto completo. Al guardar una tarea nueva hay
redirección programática de vuelta a la lista. Las tareas viven en un contexto compartido
(`TasksProvider`) para que ambas ramas del navegador vean los mismos datos; en el Módulo 6
ese contexto se reemplaza por Redux Toolkit.

## Estructura del proyecto

```
taskflow-app/
├── App.js                        # Punto de entrada: proveedores + navegador raíz
├── src/
│   ├── navigation/
│   │   ├── RootNavigator.js       # NavigationContainer + Bottom Tabs
│   │   └── TasksStackNavigator.js # Stack anidado de la pestaña Tareas
│   ├── components/
│   │   ├── WelcomeScreen.js       # Pantalla del Checkpoint 1
│   │   ├── ProfileCard.js         # Tarjeta reutilizable (props: name, role, image)
│   │   ├── TaskItem.js            # Fila de la lista de tareas
│   │   └── EmptyState.js          # Mensaje cuando no hay tareas
│   ├── screens/
│   │   ├── TaskListScreen.js      # Lista con FlatList y estado vacío
│   │   ├── TaskDetailScreen.js    # Detalle, recibe el id por route.params
│   │   ├── AddTaskScreen.js       # Formulario controlado con validación
│   │   ├── HomeScreen.js          # Placeholder del Checkpoint 2
│   │   └── ProfileScreen.js       # Muestra ProfileCard con datos de prueba
│   ├── context/
│   │   └── TasksContext.js        # Estado compartido de tareas
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

- Módulo 6: estado global con Redux Toolkit.
- Módulo 7: persistencia con Firebase.
