import { useState, useEffect } from 'react'
import { fetchLeads } from '../services/leadsService'

function Dashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    setLoading(true)
    setError(null)
    
    const result = await fetchLeads()
    
    if (result.success) {
      setLeads(result.data)
    } else {
      setError(result.error || 'Error al cargar los leads')
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
        <button
          onClick={loadLeads}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover transition-colors text-black text-sm font-bold rounded-lg"
        >
          <span className="material-symbols-outlined">refresh</span>
          Actualizar
        </button>
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

