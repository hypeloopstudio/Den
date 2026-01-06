import { useEffect, useRef } from 'react'

function CalComEmbed({ calLink, onBookingComplete, style = {} }) {
  const containerRef = useRef(null)

  useEffect(() => {
    // Cargar el script de Cal.com si no está cargado
    if (!window.Cal) {
      const script = document.createElement('script')
      script.src = 'https://app.cal.com/embed/embed.js'
      script.async = true
      script.dataset.config = JSON.stringify({
        name: 'Luxe Dental',
        email: '',
        theme: 'dark',
        layout: 'month_view'
      })
      document.body.appendChild(script)

      script.onload = () => {
        if (window.Cal && containerRef.current) {
          window.Cal(containerRef.current, {
            calLink: calLink,
            layout: 'month_view',
            config: {
              theme: 'dark'
            }
          })
        }
      }
    } else if (containerRef.current) {
      // Si ya está cargado, inicializar directamente
      window.Cal(containerRef.current, {
        calLink: calLink,
        layout: 'month_view',
        config: {
          theme: 'dark'
        }
      })
    }

    // Escuchar eventos de Cal.com
    const handleMessage = (e) => {
      if (e.data.origin !== 'https://cal.com' && e.origin !== 'https://cal.com') return
      
      if (e.data.type === 'cal:bookingSuccessful' || e.data.type === 'cal:bookingConfirmed') {
        const booking = e.data.detail || e.data.payload
        
        if (onBookingComplete && booking) {
          onBookingComplete({
            id: booking.id || booking.uid,
            startTime: booking.startTime || booking.start,
            endTime: booking.endTime || booking.end,
            attendee: booking.attendees?.[0] || booking.attendee,
            eventType: booking.eventType || booking.eventSlug
          })
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [calLink, onBookingComplete])

  return (
    <div 
      ref={containerRef}
      className="cal-embed-container w-full"
      style={{ 
        minHeight: '600px',
        ...style 
      }}
    />
  )
}

export default CalComEmbed

