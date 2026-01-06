import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import DatePicker from '../components/DatePicker'
import TimePicker from '../components/TimePicker'
import { insertLead } from '../services/leadsService'

function Quiz() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha_cita: '',
    hora_cita: '',
    respuestas: {}
  })

  const [puntuacion, setPuntuacion] = useState(0)

  // Total de pasos: 5 datos (nombre, email, teléfono, fecha, hora) + 5 preguntas = 10 pasos
  const PERSONAL_DATA_STEPS = 5

  const questions = [
    {
      id: 1,
      question: '¿Qué tan satisfecho estás con tu sonrisa actual?',
      options: [
        { text: 'Muy insatisfecho', value: 1 },
        { text: 'Insatisfecho', value: 2 },
        { text: 'Neutral', value: 3 },
        { text: 'Satisfecho', value: 4 },
        { text: 'Muy satisfecho', value: 5 }
      ]
    },
    {
      id: 2,
      question: '¿Has considerado algún tratamiento dental estético?',
      options: [
        { text: 'Nunca', value: 1 },
        { text: 'Raramente', value: 2 },
        { text: 'A veces', value: 3 },
        { text: 'Frecuentemente', value: 4 },
        { text: 'Siempre', value: 5 }
      ]
    },
    {
      id: 3,
      question: '¿Qué tan importante es para ti tener una sonrisa perfecta?',
      options: [
        { text: 'Nada importante', value: 1 },
        { text: 'Poco importante', value: 2 },
        { text: 'Moderadamente importante', value: 3 },
        { text: 'Muy importante', value: 4 },
        { text: 'Extremadamente importante', value: 5 }
      ]
    },
    {
      id: 4,
      question: '¿Estarías dispuesto a invertir en un tratamiento dental premium?',
      options: [
        { text: 'Definitivamente no', value: 1 },
        { text: 'Probablemente no', value: 2 },
        { text: 'Tal vez', value: 3 },
        { text: 'Probablemente sí', value: 4 },
        { text: 'Definitivamente sí', value: 5 }
      ]
    },
    {
      id: 5,
      question: '¿Qué tan probable es que recomiendes nuestros servicios?',
      options: [
        { text: 'Muy improbable', value: 1 },
        { text: 'Improbable', value: 2 },
        { text: 'Neutral', value: 3 },
        { text: 'Probable', value: 4 },
        { text: 'Muy probable', value: 5 }
      ]
    }
  ]

  const TOTAL_STEPS = PERSONAL_DATA_STEPS + questions.length

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = () => {
    // Validar datos personales antes de continuar
    if (currentStep === 0 && !formData.nombre.trim()) {
      setError('Por favor ingresa tu nombre')
      return
    }
    if (currentStep === 1 && !formData.email.trim()) {
      setError('Por favor ingresa tu email')
      return
    }
    if (currentStep === 2 && !formData.telefono.trim()) {
      setError('Por favor ingresa tu teléfono')
      return
    }
    if (currentStep === 3 && !formData.fecha_cita) {
      setError('Por favor selecciona una fecha para tu cita')
      return
    }
    if (currentStep === 4 && !formData.hora_cita) {
      setError('Por favor selecciona una hora para tu cita')
      return
    }
    
    setError(null)
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleAnswer = (questionId, value) => {
    const newRespuestas = {
      ...formData.respuestas,
      [questionId]: value
    }
    setFormData({ ...formData, respuestas: newRespuestas })
    
    const newPuntuacion = Object.values(newRespuestas).reduce((sum, val) => sum + val, 0)
    setPuntuacion(newPuntuacion)

    // Avanzar automáticamente a la siguiente pregunta
    if (currentStep < TOTAL_STEPS - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300)
    } else {
      // Si es la última pregunta, enviar automáticamente
      handleSubmit()
    }
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.nombre || !formData.email || !formData.telefono) {
      setError('Por favor completa todos los campos')
      setLoading(false)
      return
    }

    if (Object.keys(formData.respuestas).length !== questions.length) {
      setError('Por favor responde todas las preguntas')
      setLoading(false)
      return
    }

    const result = await insertLead({
      ...formData,
      puntuacion
    })

    setLoading(false)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } else {
      setError(result.error || 'Error al enviar el formulario. Por favor intenta de nuevo.')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background-dark">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <div className="max-w-md w-full bg-surface-dark border border-primary/30 rounded-2xl p-10 text-center">
            <div className="size-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '48px' }}>check_circle</span>
            </div>
            <h2 className="text-white text-3xl font-bold mb-4">¡Gracias por tu interés!</h2>
            <p className="text-text-dim text-lg mb-6">
              Hemos recibido tu información correctamente. Nos pondremos en contacto contigo pronto.
            </p>
            <p className="text-text-dim text-sm">Redirigiendo a la página principal...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      <div className="py-20 px-6 md:px-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-white text-4xl md:text-5xl font-black mb-4">
              Evaluación <span className="text-primary">Gratuita</span>
            </h1>
            <p className="text-text-dim text-lg">
              Responde estas preguntas para recibir un plan de tratamiento personalizado
            </p>
          </div>

          <div className="bg-surface-dark border border-white/10 rounded-2xl p-8 md:p-12">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-dim text-sm">
                  Paso {currentStep + 1} de {TOTAL_STEPS}
                </span>
                {currentStep >= PERSONAL_DATA_STEPS && (
                  <span className="text-primary text-sm font-bold">
                    Puntuación: {puntuacion}/{questions.length * 5}
                  </span>
                )}
              </div>
              <div className="w-full bg-black/40 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
                ></div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
                {error}
              </div>
            )}

            {/* Datos Personales */}
            {currentStep < PERSONAL_DATA_STEPS ? (
              <div className="space-y-6">
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">
                  {currentStep === 0 && '¿Cuál es tu nombre?'}
                  {currentStep === 1 && '¿Cuál es tu email?'}
                  {currentStep === 2 && '¿Cuál es tu teléfono?'}
                  {currentStep === 3 && '¿Qué fecha prefieres para tu cita?'}
                  {currentStep === 4 && '¿A qué hora prefieres tu cita?'}
                </h2>
                
                {currentStep === 0 && (
                  <div>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                      required
                      className="w-full px-4 py-4 rounded-lg bg-black/40 border border-white/10 text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors text-lg"
                      placeholder="Ingresa tu nombre completo"
                      autoFocus
                    />
                  </div>
                )}

                {currentStep === 1 && (
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                      required
                      className="w-full px-4 py-4 rounded-lg bg-black/40 border border-white/10 text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors text-lg"
                      placeholder="tu@email.com"
                      autoFocus
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                      required
                      className="w-full px-4 py-4 rounded-lg bg-black/40 border border-white/10 text-white placeholder-text-dim focus:outline-none focus:border-primary transition-colors text-lg"
                      placeholder="+1 234 567 8900"
                      autoFocus
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <DatePicker
                      value={formData.fecha_cita}
                      onChange={(date) => {
                        setFormData({ ...formData, fecha_cita: date })
                        setError(null)
                      }}
                    />
                    <p className="text-text-dim text-sm mt-3">
                      Selecciona una fecha disponible para tu consulta
                    </p>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <TimePicker
                      value={formData.hora_cita}
                      onChange={(time) => {
                        setFormData({ ...formData, hora_cita: time })
                        setError(null)
                      }}
                    />
                    <p className="text-text-dim text-sm mt-3">
                      Horarios disponibles de 9:00 AM a 6:00 PM
                    </p>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary-hover transition-all hover:scale-105 text-black text-lg font-extrabold rounded-lg shadow-[0_4px_20px_rgba(255,215,0,0.4)]"
                >
                  Continuar
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            ) : (
              /* Questions */
              currentStep < TOTAL_STEPS ? (
              (() => {
                const questionIndex = currentStep - PERSONAL_DATA_STEPS
                const currentQuestion = questions[questionIndex]
                return (
                  <div className="mb-8">
                    <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">
                      {currentQuestion.question}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(currentQuestion.id, option.value)}
                          className={`p-6 rounded-xl border-2 transition-all text-left ${
                            formData.respuestas[currentQuestion.id] === option.value
                              ? 'border-primary bg-primary/10 text-white'
                              : 'border-white/10 bg-black/40 text-text-dim hover:border-primary/50 hover:bg-black/60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option.text}</span>
                            {formData.respuestas[currentQuestion.id] === option.value && (
                              <span className="material-symbols-outlined text-primary">check_circle</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })()
            ) : (
              /* Enviando... */
              <div className="text-center py-8">
                <div className="flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined animate-spin text-primary" style={{ fontSize: '48px' }}>refresh</span>
                  <span className="text-white text-xl">Enviando tu evaluación...</span>
                </div>
              </div>
            ))}

            {/* Navigation */}
            {currentStep > 0 && currentStep < TOTAL_STEPS && !loading && (
              <button
                onClick={() => {
                  setError(null)
                  setCurrentStep(currentStep - 1)
                }}
                className="mt-6 flex items-center gap-2 text-text-dim hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Anterior
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz

