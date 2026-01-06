import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

/**
 * Inserta un nuevo lead en la base de datos
 * @param {Object} leadData - Datos del lead a insertar
 * @param {string} leadData.nombre - Nombre del lead
 * @param {string} leadData.email - Email del lead
 * @param {string} leadData.telefono - Teléfono del lead
 * @param {string} leadData.fecha_cita - Fecha de la cita (YYYY-MM-DD)
 * @param {string} leadData.hora_cita - Hora de la cita (HH:MM)
 * @param {Object} leadData.respuestas - Respuestas del quiz
 * @param {number} leadData.puntuacion - Puntuación total del quiz
 * @returns {Promise<{success: boolean, data: Object|null, error: string|null}>}
 */
export async function insertLead(leadData) {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      data: null,
      error: 'Supabase no está configurado. Por favor, configura las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env'
    }
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          nombre: leadData.nombre,
          email: leadData.email,
          telefono: leadData.telefono,
          fecha_cita: leadData.fecha_cita || null,
          hora_cita: leadData.hora_cita || null,
          respuestas: leadData.respuestas,
          puntuacion: leadData.puntuacion,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting lead:', error)
      return {
        success: false,
        data: null,
        error: error.message
      }
    }

    return {
      success: true,
      data: data[0],
      error: null
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return {
      success: false,
      data: null,
      error: error.message || 'Error inesperado al guardar el lead'
    }
  }
}

/**
 * Obtiene todos los leads ordenados por fecha de creación (más recientes primero)
 * @returns {Promise<{success: boolean, data: Array|null, error: string|null}>}
 */
export async function fetchLeads() {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      data: null,
      error: 'Supabase no está configurado. Por favor, configura las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env'
    }
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('fecha_cita', { ascending: true, nullsFirst: false })
      .order('hora_cita', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching leads:', error)
      
      // Mensaje más descriptivo para errores de RLS
      let errorMessage = error.message
      if (error.code === 'PGRST301' || error.message.includes('permission denied') || error.message.includes('row-level security')) {
        errorMessage = 'No tienes permisos para leer los leads. Verifica la configuración de RLS en Supabase. Para el Dashboard, necesitas usar la Service Role Key o configurar una política de lectura apropiada.'
      }
      
      return {
        success: false,
        data: null,
        error: errorMessage
      }
    }

    return {
      success: true,
      data: data || [],
      error: null
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return {
      success: false,
      data: null,
      error: error.message || 'Error inesperado al obtener los leads'
    }
  }
}

