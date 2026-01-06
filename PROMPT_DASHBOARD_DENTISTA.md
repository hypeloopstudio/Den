# 🦷 PROMPT COMPLETO: Dashboard del Dentista

## 📋 INFORMACIÓN DEL PROYECTO

**Nombre del Proyecto:** Luxe Dental - Sistema de Captación de Leads y Agendamiento  
**Stack:** React + Vite + Tailwind CSS + Supabase  
**Repositorio:** https://github.com/hypeloopstudio/Den.git

---

## 🔐 CONFIGURACIÓN DE SUPABASE

### Credenciales del Proyecto

```env
VITE_SUPABASE_URL=https://zdcxktkbjxrtrysnpmen.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkY3hrdGtianhydHJ5c25wbWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MjMwNTEsImV4cCI6MjA4MzI5OTA1MX0.aq5XHTQ_P9ymX4cf4Y_YAMrqUXXHgqxNvj89h9Jeilc
```

### Instalación del Cliente Supabase

```bash
npm install @supabase/supabase-js
```

### Configuración del Cliente (supabaseClient.js)

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 🗄️ ESTRUCTURA DE LA BASE DE DATOS

### Tabla: `leads`

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  fecha_cita DATE,
  hora_cita TIME,
  respuestas JSONB,
  puntuacion INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

### Índices

```sql
-- Índice para búsquedas por fecha de creación
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Índice para búsquedas por email
CREATE INDEX idx_leads_email ON leads(email);

-- Índice para búsquedas por fecha de cita
CREATE INDEX idx_leads_fecha_cita ON leads(fecha_cita);

-- Índice compuesto para ordenar por fecha y hora
CREATE INDEX idx_leads_fecha_hora_cita ON leads(fecha_cita, hora_cita);
```

### Campos y Tipos de Datos

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `id` | UUID | Identificador único | `25e8fbdd-b1ac-4197-9593-30b7a458ee1a` |
| `nombre` | TEXT | Nombre completo del paciente | `"Juan Pérez"` |
| `email` | TEXT | Email del paciente | `"juan@example.com"` |
| `telefono` | TEXT | Teléfono del paciente | `"+1234567890"` |
| `fecha_cita` | DATE | Fecha de la cita agendada | `"2024-12-25"` |
| `hora_cita` | TIME | Hora de la cita agendada | `"14:30"` |
| `respuestas` | JSONB | Respuestas del quiz en formato JSON | `{"1": 5, "2": 4, "3": 5, "4": 3, "5": 4}` |
| `puntuacion` | INTEGER | Puntuación total del quiz (0-25) | `21` |
| `created_at` | TIMESTAMP | Fecha y hora de registro | `"2024-12-20T10:30:00Z"` |

---

## 🔒 POLÍTICAS RLS (Row Level Security)

### Habilitar RLS

```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
```

### Política de INSERT (Permitir inserción pública)

```sql
CREATE POLICY "Permitir inserción pública de leads"
ON leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```

### Política de SELECT (Permitir lectura)

```sql
CREATE POLICY "Permitir lectura de leads"
ON leads
FOR SELECT
TO anon, authenticated
USING (true);
```

**⚠️ NOTA:** Para producción, considera usar Service Role Key en un backend en lugar de permitir lectura pública.

---

## 📡 CONSULTAS Y ENDPOINTS

### 1. Obtener Todos los Leads (Ordenados por Fecha de Cita)

```javascript
const { data, error } = await supabase
  .from('leads')
  .select('*')
  .order('fecha_cita', { ascending: true, nullsFirst: false })
  .order('hora_cita', { ascending: true, nullsFirst: false })
  .order('created_at', { ascending: false })
```

### 2. Obtener Leads con Citas Agendadas

```javascript
const { data, error } = await supabase
  .from('leads')
  .select('*')
  .not('fecha_cita', 'is', null)
  .not('hora_cita', 'is', null)
  .order('fecha_cita', { ascending: true })
  .order('hora_cita', { ascending: true })
```

### 3. Obtener Leads por Rango de Fechas

```javascript
const fechaInicio = '2024-12-01'
const fechaFin = '2024-12-31'

const { data, error } = await supabase
  .from('leads')
  .select('*')
  .gte('fecha_cita', fechaInicio)
  .lte('fecha_cita', fechaFin)
  .order('fecha_cita', { ascending: true })
  .order('hora_cita', { ascending: true })
```

### 4. Obtener Citas del Día Actual

```javascript
const hoy = new Date().toISOString().split('T')[0] // "2024-12-20"

const { data, error } = await supabase
  .from('leads')
  .select('*')
  .eq('fecha_cita', hoy)
  .order('hora_cita', { ascending: true })
```

### 5. Obtener Citas Próximas (Próximos 7 días)

```javascript
const hoy = new Date().toISOString().split('T')[0]
const proximaSemana = new Date()
proximaSemana.setDate(proximaSemana.getDate() + 7)
const fechaFin = proximaSemana.toISOString().split('T')[0]

const { data, error } = await supabase
  .from('leads')
  .select('*')
  .gte('fecha_cita', hoy)
  .lte('fecha_cita', fechaFin)
  .order('fecha_cita', { ascending: true })
  .order('hora_cita', { ascending: true })
```

### 6. Estadísticas Generales

```javascript
// Total de leads
const { count: totalLeads } = await supabase
  .from('leads')
  .select('*', { count: 'exact', head: true })

// Leads con citas agendadas
const { count: citasAgendadas } = await supabase
  .from('leads')
  .select('*', { count: 'exact', head: true })
  .not('fecha_cita', 'is', null)

// Citas de hoy
const hoy = new Date().toISOString().split('T')[0]
const { count: citasHoy } = await supabase
  .from('leads')
  .select('*', { count: 'exact', head: true })
  .eq('fecha_cita', hoy)
```

---

## 📊 ESTRUCTURA DE DATOS DE EJEMPLO

### Lead Completo

```json
{
  "id": "25e8fbdd-b1ac-4197-9593-30b7a458ee1a",
  "nombre": "Juan Pérez",
  "email": "juan.perez@example.com",
  "telefono": "+1234567890",
  "fecha_cita": "2024-12-25",
  "hora_cita": "14:30",
  "respuestas": {
    "1": 5,
    "2": 4,
    "3": 5,
    "4": 3,
    "5": 4
  },
  "puntuacion": 21,
  "created_at": "2024-12-20T10:30:00.000Z"
}
```

### Lead sin Cita Agendada

```json
{
  "id": "35e8fbdd-b1ac-4197-9593-30b7a458ee1b",
  "nombre": "María García",
  "email": "maria.garcia@example.com",
  "telefono": "+0987654321",
  "fecha_cita": null,
  "hora_cita": null,
  "respuestas": {
    "1": 3,
    "2": 2,
    "3": 4,
    "4": 5,
    "5": 3
  },
  "puntuacion": 17,
  "created_at": "2024-12-19T15:45:00.000Z"
}
```

---

## 🎨 FUNCIONES DE FORMATEO

### Formatear Fecha de Cita

```javascript
const formatAppointmentDate = (dateString) => {
  if (!dateString) return 'No agendada'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
// Resultado: "miércoles, 25 de diciembre de 2024"
```

### Formatear Hora

```javascript
const formatTime = (timeString) => {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}
// Resultado: "2:30 PM"
```

### Formatear Fecha de Registro

```javascript
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
// Resultado: "20 dic 2024, 10:30"
```

---

## 🚀 SERVICIO COMPLETO (leadsService.js)

```javascript
import { supabase } from './supabaseClient'

/**
 * Obtiene todos los leads ordenados por fecha de cita
 */
export async function fetchLeads() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('fecha_cita', { ascending: true, nullsFirst: false })
      .order('hora_cita', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) throw error
    return { success: true, data: data || [], error: null }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Obtiene leads con citas agendadas
 */
export async function fetchAppointments() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .not('fecha_cita', 'is', null)
      .not('hora_cita', 'is', null)
      .order('fecha_cita', { ascending: true })
      .order('hora_cita', { ascending: true })

    if (error) throw error
    return { success: true, data: data || [], error: null }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Obtiene citas de un rango de fechas
 */
export async function fetchAppointmentsByDateRange(startDate, endDate) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .gte('fecha_cita', startDate)
      .lte('fecha_cita', endDate)
      .order('fecha_cita', { ascending: true })
      .order('hora_cita', { ascending: true })

    if (error) throw error
    return { success: true, data: data || [], error: null }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Obtiene citas del día actual
 */
export async function fetchTodayAppointments() {
  try {
    const hoy = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('fecha_cita', hoy)
      .order('hora_cita', { ascending: true })

    if (error) throw error
    return { success: true, data: data || [], error: null }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Obtiene estadísticas generales
 */
export async function fetchStatistics() {
  try {
    // Total de leads
    const { count: totalLeads } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    // Leads con citas agendadas
    const { count: appointments } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .not('fecha_cita', 'is', null)

    // Citas de hoy
    const hoy = new Date().toISOString().split('T')[0]
    const { count: todayAppointments } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('fecha_cita', hoy)

    return {
      success: true,
      data: {
        totalLeads: totalLeads || 0,
        appointments: appointments || 0,
        todayAppointments: todayAppointments || 0
      },
      error: null
    }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}
```

---

## 📦 DEPENDENCIAS NECESARIAS

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.38.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

---

## 🎯 CARACTERÍSTICAS SUGERIDAS PARA EL DASHBOARD

### 1. Vista de Calendario
- Calendario mensual con citas marcadas
- Vista semanal/diaria
- Navegación entre meses

### 2. Lista de Citas
- Tabla con todas las citas agendadas
- Filtros por fecha, estado, etc.
- Búsqueda por nombre/email

### 3. Estadísticas
- Total de leads
- Citas agendadas
- Citas de hoy
- Citas de la semana
- Tasa de conversión (leads con cita / total leads)

### 4. Detalles del Paciente
- Información completa del lead
- Respuestas del quiz
- Historial de interacciones

### 5. Gestión de Citas
- Marcar como completada
- Cancelar cita
- Reagendar cita
- Enviar recordatorios

---

## 🔧 CONFIGURACIÓN DE VARIABLES DE ENTORNO

Crea un archivo `.env`:

```env
VITE_SUPABASE_URL=https://zdcxktkbjxrtrysnpmen.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkY3hrdGtianhydHJ5c25wbWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MjMwNTEsImV4cCI6MjA4MzI5OTA1MX0.aq5XHTQ_P9ymX4cf4Y_YAMrqUXXHgqxNvj89h9Jeilc
```

---

## 📝 NOTAS IMPORTANTES

1. **Seguridad:** Las políticas RLS actuales permiten lectura pública. Para producción, considera usar Service Role Key en un backend.

2. **Formato de Fechas:** 
   - `fecha_cita`: Formato DATE (YYYY-MM-DD)
   - `hora_cita`: Formato TIME (HH:MM)
   - `created_at`: Formato TIMESTAMP con timezone

3. **Ordenamiento:** Los leads se ordenan primero por `fecha_cita`, luego por `hora_cita`, y finalmente por `created_at`.

4. **Valores Nulos:** Los campos `fecha_cita` y `hora_cita` pueden ser NULL si el lead no ha agendado una cita.

5. **Puntuación:** El rango de puntuación es de 0 a 25 (5 preguntas × 5 puntos máximo cada una).

---

## 🚀 PROMPT PARA CREAR EL DASHBOARD

```
Crea un Dashboard del Dentista usando React + Vite + Tailwind CSS + Supabase.

REQUISITOS:
1. Conectar con Supabase usando las credenciales proporcionadas
2. Mostrar todas las citas agendadas ordenadas por fecha y hora
3. Vista de calendario mensual con citas marcadas
4. Estadísticas: total leads, citas agendadas, citas de hoy
5. Tabla con detalles de cada cita (nombre, email, teléfono, fecha, hora, puntuación)
6. Filtros por fecha y búsqueda por nombre/email
7. Diseño moderno y profesional con Tailwind CSS
8. Responsive para móvil y desktop

ESTRUCTURA DE DATOS:
- Tabla: leads
- Campos: id, nombre, email, telefono, fecha_cita, hora_cita, respuestas, puntuacion, created_at

CONSULTAS NECESARIAS:
- Obtener todas las citas ordenadas por fecha/hora
- Obtener citas de un rango de fechas
- Obtener citas del día actual
- Estadísticas generales

Usa el servicio leadsService.js proporcionado como referencia.
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Configurar Supabase client
- [ ] Crear servicio para obtener leads
- [ ] Implementar vista de calendario
- [ ] Implementar tabla de citas
- [ ] Agregar estadísticas
- [ ] Implementar filtros y búsqueda
- [ ] Agregar formateo de fechas/horas
- [ ] Diseño responsive
- [ ] Manejo de errores
- [ ] Estados de carga

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0


