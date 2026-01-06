# 📅 Integración con Cal.com

Esta guía explica cómo integrar Cal.com para la gestión de reservas en el formulario y el Dashboard.

## 🎯 Opciones de Integración

### Opción 1: Embed Widget (Recomendado para inicio rápido)
- Insertar el widget de Cal.com directamente en la página
- Más fácil de implementar
- Cal.com maneja toda la lógica de agendamiento

### Opción 2: API de Cal.com (Recomendado para control total)
- Usar la API de Cal.com para crear eventos
- Sincronizar con Supabase
- Más control sobre el flujo

### Opción 3: Webhooks (Para sincronización automática)
- Cal.com envía notificaciones cuando se crean/cancelan citas
- Sincronizar automáticamente con Supabase

---

## 🔧 Opción 1: Embed Widget (Más Fácil)

### Paso 1: Obtener tu Link de Cal.com

1. Ve a [cal.com](https://cal.com) y crea una cuenta
2. Configura tu calendario y disponibilidad
3. Obtén tu link de agendamiento (ej: `https://cal.com/tu-usuario/30min`)

### Paso 2: Instalar el SDK de Cal.com

```bash
npm install @calcom/embed-react
```

### Paso 3: Integrar en el Formulario

```javascript
// src/components/CalComEmbed.jsx
import { useEffect } from 'react'

function CalComEmbed({ calLink, onBookingComplete }) {
  useEffect(() => {
    // Cargar el script de Cal.com
    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    document.body.appendChild(script)

    // Escuchar eventos de Cal.com
    window.addEventListener('message', (e) => {
      if (e.data.origin !== 'https://cal.com') return
      
      if (e.data.type === 'cal:bookingSuccessful') {
        const booking = e.data.detail
        if (onBookingComplete) {
          onBookingComplete({
            startTime: booking.startTime,
            endTime: booking.endTime,
            attendee: booking.attendee,
            eventType: booking.eventType
          })
        }
      }
    })

    return () => {
      document.body.removeChild(script)
    }
  }, [calLink, onBookingComplete])

  return (
    <div className="cal-embed-container">
      <div 
        className="cal-embed"
        data-cal-link={calLink}
        data-cal-config='{"layout":"month_view"}'
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      />
    </div>
  )
}

export default CalComEmbed
```

### Paso 4: Usar en el Formulario Quiz

```javascript
// src/pages/Quiz.jsx
import CalComEmbed from '../components/CalComEmbed'

// En el componente, reemplazar los selectores de fecha/hora con:
{currentStep === 3 && (
  <div className="w-full">
    <h3 className="text-white text-xl font-bold mb-4">
      Selecciona una fecha y hora para tu cita
    </h3>
    <div className="bg-surface-dark rounded-xl p-4" style={{ minHeight: '600px' }}>
      <CalComEmbed 
        calLink="tu-usuario/30min" // Tu link de Cal.com
        onBookingComplete={(booking) => {
          // Guardar la fecha y hora seleccionadas
          const fecha = new Date(booking.startTime).toISOString().split('T')[0]
          const hora = new Date(booking.startTime).toTimeString().split(' ')[0].slice(0, 5)
          
          setFormData({
            ...formData,
            fecha_cita: fecha,
            hora_cita: hora,
            cal_com_booking_id: booking.id // Opcional: guardar ID de Cal.com
          })
          
          // Avanzar al siguiente paso
          setCurrentStep(4)
        }}
      />
    </div>
  </div>
)}
```

---

## 🔌 Opción 2: API de Cal.com (Control Total)

### Paso 1: Obtener API Key

1. Ve a Cal.com → Settings → API
2. Crea un nuevo API Key
3. Guarda el API Key de forma segura

### Paso 2: Instalar dependencias

```bash
npm install @calcom/api
```

### Paso 3: Crear servicio de Cal.com

```javascript
// src/services/calcomService.js
const CALCOM_API_KEY = import.meta.env.VITE_CALCOM_API_KEY
const CALCOM_BASE_URL = 'https://api.cal.com/v1'

/**
 * Obtener disponibilidad de un evento
 */
export async function getAvailability(eventTypeId, dateFrom, dateTo) {
  try {
    const response = await fetch(
      `${CALCOM_BASE_URL}/slots/availability?eventTypeId=${eventTypeId}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: {
          'Authorization': `Bearer ${CALCOM_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    const data = await response.json()
    return { success: true, data, error: null }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Crear una reserva en Cal.com
 */
export async function createBooking(eventTypeId, startTime, attendeeEmail, attendeeName) {
  try {
    const response = await fetch(`${CALCOM_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CALCOM_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventTypeId,
        start: startTime,
        responses: {
          email: attendeeEmail,
          name: attendeeName
        }
      })
    })
    
    const data = await response.json()
    return { success: true, data, error: null }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Obtener todas las reservas
 */
export async function getBookings(startDate, endDate) {
  try {
    const response = await fetch(
      `${CALCOM_BASE_URL}/bookings?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          'Authorization': `Bearer ${CALCOM_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    const data = await response.json()
    return { success: true, data, error: null }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}
```

### Paso 4: Sincronizar con Supabase

```javascript
// src/services/leadsService.js - Agregar función
export async function syncCalComBooking(leadId, calComBookingId, startTime, endTime) {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase no configurado' }
  }

  try {
    const fecha = new Date(startTime).toISOString().split('T')[0]
    const hora = new Date(startTime).toTimeString().split(' ')[0].slice(0, 5)

    const { data, error } = await supabase
      .from('leads')
      .update({
        fecha_cita: fecha,
        hora_cita: hora,
        cal_com_booking_id: calComBookingId,
        cal_com_start_time: startTime,
        cal_com_end_time: endTime
      })
      .eq('id', leadId)
      .select()

    if (error) throw error
    return { success: true, data: data[0], error: null }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

---

## 🔔 Opción 3: Webhooks (Sincronización Automática)

### Paso 1: Configurar Webhook en Cal.com

1. Ve a Cal.com → Settings → Webhooks
2. Crea un nuevo webhook
3. URL: `https://tu-dominio.com/api/calcom-webhook`
4. Eventos: `BOOKING_CREATED`, `BOOKING_CANCELLED`

### Paso 2: Crear Endpoint de Webhook (Backend)

```javascript
// Ejemplo con Node.js/Express
app.post('/api/calcom-webhook', async (req, res) => {
  const { triggerEvent, payload } = req.body

  if (triggerEvent === 'BOOKING_CREATED') {
    const { id, startTime, endTime, attendees } = payload
    
    // Buscar lead por email
    const { data: lead } = await supabase
      .from('leads')
      .select('id')
      .eq('email', attendees[0].email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (lead) {
      // Actualizar lead con información de Cal.com
      const fecha = new Date(startTime).toISOString().split('T')[0]
      const hora = new Date(startTime).toTimeString().split(' ')[0].slice(0, 5)

      await supabase
        .from('leads')
        .update({
          fecha_cita: fecha,
          hora_cita: hora,
          cal_com_booking_id: id,
          cal_com_start_time: startTime,
          cal_com_end_time: endTime
        })
        .eq('id', lead.id)
    }
  }

  res.status(200).json({ received: true })
})
```

---

## 📊 Integración en el Dashboard

### Opción A: Mostrar Reservas de Cal.com + Supabase

```javascript
// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react'
import { fetchLeads } from '../services/leadsService'
import { getBookings } from '../services/calcomService'

function Dashboard() {
  const [leads, setLeads] = useState([])
  const [calComBookings, setCalComBookings] = useState([])
  const [view, setView] = useState('combined') // 'leads', 'calcom', 'combined'

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    // Cargar leads de Supabase
    const leadsResult = await fetchLeads()
    if (leadsResult.success) {
      setLeads(leadsResult.data)
    }

    // Cargar reservas de Cal.com
    const startDate = new Date().toISOString().split('T')[0]
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1)
    const endDateStr = endDate.toISOString().split('T')[0]

    const bookingsResult = await getBookings(startDate, endDateStr)
    if (bookingsResult.success) {
      setCalComBookings(bookingsResult.data.bookings || [])
    }
  }

  // Combinar datos
  const combinedData = leads.map(lead => {
    const calComBooking = calComBookings.find(
      booking => booking.attendees?.some(a => a.email === lead.email)
    )
    
    return {
      ...lead,
      calComBooking,
      source: calComBooking ? 'calcom' : 'form'
    }
  })

  return (
    <div>
      {/* Tabs para cambiar vista */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setView('combined')}>Todos</button>
        <button onClick={() => setView('leads')}>Solo Formulario</button>
        <button onClick={() => setView('calcom')}>Solo Cal.com</button>
      </div>

      {/* Mostrar datos según vista seleccionada */}
      {view === 'combined' && (
        <AppointmentsTable data={combinedData} />
      )}
      {view === 'calcom' && (
        <CalComBookingsTable bookings={calComBookings} />
      )}
    </div>
  )
}
```

### Opción B: Embed Cal.com en el Dashboard

```javascript
// Mostrar calendario de Cal.com en el Dashboard
import CalComEmbed from '../components/CalComEmbed'

function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Vista de Supabase */}
      <div>
        <h2>Citas del Formulario</h2>
        <LeadsTable leads={leads} />
      </div>

      {/* Vista de Cal.com */}
      <div>
        <h2>Calendario Cal.com</h2>
        <CalComEmbed calLink="tu-usuario/30min" />
      </div>
    </div>
  )
}
```

---

## 🗄️ Actualizar Estructura de Base de Datos

Agregar campos para Cal.com:

```sql
-- Agregar columnas para Cal.com
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS cal_com_booking_id TEXT,
ADD COLUMN IF NOT EXISTS cal_com_start_time TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cal_com_end_time TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cal_com_event_type_id INTEGER;

-- Índice para búsquedas por booking ID
CREATE INDEX IF NOT EXISTS idx_leads_cal_com_booking_id ON leads(cal_com_booking_id);
```

---

## 🔐 Variables de Entorno

Agregar a tu `.env`:

```env
# Cal.com
VITE_CALCOM_API_KEY=tu_api_key_aqui
VITE_CALCOM_USERNAME=tu-usuario
VITE_CALCOM_EVENT_TYPE_ID=123456
```

---

## 📝 Flujo Recomendado

### Para el Formulario (Quiz):

1. **Opción Simple**: Usar embed widget de Cal.com
   - Reemplazar selectores de fecha/hora con widget
   - Al completar reserva, guardar datos en Supabase

2. **Opción Avanzada**: Usar API de Cal.com
   - Mostrar disponibilidad personalizada
   - Crear reserva desde el formulario
   - Sincronizar automáticamente

### Para el Dashboard:

1. **Vista Combinada**: Mostrar citas de Supabase + Cal.com
2. **Sincronización**: Usar webhooks para mantener sincronizado
3. **Calendario**: Embed de Cal.com para vista de calendario

---

## ✅ Checklist de Implementación

- [ ] Crear cuenta en Cal.com
- [ ] Configurar calendario y disponibilidad
- [ ] Obtener link de agendamiento o API Key
- [ ] Instalar dependencias necesarias
- [ ] Integrar widget o API en el formulario
- [ ] Actualizar estructura de BD (campos Cal.com)
- [ ] Sincronizar con Supabase
- [ ] Integrar en Dashboard
- [ ] Configurar webhooks (opcional)
- [ ] Probar flujo completo

---

## 🚀 Ejemplo Completo: Integración con Widget

```javascript
// src/pages/Quiz.jsx - Paso 3 (Fecha/Hora)
{currentStep === 3 && (
  <div className="space-y-6">
    <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
      Selecciona fecha y hora para tu cita
    </h2>
    
    <div className="bg-surface-dark rounded-xl p-4" style={{ minHeight: '600px' }}>
      <CalComEmbed 
        calLink={import.meta.env.VITE_CALCOM_USERNAME + '/30min'}
        onBookingComplete={async (booking) => {
          const fecha = new Date(booking.startTime).toISOString().split('T')[0]
          const hora = new Date(booking.startTime).toTimeString().split(' ')[0].slice(0, 5)
          
          setFormData({
            ...formData,
            fecha_cita: fecha,
            hora_cita: hora,
            cal_com_booking_id: booking.id
          })
          
          setError(null)
          setCurrentStep(4) // Avanzar a preguntas
        }}
      />
    </div>
    
    <p className="text-text-dim text-sm">
      Selecciona una fecha y hora disponible en el calendario de arriba
    </p>
  </div>
)}
```

---

## 📚 Recursos

- [Documentación Cal.com](https://developer.cal.com/)
- [API Reference](https://developer.cal.com/api)
- [Embed Documentation](https://developer.cal.com/docs/embed)
- [Webhooks Guide](https://developer.cal.com/docs/webhooks)

---

**Última actualización:** Diciembre 2024

