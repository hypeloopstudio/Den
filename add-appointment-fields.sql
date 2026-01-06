-- Script para agregar campos de fecha y hora de cita a la tabla leads
-- Ejecuta este SQL en el SQL Editor de Supabase

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

-- Verificar que las columnas se agregaron correctamente
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'leads'
  AND column_name IN ('fecha_cita', 'hora_cita')
ORDER BY column_name;


