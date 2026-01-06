# ⚙️ Configuración de Cal.com

## 🔗 Link de Cal.com Configurado

✅ **Tu link de Cal.com está configurado:** `hypeloop-wtngpm/30min`

**URL completa:** https://cal.com/hypeloop-wtngpm/30min

Este link ya está integrado en el código. Solo necesitas agregar la variable de entorno.

---

## 📝 Variables de Entorno

Agrega esta variable a tu archivo `.env`:

```env
VITE_CALCOM_LINK=hypeloop-wtngpm/30min
```

### Para Vercel (Producción)

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
   - **Name:** `VITE_CALCOM_LINK`
   - **Value:** `hypeloop-wtngpm/30min`
   - **Environment:** Production, Preview, Development

---

## ✅ Verificación

Una vez configurado:

1. **En el Formulario (Quiz):**
   - El paso 3 mostrará el widget de Cal.com
   - Los usuarios podrán seleccionar fecha y hora directamente
   - Al completar la reserva, se guardará automáticamente en Supabase

2. **En el Dashboard:**
   - Verás las pestañas: Todos, Formulario, Cal.com, Calendario
   - La vista "Cal.com" mostrará todas las reservas de Cal.com
   - La vista "Calendario" mostrará el embed completo de Cal.com

---

## 🧪 Probar la Integración

1. Ve a `/quiz` en tu aplicación
2. Completa nombre, email y teléfono
3. En el paso 3, deberías ver el calendario de Cal.com
4. Selecciona una fecha y hora
5. Completa las preguntas del quiz
6. Verifica en Supabase que se guardó con `cal_com_booking_id`

---

## 📊 Estructura de Datos

Cuando un usuario agenda a través de Cal.com, se guarda:

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+1234567890",
  "fecha_cita": "2024-12-25",
  "hora_cita": "14:30",
  "cal_com_booking_id": "abc123...",
  "cal_com_start_time": "2024-12-25T14:30:00Z",
  "cal_com_end_time": "2024-12-25T15:00:00Z"
}
```

---

## 🔧 Troubleshooting

### El widget no aparece
- Verifica que `VITE_CALCOM_LINK` esté configurado
- Verifica que el link sea correcto: `hypeloop-wtngpm/30min` (sin `https://cal.com/`)
- Revisa la consola del navegador por errores

### No se guarda la reserva
- Verifica que hayas ejecutado `add-calcom-fields.sql` en Supabase
- Verifica las políticas RLS en Supabase
- Revisa la consola del navegador

### El Dashboard no muestra reservas de Cal.com
- Necesitas configurar `VITE_CALCOM_API_KEY` para usar la API
- O usa solo el embed widget (no requiere API key)

---

**Link configurado:** `hypeloop-wtngpm/30min`  
**Última actualización:** Diciembre 2024

