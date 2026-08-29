# TaskFlow

Aplicación móvil de productividad para gestionar tareas, hábitos y metas personales,
construida con React Native y Expo.

## Avance por módulo

El proyecto se construye de forma incremental: cada módulo del curso deja su propio punto
marcado en el historial. Esta rama muestra siempre el avance más reciente; para ver el
proyecto tal como quedó al cerrar un módulo puntual, entrar por su enlace.

| Módulo | Entregado | Ver ese punto del proyecto |
|---|---|---|
| 2 | Pantallas iniciales y tarjeta de perfil | [checkpoint-2](https://github.com/Dranthonymarte/taskflow-app/tree/checkpoint-2) |
| 3 | Formulario de nueva tarea con validación | [checkpoint-3](https://github.com/Dranthonymarte/taskflow-app/tree/checkpoint-3) |
| 4 | Lista con FlatList, detalle y estado vacío | [checkpoint-4](https://github.com/Dranthonymarte/taskflow-app/tree/checkpoint-4) |
| 5 | Navegación con pestañas y stack anidado | [checkpoint-5](https://github.com/Dranthonymarte/taskflow-app/tree/checkpoint-5) |
| 6 | Estado global con Redux Toolkit | [checkpoint-6](https://github.com/Dranthonymarte/taskflow-app/tree/checkpoint-6) |

## Estado actual

**Checkpoint 6: Redux Toolkit y estado global.** El contexto de React que compartía las
tareas se reemplazó por un store de Redux Toolkit. El slice `tasks` concentra las cuatro
acciones del dominio (`addTask`, `toggleTaskStatus`, `deleteTask` y `setFilter`); dentro de
los reducers el estado se escribe como si se mutara porque Immer, incluido en Redux Toolkit,
se encarga de mantenerlo inmutable. Las pantallas ya no guardan tareas en `useState`: leen
con `useSelector` a través de selectores específicos y escriben con `useDispatch`. El filtro
(todas / pendientes / completadas) también vive en el store, así que se mantiene al navegar
al detalle y volver.

## Estructura del proyecto

```
taskflow-app/
├── App.js                        # Provider de Redux + navegador raíz
├── src/
│   ├── store/
│   │   ├── index.js               # configureStore
│   │   └── tasksSlice.js          # Slice de tareas, acciones y selectores
│   ├── navigation/
│   │   ├── RootNavigator.js       # NavigationContainer + Bottom Tabs
│   │   └── TasksStackNavigator.js # Stack anidado de la pestaña Tareas
│   ├── components/
│   │   ├── WelcomeScreen.js       # Pantalla del Checkpoint 1
│   │   ├── ProfileCard.js         # Tarjeta reutilizable (props: name, role, image)
│   │   ├── TaskItem.js            # Fila de la lista de tareas
│   │   ├── TaskFilters.js         # Chips de filtrado conectados al store
│   │   └── EmptyState.js          # Mensaje cuando no hay tareas
│   ├── screens/
│   │   ├── TaskListScreen.js      # Lista con FlatList, filtros y estado vacío
│   │   ├── TaskDetailScreen.js    # Detalle, recibe el id por route.params
│   │   ├── AddTaskScreen.js       # Formulario controlado con validación
│   │   ├── HomeScreen.js          # Placeholder del Checkpoint 2
│   │   └── ProfileScreen.js       # Muestra ProfileCard con datos de prueba
│   ├── constants/
│   │   └── colors.js              # Paleta de colores de TaskFlow
│   ├── data/
│   │   └── tareasIniciales.js     # Datos de ejemplo
│   ├── assets/                    # Imágenes y fuentes locales
│   └── theme/                     # Reservado para próximos módulos
└── assets/                        # Assets generados por Expo (ícono, splash)
```

## Dependencias principales

| Paquete | Para qué se usa |
|---|---|
| `expo` / `react-native` | Base del proyecto (Managed Workflow, SDK 54) |
| `@reduxjs/toolkit` | Store global, `configureStore` y `createSlice` |
| `react-redux` | Hooks `useSelector` y `useDispatch` en las pantallas |
| `@react-navigation/native` | Contenedor de navegación |
| `@react-navigation/native-stack` | Stack de la pestaña Tareas |
| `@react-navigation/bottom-tabs` | Pestañas inferiores |
| `react-native-screens` · `react-native-safe-area-context` | Requisitos nativos de React Navigation |

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

- Módulo 7: autenticación y persistencia con Firebase.
