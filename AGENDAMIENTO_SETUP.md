# 📅 Sistema de Agendamiento de Citas

Este documento explica cómo configurar y usar el sistema de agendamiento de citas.

## 🗄️ Configuración de la Base de Datos

### Paso 1: Agregar Campos a la Tabla `leads`

Ejecuta el siguiente SQL en el SQL Editor de Supabase:

```sql
-- Agregar columna para la fecha de la cita
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS fecha_cita DATE;

-- Agregar columna para la hora de la cita
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS hora_cita TIME;

-- Crear índice para búsquedas rápidas por fecha de cita
CREATE INDEX IF NOT EXISTS idx_leads_fecha_cita ON leads(fecha_cita);

-- Crear índice compuesto para ordenar por fecha y hora
CREATE INDEX IF NOT EXISTS idx_leads_fecha_hora_cita ON leads(fecha_cita, hora_cita);
```

O simplemente ejecuta el archivo `add-appointment-fields.sql` que está en la raíz del proyecto.

## 📋 Flujo del Formulario

El formulario ahora tiene **10 pasos** en total:

1. **Nombre completo** - Campo de texto
2. **Email** - Campo de email
3. **Teléfono** - Campo de teléfono
4. **Fecha de cita** - Selector de fecha (calendario)
5. **Hora de cita** - Selector de hora (9:00 AM - 6:00 PM, cada 30 min)
6-10. **5 Preguntas del quiz** - Preguntas de evaluación

## 🎨 Componentes Creados

### DatePicker (`src/components/DatePicker.jsx`)
- Selector de fecha con calendario
- Valida que la fecha sea entre hoy y 30 días en el futuro
- Puede deshabilitar fechas específicas (útil para bloquear días no disponibles)

### TimePicker (`src/components/TimePicker.jsx`)
- Selector de hora con slots de 30 minutos
- Horarios disponibles: 9:00 AM - 6:00 PM
- Puede deshabilitar horas específicas (útil para bloquear horas ocupadas)

## 📊 Dashboard Actualizado

El Dashboard ahora muestra:
- **Columna "Cita Agendada"**: Muestra la fecha y hora de la cita
- **Ordenamiento**: Los leads se ordenan primero por fecha de cita, luego por hora
- **Indicadores visuales**: Las citas agendadas se muestran en color primario

## 🔧 Personalización

### Cambiar Horarios Disponibles

Edita `src/components/TimePicker.jsx`:

```javascript
// Cambiar el rango de horas (actualmente 9 AM - 6 PM)
for (let hour = 9; hour <= 18; hour++) {
  // Cambia 9 y 18 por tus horarios deseados
}

// Cambiar el intervalo (actualmente cada 30 minutos)
for (let minute = 0; minute < 60; minute += 30) {
  // Cambia 30 por 15, 60, etc.
}
```

### Cambiar Rango de Fechas Disponibles

Edita `src/components/DatePicker.jsx`:

```javascript
// Cambiar días en el futuro (actualmente 30 días)
const max = maxDate || (() => {
  const date = new Date(today)
  date.setDate(date.getDate() + 30) // Cambia 30 por el número de días deseado
  return date
})()
```

### Bloquear Fechas/Horas Específicas

Puedes pasar arrays de fechas/horas deshabilitadas:

```javascript
// En Quiz.jsx
<DatePicker
  value={formData.fecha_cita}
  onChange={(date) => setFormData({ ...formData, fecha_cita: date })}
  disabledDates={['2024-12-25', '2024-12-31']} // Fechas bloqueadas
/>

<TimePicker
  value={formData.hora_cita}
  onChange={(time) => setFormData({ ...formData, hora_cita: time })}
  disabledTimes={['12:00', '13:00']} // Horas bloqueadas
/>
```

## 🚀 Próximos Pasos (Opcional)

### 1. Validar Disponibilidad
Puedes crear una función que verifique si una fecha/hora ya está ocupada:

```javascript
// En leadsService.js
export async function checkAvailability(fecha, hora) {
  const { data, error } = await supabase
    .from('leads')
    .select('id')
    .eq('fecha_cita', fecha)
    .eq('hora_cita', hora)
    .limit(1)
  
  return !data || data.length === 0 // true si está disponible
}
```

### 2. Vista de Calendario
Puedes crear una vista de calendario mensual para el Dashboard que muestre todas las citas agendadas.

### 3. Notificaciones
Integrar con servicios de email (SendGrid, Resend) o SMS (Twilio) para enviar recordatorios de citas.

### 4. Cancelación/Reagendamiento
Agregar funcionalidad para que los usuarios puedan cancelar o cambiar su cita.

## ✅ Checklist de Verificación

- [ ] Ejecutar el SQL para agregar campos `fecha_cita` y `hora_cita`
- [ ] Verificar que el formulario muestre los selectores de fecha y hora
- [ ] Probar agendar una cita completa
- [ ] Verificar que la cita se guarde en Supabase
- [ ] Verificar que el Dashboard muestre las citas agendadas correctamente
- [ ] Probar ordenamiento por fecha/hora en el Dashboard

## 📝 Notas

- Las fechas se guardan en formato `DATE` (YYYY-MM-DD)
- Las horas se guardan en formato `TIME` (HH:MM)
- El sistema permite múltiples citas en la misma fecha/hora (puedes agregar validación si lo necesitas)
- Los campos de fecha y hora son opcionales (pueden ser NULL)

