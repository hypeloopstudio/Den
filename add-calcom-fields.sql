-- Script para agregar campos de Cal.com a la tabla leads
-- Ejecuta este SQL en el SQL Editor de Supabase

-- Agregar columnas para Cal.com
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS cal_com_booking_id TEXT,
ADD COLUMN IF NOT EXISTS cal_com_start_time TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cal_com_end_time TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cal_com_event_type_id INTEGER;

-- Índice para búsquedas por booking ID
CREATE INDEX IF NOT EXISTS idx_leads_cal_com_booking_id ON leads(cal_com_booking_id);

-- Verificar que las columnas se agregaron correctamente
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'leads'
  AND column_name LIKE 'cal_com%'
ORDER BY column_name;

