# TaskFlow

Aplicación móvil de productividad para gestionar tareas, hábitos y metas personales,
construida con React Native y Expo.

## Estado actual

**Checkpoint 1: Estructura base.** Este entregable establece la arquitectura inicial del
proyecto: organización de carpetas, dependencias base de Expo y una pantalla de bienvenida
que confirma que el flujo de renderizado funciona correctamente.

## Estructura del proyecto

```
taskflow-app/
├── App.js                  # Punto de entrada de la aplicación
├── src/
│   ├── components/          # Piezas de interfaz reutilizables
│   ├── screens/              # Vistas principales de la app
│   ├── assets/                # Imágenes y fuentes locales
│   └── theme/                  # Colores y estilos globales (próximos módulos)
└── assets/                       # Assets generados por Expo (ícono, splash)
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

- Módulo 2: pantallas reales de lista y detalle de tareas.
- Módulo 3-4: formularios y listas dinámicas.
- Módulo 5: navegación entre pantallas.
- Módulo 6: estado global con Redux Toolkit.
- Módulo 7: persistencia con Firebase.
