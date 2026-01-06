import { useState } from 'react'

function DatePicker({ value, onChange, minDate, maxDate, disabledDates = [] }) {
  const [isOpen, setIsOpen] = useState(false)

  // Obtener fecha mínima (hoy) y máxima (30 días desde hoy)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const min = minDate || today
  const max = maxDate || (() => {
    const date = new Date(today)
    date.setDate(date.getDate() + 30)
    return date
  })()

  // Formatear fecha para input
  const formatDateForInput = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Verificar si una fecha está deshabilitada
  const isDateDisabled = (date) => {
    const dateStr = formatDateForInput(date)
    return disabledDates.includes(dateStr)
  }

  // Obtener fecha formateada para mostrar
  const getDisplayDate = (dateStr) => {
    if (!dateStr) return 'Seleccionar fecha'
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 rounded-lg bg-black/40 border border-white/10 text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors text-lg text-left flex items-center justify-between"
      >
        <span className={value ? 'text-white' : 'text-text-dim'}>
          {getDisplayDate(value)}
        </span>
        <span className="material-symbols-outlined text-primary">calendar_today</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute z-20 mt-2 bg-surface-dark border border-white/10 rounded-xl p-4 shadow-2xl">
            <input
              type="date"
              value={value || ''}
              onChange={(e) => {
                onChange(e.target.value)
                setIsOpen(false)
              }}
              min={formatDateForInput(min)}
              max={formatDateForInput(max)}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-primary transition-colors"
            />
            <p className="text-text-dim text-xs mt-2">
              Selecciona una fecha entre {min.toLocaleDateString('es-ES')} y {max.toLocaleDateString('es-ES')}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default DatePicker

