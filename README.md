# Luxe Dental - Landing Page con Captación de Leads

Aplicación web moderna desarrollada con React, Vite, Tailwind CSS y Supabase para la captación de leads de HypeLoop.

## 🚀 Características

- ✨ Landing page moderna y responsiva basada en el diseño original
- 📝 Formulario de calificación (Quiz) interactivo
- 📊 Dashboard para visualizar leads capturados
- 🔒 Integración segura con Supabase
- 🎨 Diseño oscuro profesional con Tailwind CSS
- 📱 Completamente responsivo

## 🛠️ Stack Tecnológico

- **Frontend:** React 18 + Vite
- **Estilos:** Tailwind CSS
- **Base de Datos:** Supabase
- **Routing:** React Router DOM

## 📦 Instalación

1. **Clonar el repositorio o navegar al directorio del proyecto**

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
   
   Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

4. **Configurar Supabase:**
   
   Sigue las instrucciones en `SUPABASE_SETUP.md` para:
   - Crear la tabla `leads`
   - Configurar las políticas RLS
   - Obtener las credenciales necesarias

5. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```

6. **Abrir en el navegador:**
   
   La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
├── src/
│   ├── components/          # Componentes reutilizables
│   │   └── Header.jsx
│   ├── lib/                 # Configuración de librerías
│   │   └── supabaseClient.js
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Home.jsx         # Landing page principal
│   │   ├── Quiz.jsx         # Formulario de calificación
│   │   └── Dashboard.jsx    # Visualización de leads
│   ├── services/            # Servicios y lógica de negocio
│   │   └── leadsService.js   # Funciones para manejar leads
│   ├── App.jsx              # Componente principal con routing
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── .env.example             # Ejemplo de variables de entorno
├── SUPABASE_SETUP.md        # Guía de configuración de Supabase
└── README.md                # Este archivo
```

## 🎯 Funcionalidades

### Landing Page (Home)
- Hero section con imagen de fondo
- Sección de beneficios
- Información sobre doctores
- Galería de resultados (antes/después)
- FAQ (Preguntas frecuentes)
- Footer con CTA

### Formulario de Quiz
- 5 preguntas de calificación interactivas
- Barra de progreso
- Captura de datos personales (nombre, email, teléfono)
- Inserción automática en Supabase
- Manejo de estados de carga y errores
- Página de confirmación

### Dashboard
- Visualización de todos los leads
- Ordenados por fecha (más recientes primero)
- Tabla responsiva con información completa
- Vista detallada de respuestas del quiz
- Botón de actualización manual

## 🔐 Seguridad

### Políticas RLS (Row Level Security)

La aplicación está configurada con las siguientes políticas de seguridad:

1. **Inserción (INSERT):** Permitida para usuarios anónimos (público)
   - Cualquiera puede crear leads a través del formulario
   - Usa la Anon Key de Supabase

2. **Lectura (SELECT):** Restringida
   - Solo accesible con Service Role Key (backend)
   - O mediante políticas específicas de autenticación

**⚠️ Importante:** Para producción, considera crear un backend API que use la Service Role Key para el Dashboard, manteniendo el frontend usando solo la Anon Key.

Ver `SUPABASE_SETUP.md` para más detalles sobre la configuración de seguridad.

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🎨 Personalización

### Colores

Los colores principales están definidos en `tailwind.config.js`:

- **Primary:** #FFD700 (Dorado)
- **Primary Hover:** #E5C100
- **Background Dark:** #000000
- **Surface Dark:** #111111

### Fuentes

- **Display Font:** Inter (Google Fonts)
- **Icons:** Material Symbols Outlined

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Variables de Entorno en Producción

Asegúrate de configurar las variables de entorno en tu plataforma de hosting:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📚 Documentación Adicional

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Configuración detallada de Supabase
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Soporte

Para problemas o preguntas sobre la configuración de Supabase, consulta `SUPABASE_SETUP.md`.

## 📄 Licencia

Este proyecto fue desarrollado para HypeLoop.

---

**Desarrollado con ❤️ usando React, Vite y Supabase**

