-- Script para corregir las políticas RLS
-- Ejecuta este SQL en el SQL Editor de Supabase

-- 1. Asegúrate de que RLS esté habilitado
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 2. Eliminar TODAS las políticas existentes (esto resuelve el error de "already exists")
DROP POLICY IF EXISTS "Permitir inserción pública de leads" ON leads;
DROP POLICY IF EXISTS "Permitir lectura de leads" ON leads;

-- Esperar un momento para que se eliminen completamente
-- (En PostgreSQL esto es instantáneo, pero incluimos esto por claridad)

-- 3. Crear política de INSERT (permite que el público inserte leads)
-- Esta es la política que necesitas para que el formulario funcione
CREATE POLICY "Permitir inserción pública de leads"
ON leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Crear política de SELECT (permite leer leads para el Dashboard)
-- ⚠️ NOTA: Esta política permite que cualquiera lea los leads
-- Para producción, considera usar Service Role Key en un backend
CREATE POLICY "Permitir lectura de leads"
ON leads
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Verificar que las políticas se crearon correctamente
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'leads'
ORDER BY policyname;


