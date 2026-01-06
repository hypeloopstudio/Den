# 🔗 Guía para Conectar la Página con Supabase

## Paso 1: Obtener las Credenciales de Supabase

1. **Ve a tu proyecto en Supabase:**
   - Abre [https://app.supabase.com](https://app.supabase.com)
   - Selecciona tu proyecto

2. **Navega a Settings → API:**
   - En el menú lateral, haz clic en **Settings** (⚙️)
   - Luego haz clic en **API**

3. **Copia las siguientes credenciales:**
   - **Project URL** (URL del proyecto)
   - **anon public** key (Clave pública anónima)

## Paso 2: Configurar el Archivo .env

1. **Abre el archivo `.env`** en la raíz del proyecto

2. **Reemplaza los valores** con tus credenciales reales:

```env
VITE_SUPABASE_URL=https://zdcxktkbjxrtrysnpmen.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkY3hrdGtianhydHJ5c25wbWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MjMwNTEsImV4cCI6MjA4MzI5OTA1MX0.aq5XHTQ_P9ymX4cf4Y_YAMrqUXXHgqxNvj89h9Jeilc
```

### Ejemplo:

Si tu Project URL es: `https://abcdefghijklmnop.supabase.co`
Y tu anon key es: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDU2Nzg5MCwiZXhwIjoxOTUwMTQzODkwfQ.abcdefghijklmnopqrstuvwxyz1234567890`

Tu archivo `.env` debería verse así:

```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDU2Nzg5MCwiZXhwIjoxOTUwMTQzODkwfQ.abcdefghijklmnopqrstuvwxyz1234567890
```

## Paso 3: Verificar la Estructura de la Tabla

Asegúrate de que tu tabla `leads` tenga la siguiente estructura:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  respuestas JSONB,
  puntuacion INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

## Paso 4: Verificar las Políticas RLS

Asegúrate de tener estas políticas configuradas:

### Política de INSERT (Permitir inserción pública):
```sql
CREATE POLICY "Permitir inserción pública de leads"
ON leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
```

### Para el Dashboard (si quieres leer desde el frontend):
```sql
-- Opción 1: Permitir lectura con Service Role Key (recomendado para producción)
-- No necesitas crear esta política, la Service Role Key bypassa RLS

-- Opción 2: Permitir lectura con Anon Key (solo para desarrollo)
CREATE POLICY "Permitir lectura de leads"
ON leads
FOR SELECT
TO anon, authenticated
USING (true);
```

⚠️ **Nota de Seguridad:** La Opción 2 permite que cualquiera lea los leads. Para producción, es mejor usar un backend con Service Role Key.

## Paso 5: Reiniciar el Servidor

Después de configurar el `.env`, **debes reiniciar el servidor de desarrollo**:

1. Detén el servidor actual (Ctrl + C en la terminal)
2. Inicia el servidor nuevamente:
```bash
npm run dev
```

## Paso 6: Probar la Conexión

1. **Abre la aplicación** en tu navegador (normalmente `http://localhost:5173`)

2. **Prueba el formulario:**
   - Ve a `/quiz` o haz clic en "Reserva Cita"
   - Completa el quiz
   - Envía el formulario
   - Deberías ver un mensaje de éxito

3. **Verifica en Supabase:**
   - Ve a tu proyecto en Supabase
   - Navega a **Table Editor** → **leads**
   - Deberías ver el nuevo lead que acabas de crear

## Paso 7: Verificar el Dashboard

1. **Accede al Dashboard:**
   - Ve a `/dashboard` en tu navegador
   - Deberías ver todos los leads ordenados por fecha

2. **Si ves un error de permisos:**
   - Verifica que hayas creado la política de SELECT (Paso 4, Opción 2)
   - O configura un backend con Service Role Key

## 🔍 Solución de Problemas

### Error: "Supabase no está configurado"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Verifica que las variables empiezan con `VITE_`
- Reinicia el servidor después de crear/modificar el `.env`

### Error: "permission denied" o "row-level security"
- Verifica que RLS esté habilitado: `ALTER TABLE leads ENABLE ROW LEVEL SECURITY;`
- Verifica que la política de INSERT esté creada
- Para el Dashboard, crea la política de SELECT o usa Service Role Key

### Error: "relation 'leads' does not exist"
- Verifica que la tabla se llame exactamente `leads`
- Verifica que estás en el proyecto correcto de Supabase

### La página carga pero no se guardan los datos
- Abre la consola del navegador (F12)
- Busca errores en la pestaña "Console"
- Verifica que las credenciales en `.env` sean correctas
- Verifica que la política de INSERT esté activa

## ✅ Checklist de Verificación

- [ ] Archivo `.env` creado con las credenciales correctas
- [ ] Tabla `leads` creada con la estructura correcta
- [ ] Política RLS de INSERT configurada
- [ ] Política RLS de SELECT configurada (si usas Dashboard en frontend)
- [ ] Servidor de desarrollo reiniciado
- [ ] Formulario de quiz funciona y guarda datos
- [ ] Dashboard muestra los leads (si aplica)

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa la consola del navegador (F12 → Console)
2. Revisa los logs del servidor de desarrollo
3. Verifica las políticas RLS en Supabase (Authentication → Policies)
4. Consulta la documentación de Supabase: https://supabase.com/docs

