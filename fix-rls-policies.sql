-- Script para configurar las políticas RLS necesarias
-- Ejecuta este SQL en el SQL Editor de Supabase

-- 1. Asegúrate de que RLS esté habilitado
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 2. Eliminar políticas existentes si las hay (IMPORTANTE: hacer esto primero)
DROP POLICY IF EXISTS "Permitir inserción pública de leads" ON leads;
DROP POLICY IF EXISTS "Permitir lectura de leads" ON leads;
DROP POLICY IF EXISTS "Permitir inserción pública de leads" ON public.leads;
DROP POLICY IF EXISTS "Permitir lectura de leads" ON public.leads;

-- 3. Crear política de INSERT (permite que el público inserte leads)
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

-- Verificar que las políticas se crearon correctamente
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'leads';

