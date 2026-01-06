import { useState, useEffect } from 'react'
import { fetchLeads } from '../services/leadsService'
import { getBookings } from '../services/calcomService'
import CalComEmbed from '../components/CalComEmbed'

function Dashboard() {
  const [leads, setLeads] = useState([])
  const [calComBookings, setCalComBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [view, setView] = useState('combined') // 'combined', 'leads', 'calcom', 'calendar'
  
  const CALCOM_LINK = import.meta.env.VITE_CALCOM_LINK || ''
  const USE_CALCOM = CALCOM_LINK !== ''

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    setLoading(true)
    setError(null)
    
    // Cargar leads de Supabase
    const result = await fetchLeads()
    
    if (result.success) {
      setLeads(result.data)
    } else {
      setError(result.error || 'Error al cargar los leads')
    }

    // Cargar reservas de Cal.com si está configurado
    if (USE_CALCOM) {
      const startDate = new Date().toISOString().split('T')[0]
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 1)
      const endDateStr = endDate.toISOString().split('T')[0]

      const bookingsResult = await getBookings(startDate, endDateStr)
      if (bookingsResult.success) {
        setCalComBookings(bookingsResult.data || [])
      }
    }
    
    setLoading(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const formatAppointmentDate = (dateString) => {
    if (!dateString) return 'No agendada'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const formatTime = (timeString) => {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/90 backdrop-blur-md px-6 md:px-10 py-4 shadow-lg">
        <div className="flex items-center gap-4 text-white">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px' }}>dashboard</span>
          <h1 className="text-white text-xl font-bold tracking-wide">Dashboard - HypeLoop Leads</h1>
        </div>
        <div className="flex items-center gap-4">
          {USE_CALCOM && (
            <div className="flex gap-2 bg-surface-dark rounded-lg p-1">
              <button
                onClick={() => setView('combined')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'combined' 
                    ? 'bg-primary text-black' 
                    : 'text-text-dim hover:text-white'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setView('leads')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'leads' 
                    ? 'bg-primary text-black' 
                    : 'text-text-dim hover:text-white'
                }`}
              >
                Formulario
              </button>
              <button
                onClick={() => setView('calcom')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'calcom' 
                    ? 'bg-primary text-black' 
                    : 'text-text-dim hover:text-white'
                }`}
              >
                Cal.com
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'calendar' 
                    ? 'bg-primary text-black' 
                    : 'text-text-dim hover:text-white'
                }`}
              >
                Calendario
              </button>
            </div>
          )}
          <button
            onClick={loadLeads}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover transition-colors text-black text-sm font-bold rounded-lg"
          >
            <span className="material-symbols-outlined">refresh</span>
            Actualizar
          </button>
        </div>
      </div>

      <div className="py-10 px-6 md:px-40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-2">Leads Capturados</h2>
            <p className="text-text-dim">
              Total: <span className="text-primary font-bold">{leads.length}</span> leads
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <span className="material-symbols-outlined text-primary animate-spin" style={{ fontSize: '48px' }}>refresh</span>
                <p className="text-text-dim mt-4">Cargando leads...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 text-red-300">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined">error</span>
                <h3 className="font-bold">Error al cargar los leads</h3>
              </div>
              <p>{error}</p>
              <button
                onClick={loadLeads}
                className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          ) : view === 'calendar' && USE_CALCOM ? (
            <div className="bg-surface-dark border border-white/10 rounded-xl p-6">
              <h3 className="text-white text-xl font-bold mb-4">Calendario Cal.com</h3>
              <div style={{ minHeight: '700px' }}>
                <CalComEmbed calLink={CALCOM_LINK} />
              </div>
            </div>
          ) : view === 'calcom' && USE_CALCOM ? (
            <div className="bg-surface-dark border border-white/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-white text-xl font-bold">Reservas de Cal.com</h3>
                <p className="text-text-dim text-sm mt-1">
                  {calComBookings.length} reserva(s) encontrada(s)
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/40 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Fecha y Hora</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {calComBookings.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-text-dim">
                          No hay reservas de Cal.com
                        </td>
                      </tr>
                    ) : (
                      calComBookings.map((booking, index) => (
                        <tr key={booking.id || index} className="hover:bg-black/20 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className="text-primary font-bold text-sm">
                                {formatAppointmentDate(booking.startTime || booking.start)}
                              </span>
                              <span className="text-text-dim text-xs">
                                {formatTime(new Date(booking.startTime || booking.start).toTimeString().split(' ')[0].slice(0, 5))}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-white font-medium">
                            {booking.attendees?.[0]?.name || booking.attendee?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-text-dim">
                            {booking.attendees?.[0]?.email || booking.attendee?.email || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 font-medium text-xs">
                              {booking.status || 'Confirmada'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : leads.length === 0 ? (
            <div className="bg-surface-dark border border-white/10 rounded-xl p-12 text-center">
              <span className="material-symbols-outlined text-text-dim" style={{ fontSize: '64px' }}>inbox</span>
              <p className="text-text-dim text-lg mt-4">No hay leads registrados aún</p>
            </div>
          ) : (
            <div className="bg-surface-dark border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/40 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Cita Agendada</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Teléfono</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Puntuación</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Registrado</th>
                      <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">Respuestas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((lead, index) => (
                      <tr key={lead.id || index} className="hover:bg-black/20 transition-colors">
                        <td className="px-6 py-4">
                          {lead.fecha_cita ? (
                            <div className="flex flex-col gap-1">
                              <span className="text-primary font-bold text-sm">
                                {formatAppointmentDate(lead.fecha_cita)}
                              </span>
                              {lead.hora_cita && (
                                <span className="text-text-dim text-xs">
                                  {formatTime(lead.hora_cita)}
                                </span>
                              )}
                              {lead.cal_com_booking_id && (
                                <span className="text-xs text-primary/70 flex items-center gap-1">
                                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>calendar_month</span>
                                  Cal.com
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-text-dim text-sm italic">No agendada</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          {lead.nombre || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-text-dim">
                          {lead.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-text-dim">
                          {lead.telefono || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary font-bold">
                            {lead.puntuacion || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-text-dim text-sm whitespace-nowrap">
                          {formatDate(lead.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <details className="cursor-pointer">
                            <summary className="text-primary hover:text-primary-hover text-sm font-medium">
                              Ver respuestas
                            </summary>
                            <div className="mt-2 p-3 bg-black/40 rounded-lg text-text-dim text-xs">
                              {lead.respuestas && typeof lead.respuestas === 'object' ? (
                                <ul className="space-y-1">
                                  {Object.entries(lead.respuestas).map(([key, value]) => (
                                    <li key={key}>
                                      Pregunta {key}: <span className="text-primary">{value}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p>No hay respuestas disponibles</p>
                              )}
                            </div>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

