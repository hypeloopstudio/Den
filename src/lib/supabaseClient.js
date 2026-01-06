import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Crear cliente con valores por defecto si no están configurados
// Esto permite que la app cargue incluso sin las variables de entorno
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Función helper para verificar si Supabase está configurado
export const isSupabaseConfigured = () => {
  return supabase !== null && !!supabaseUrl && !!supabaseAnonKey
}

