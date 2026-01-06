import { useState } from 'react'

function TimePicker({ value, onChange, disabledTimes = [] }) {
  const [isOpen, setIsOpen] = useState(false)

  // Generar horas disponibles (9:00 AM a 6:00 PM, cada 30 minutos)
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        slots.push(timeStr)
      }
    }
    return slots.filter(slot => !disabledTimes.includes(slot))
  }

  const timeSlots = generateTimeSlots()

  // Formatear hora para mostrar
  const formatTime = (timeStr) => {
    if (!timeStr) return 'Seleccionar hora'
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 rounded-lg bg-black/40 border border-white/10 text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors text-lg text-left flex items-center justify-between"
      >
        <span className={value ? 'text-white' : 'text-text-dim'}>
          {formatTime(value)}
        </span>
        <span className="material-symbols-outlined text-primary">schedule</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute z-20 mt-2 bg-surface-dark border border-white/10 rounded-xl p-4 shadow-2xl max-h-64 overflow-y-auto w-full">
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => {
                    onChange(time)
                    setIsOpen(false)
                  }}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    value === time
                      ? 'border-primary bg-primary/10 text-white'
                      : 'border-white/10 bg-black/40 text-text-dim hover:border-primary/50 hover:bg-black/60'
                  }`}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TimePicker

