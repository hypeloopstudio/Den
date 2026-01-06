// Servicio para interactuar con la API de Cal.com
const CALCOM_API_KEY = import.meta.env.VITE_CALCOM_API_KEY
const CALCOM_BASE_URL = 'https://api.cal.com/v1'

/**
 * Obtener disponibilidad de slots para un evento
 * @param {number} eventTypeId - ID del tipo de evento
 * @param {string} dateFrom - Fecha inicio (YYYY-MM-DD)
 * @param {string} dateTo - Fecha fin (YYYY-MM-DD)
 * @returns {Promise<{success: boolean, data: Object|null, error: string|null}>}
 */
export async function getAvailability(eventTypeId, dateFrom, dateTo) {
  if (!CALCOM_API_KEY) {
    return {
      success: false,
      data: null,
      error: 'Cal.com API Key no configurada. Agrega VITE_CALCOM_API_KEY a tu .env'
    }
  }

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
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return { success: true, data, error: null }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Crear una reserva en Cal.com
 * @param {number} eventTypeId - ID del tipo de evento
 * @param {string} startTime - Fecha y hora de inicio (ISO 8601)
 * @param {string} attendeeEmail - Email del asistente
 * @param {string} attendeeName - Nombre del asistente
 * @returns {Promise<{success: boolean, data: Object|null, error: string|null}>}
 */
export async function createBooking(eventTypeId, startTime, attendeeEmail, attendeeName) {
  if (!CALCOM_API_KEY) {
    return {
      success: false,
      data: null,
      error: 'Cal.com API Key no configurada'
    }
  }

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
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error ${response.status}`)
    }
    
    const data = await response.json()
    return { success: true, data, error: null }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Obtener todas las reservas en un rango de fechas
 * @param {string} startDate - Fecha inicio (YYYY-MM-DD)
 * @param {string} endDate - Fecha fin (YYYY-MM-DD)
 * @returns {Promise<{success: boolean, data: Array|null, error: string|null}>}
 */
export async function getBookings(startDate, endDate) {
  if (!CALCOM_API_KEY) {
    return {
      success: false,
      data: null,
      error: 'Cal.com API Key no configurada'
    }
  }

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
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return { 
      success: true, 
      data: data.bookings || data.data || [], 
      error: null 
    }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Obtener una reserva específica por ID
 * @param {string} bookingId - ID de la reserva
 * @returns {Promise<{success: boolean, data: Object|null, error: string|null}>}
 */
export async function getBooking(bookingId) {
  if (!CALCOM_API_KEY) {
    return {
      success: false,
      data: null,
      error: 'Cal.com API Key no configurada'
    }
  }

  try {
    const response = await fetch(
      `${CALCOM_BASE_URL}/bookings/${bookingId}`,
      {
        headers: {
          'Authorization': `Bearer ${CALCOM_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return { success: true, data, error: null }
  } catch (error) {
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Cancelar una reserva
 * @param {string} bookingId - ID de la reserva
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export async function cancelBooking(bookingId) {
  if (!CALCOM_API_KEY) {
    return {
      success: false,
      error: 'Cal.com API Key no configurada'
    }
  }

  try {
    const response = await fetch(
      `${CALCOM_BASE_URL}/bookings/${bookingId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${CALCOM_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
    
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

