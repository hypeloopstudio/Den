# Configuración de Supabase para HypeLoop Leads

Esta guía te ayudará a configurar Supabase correctamente para la aplicación de captación de leads.

## 1. Crear el Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta o inicia sesión
2. Crea un nuevo proyecto
3. Anota la **URL del proyecto** y la **Anon Key** (las encontrarás en Settings > API)

## 2. Crear la Tabla `leads`

Ejecuta el siguiente SQL en el SQL Editor de Supabase:

```sql
-- Crear la tabla leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  respuestas JSONB,
  puntuacion INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crear índice para búsquedas rápidas por fecha
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Crear índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
```

## 3. Configurar Row Level Security (RLS)

### Política de Inserción (Público puede insertar)

Esta política permite que cualquier usuario anónimo (público) pueda insertar leads usando la Anon Key:

```sql
-- Habilitar RLS en la tabla
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política de INSERT: Permitir que el público inserte leads
CREATE POLICY "Permitir inserción pública de leads"
ON leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```

### Política de Lectura (Solo con Service Role Key)

Para leer los leads, necesitarás usar la **Service Role Key** (que es privada y solo debe usarse en el backend).

**IMPORTANTE:** La Service Role Key bypassa RLS, por lo que puedes leer los datos directamente. Sin embargo, si quieres usar la Anon Key para leer, necesitas crear una política específica:

```sql
-- Política de SELECT: Solo permitir lectura con Service Role Key
-- NOTA: La Service Role Key bypassa RLS automáticamente
-- Si quieres usar Anon Key para leer, descomenta la siguiente política:

-- CREATE POLICY "Permitir lectura con autenticación"
-- ON leads
-- FOR SELECT
-- TO authenticated
-- USING (true);
```

**Recomendación:** Para el Dashboard, usa la Service Role Key en un backend seguro, o crea una política que solo permita lectura a usuarios autenticados específicos.

## 4. Configuración para el Dashboard

### Opción A: Usar Service Role Key en Frontend (Solo Desarrollo)

⚠️ **ADVERTENCIA:** Esta opción solo es segura para desarrollo. NUNCA uses la Service Role Key en producción en el frontend.

1. Obtén tu **Service Role Key** en Supabase (Settings > API)
2. Agrega a tu `.env`:
```env
VITE_SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

3. Modifica `src/lib/supabaseClient.js` para usar la Service Role Key cuando esté disponible:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Opción B: Backend API (Recomendado para Producción)

Si prefieres mantener el Dashboard completamente privado y seguro:

### Opción Segura: Backend API

La forma más segura es crear un endpoint backend que use la Service Role Key:

```javascript
// Ejemplo en Node.js/Express
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Esta es la clave privada
)

// Endpoint protegido
app.get('/api/leads', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  
  res.json({ data, error })
})
```

## 5. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

**Para el Dashboard (si usas Service Role Key en frontend - NO RECOMENDADO para producción):**

```env
VITE_SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

⚠️ **ADVERTENCIA:** Nunca expongas la Service Role Key en el frontend en producción. Úsala solo en un backend seguro.

## 6. Resumen de Políticas RLS

| Acción | Usuario | Política | Resultado |
|--------|---------|----------|-----------|
| INSERT | anon (público) | ✅ Permitido | Cualquiera puede crear leads |
| SELECT | anon (público) | ❌ No permitido | Solo Service Role puede leer |
| SELECT | authenticated | ⚠️ Opcional | Si creas la política |
| SELECT | service_role | ✅ Siempre permitido | Bypassa RLS |

## 7. Verificar la Configuración

1. **Probar inserción:** Usa el formulario de Quiz para crear un lead
2. **Verificar en Supabase:** Ve a Table Editor y confirma que el lead se insertó
3. **Probar lectura:** Intenta acceder al Dashboard (debería funcionar solo con Service Role Key o backend)

## 8. Seguridad Adicional

- ✅ RLS está habilitado
- ✅ Solo inserción pública permitida
- ✅ Lectura restringida (solo Service Role o backend)
- ✅ Índices creados para mejor rendimiento
- ✅ Validación de datos en el frontend

## Notas Importantes

1. **Anon Key:** Segura para usar en el frontend, pero limitada por RLS
2. **Service Role Key:** NUNCA la expongas en el frontend. Úsala solo en:
   - Backend APIs
   - Serverless functions
   - Scripts de administración

3. **Para producción:** Considera crear un backend API que use la Service Role Key para el Dashboard, manteniendo el frontend usando solo la Anon Key para el formulario.

