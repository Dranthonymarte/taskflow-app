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
| 7 | Autenticación y persistencia con Firebase | [checkpoint-7](https://github.com/Dranthonymarte/taskflow-app/tree/checkpoint-7) |

## Dónde mirar cada módulo

El proyecto es acumulativo y todo vive en `main`, así que las pantallas de los primeros
módulos conviven con las de los últimos. Esta tabla dice dónde quedó cada cosa.

| Módulo | Qué se puede ver | Dónde está |
|---|---|---|
| 2 | El perfil mostrando la tarjeta `ProfileCard` alimentada por props (`name`, `role`, `image`). Las pantallas de bienvenida e inicio de ese módulo quedaron en el tag [checkpoint-2](https://github.com/Dranthonymarte/taskflow-app/tree/checkpoint-2) | `src/screens/ProfileScreen.js`, `src/components/ProfileCard.js` |
| 3 | Formulario de nueva tarea con estado controlado, validación y mensajes de error debajo de cada campo | `src/screens/AddTaskScreen.js` |
| 4 | Lista con `FlatList`, mensaje de lista vacía, y detalle de la tarea con su fecha y un botón para volver | `src/screens/TaskListScreen.js`, `src/components/EmptyState.js`, `src/screens/TaskDetailScreen.js` |
| 5 | Pestañas inferiores con un stack anidado dentro de la pestaña de tareas | `src/navigation/` |
| 6 | Store central, slice de tareas y filtros que se mantienen al cambiar de pantalla | `src/store/` |
| 7 | Registro, inicio de sesión y tareas propias sincronizadas con Firestore | `src/services/`, `src/hooks/` |

Una aclaración sobre el Módulo 4: la consigna proponía alternar entre la lista y el detalle
con un estado `selectedTask`, porque en ese punto todavía no habíamos visto React Navigation.
Al llegar al Módulo 5 ese estado se reemplazó por un Stack real, y la tarea seleccionada pasó
a viajar como `route.params.tareaId`. El comportamiento para quien usa la app es el mismo
—se toca una tarea, se abre su detalle, se vuelve a la lista— pero resuelto con la
herramienta que pedía el módulo siguiente.

## Estado actual

**Checkpoint 7: Firebase, autenticación y persistencia de datos.** TaskFlow dejó de ser una
app con datos de ejemplo: ahora cada persona tiene su cuenta y sus tareas viven en la nube.

- **Registro e inicio de sesión** con correo y contraseña (Firebase Authentication). Los dos
  formularios comparten el componente `AuthForm` y traducen los códigos de error de Firebase
  a mensajes en castellano.
- **Sesión persistente**: `initializeAuth` se configura con `AsyncStorage`, así que al cerrar
  y reabrir la app la sesión sigue abierta. Con `getAuth()` a secas se perdería en cada
  arranque.
- **Rutas protegidas**: `RootNavigator` decide qué mostrar según haya sesión o no. Sin
  sesión solo existe el stack de login; con sesión, las pestañas completas. Mientras Firebase
  comprueba si había una sesión guardada se muestra un indicador de carga, para no mostrarle
  el login por un instante a alguien que ya estaba conectado.
- **Tareas en Firestore filtradas por usuario**: `onSnapshot` con
  `where('userId', '==', uid)` mantiene la lista sincronizada en tiempo real y trae
  únicamente las tareas propias.
- **Listeners con limpieza**: tanto `onAuthStateChanged` como `onSnapshot` devuelven su
  función de cancelación desde el `useEffect`, para no dejar escuchas colgadas.
- Las acciones del store (`addTask`, `toggleTaskStatus`, `deleteTask`) siguen usándose para
  que la pantalla responda al instante, mientras la escritura en Firestore viaja en paralelo
  y `setTasks` reconcilia con lo que confirma el servidor.

## Estructura del proyecto

```
taskflow-app/
├── App.js                        # Provider de Redux + navegador raíz
├── firestore.rules               # Reglas de seguridad para cerrar la base
├── src/
│   ├── services/
│   │   ├── firebase.js            # Inicialización de Firebase, Auth y Firestore
│   │   ├── authService.js         # Registro, inicio y cierre de sesión
│   │   └── tasksService.js        # Lectura en vivo y escritura de tareas
│   ├── hooks/
│   │   ├── useAuthListener.js     # Escucha el estado de la sesión
│   │   └── useTasksSync.js        # Sincroniza las tareas del usuario
│   ├── store/
│   │   ├── index.js               # configureStore
│   │   ├── tasksSlice.js          # Slice de tareas, acciones y selectores
│   │   └── authSlice.js           # Slice de sesión
│   ├── navigation/
│   │   ├── RootNavigator.js       # Decide entre login y app según la sesión
│   │   ├── AuthNavigator.js       # Stack de login y registro
│   │   ├── MainTabsNavigator.js   # Pestañas Tareas y Perfil
│   │   └── TasksStackNavigator.js # Stack anidado de la pestaña Tareas
│   ├── components/
│   │   ├── AuthForm.js            # Formulario compartido de login y registro
│   │   ├── ProfileCard.js         # Tarjeta reutilizable (props: name, role, image)
│   │   ├── TaskItem.js            # Fila de la lista de tareas
│   │   ├── TaskFilters.js         # Chips de filtrado conectados al store
│   │   └── EmptyState.js          # Mensaje cuando no hay tareas
│   ├── screens/
│   │   ├── ProfileScreen.js       # Perfil: avatar, datos y cierre de sesión
│   │   ├── LoginScreen.js         # Inicio de sesión
│   │   ├── RegisterScreen.js      # Creación de cuenta
│   │   ├── TaskListScreen.js      # Lista con FlatList, filtros y estado vacío
│   │   ├── TaskDetailScreen.js    # Detalle, recibe el id por route.params
│   │   └── AddTaskScreen.js       # Formulario controlado con validación
│   ├── constants/
│   │   └── colors.js              # Paleta de colores de TaskFlow
│   └── utils/
│       └── promesas.js            # Límite de tiempo para las escrituras
└── assets/                        # Assets generados por Expo (ícono, splash)
```

## Dependencias principales

| Paquete | Para qué se usa |
|---|---|
| `expo` / `react-native` | Base del proyecto (Managed Workflow, SDK 54) |
| `firebase` | Authentication y Firestore (SDK Web, el compatible con Expo Go) |
| `@react-native-async-storage/async-storage` | Guarda la sesión entre arranques de la app |
| `@reduxjs/toolkit` | Store global, `configureStore` y `createSlice` |
| `react-redux` | Hooks `useSelector` y `useDispatch` en las pantallas |
| `@react-navigation/native` | Contenedor de navegación |
| `@react-navigation/native-stack` | Stacks de login y de tareas |
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
4. Entrar con la cuenta de demostración o crear una propia desde la pantalla de registro.
   El correo no necesita ser real: Firebase no lo verifica en este modo.

## Cuenta de demostración

Para probar la app sin tener que registrarse:

| Correo | Contraseña |
|---|---|
| `demo@taskflow.com` | `demo123` |

La cuenta ya tiene algunas tareas cargadas, tanto pendientes como completadas, para poder
ver la lista, los filtros y la pantalla de detalle sin cargar nada a mano.

Es una cuenta compartida y de prueba, así que su contenido puede variar según quién la haya
usado antes. Para probar el aislamiento entre usuarios —que cada cuenta ve solo sus propias
tareas— conviene registrar una cuenta nueva con cualquier correo: la lista va a aparecer
vacía, sin las tareas de la demostración.

## Sobre las claves de Firebase

El objeto `firebaseConfig` de `src/services/firebase.js` está en el repositorio a propósito.
No es información secreta: identifica al proyecto y viaja dentro de cualquier app publicada,
donde cualquiera puede leerlo. Lo que protege los datos son las reglas de seguridad, no ese
archivo.

La base se creó en **modo de prueba**, que deja leer y escribir a cualquiera y caduca a los
30 días. El archivo `firestore.rules` contiene las reglas definitivas, que limitan cada tarea
a su dueño. Para aplicarlas: consola de Firebase → Firestore Database → pestaña **Reglas** →
pegar el contenido del archivo → **Publicar**.

## Próximos pasos

- Módulo 8: foto de perfil con la cámara del dispositivo y entrega final.
