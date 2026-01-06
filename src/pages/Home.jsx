import { Link } from 'react-router-dom'
import Header from '../components/Header'

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/30 z-10"></div>
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat min-h-[700px]" 
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCp-auYbrigtY-aj2LFAKdpy83DTVcIta_TMYD5WbhnLTVdepCKONYu3wp2sOKdfwGq0C2u7ihcV5Jr9f9MTIyeP5Mc4p8zmqNWTEuJ4YS1ApBXZQdwhI6TbKI9XsIKMkFzhiM77-Ig2Jt7ZDlRI9xUZzMoKHUsNxD4CSaAqYlrnw_4xQpQub2kgUpZtRi9u80SUCJ7OChgDTiFVvWEWTK8DMzFoZymPW9NjGhyccss1GSBRGNpmPccyYET7Tbqdo1nihNl9kiyW-4')`
            }}
          ></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center min-h-[700px] px-6 md:px-40 py-20">
          <div className="flex flex-col gap-8 max-w-[700px]">
            <div className="flex flex-col gap-6">
              <h1 className="text-white text-4xl md:text-7xl font-black leading-[1.05] tracking-tight">
                Recupera la confianza de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">sonreír sin complejos</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl font-normal leading-relaxed max-w-[550px]">
                Especialistas en implantes y estética dental con tecnología sin dolor. Únete a más de 200 pacientes que han transformado su vida.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 mt-4">
              <Link 
                to="/quiz" 
                className="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary hover:bg-primary-hover transition-all hover:scale-105 text-black text-base font-extrabold leading-normal tracking-wide shadow-[0_4px_20px_rgba(255,215,0,0.4)]"
              >
                Reserva tu evaluación gratuita
              </Link>
              <button className="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-colors text-white text-base font-semibold backdrop-blur-sm">
                Ver casos de éxito
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-8 mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-col gap-2">
                <div className="flex gap-1 text-primary">
                  <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="text-sm text-gray-400 font-medium tracking-wide">4.9 en Google (+200 reseñas)</p>
              </div>
              <div className="h-10 w-[1px] bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col gap-2 opacity-80">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Aceptamos seguros:</p>
                <div className="flex gap-4">
                  <div className="h-6 w-12 rounded bg-white/20 hover:bg-white/30 transition-colors"></div>
                  <div className="h-6 w-12 rounded bg-white/20 hover:bg-white/30 transition-colors"></div>
                  <div className="h-6 w-12 rounded bg-white/20 hover:bg-white/30 transition-colors"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beneficios Section */}
      <section className="py-24 px-6 md:px-40 bg-background-dark relative border-b border-white/5" id="beneficios">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-6">Lo que ganas con nosotros</h2>
            <p className="text-text-dim max-w-2xl text-lg leading-relaxed">Más que dientes, diseñamos experiencias. Descubre por qué somos la clínica preferida para quienes buscan excelencia.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-surface-dark p-10 hover:border-primary/50 transition-colors group shadow-2xl shadow-black">
              <div className="size-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300 shadow-inner">
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>sentiment_satisfied</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-white text-2xl font-bold group-hover:text-primary transition-colors">Estética Invisible</h3>
                <p className="text-text-dim text-base leading-relaxed">
                  Dientes alineados de forma invisible y cómoda, sin los molestos brackets metálicos tradicionales.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-surface-dark p-10 hover:border-primary/50 transition-colors group shadow-2xl shadow-black">
              <div className="size-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300 shadow-inner">
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>diamond</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-white text-2xl font-bold group-hover:text-primary transition-colors">Funcionalidad Natural</h3>
                <p className="text-text-dim text-base leading-relaxed">
                  Implantes de alta gama fabricados con zirconio que se sienten y funcionan exactamente como tus dientes originales.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-surface-dark p-10 hover:border-primary/50 transition-colors group shadow-2xl shadow-black">
              <div className="size-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300 shadow-inner">
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>spa</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-white text-2xl font-bold group-hover:text-primary transition-colors">Cero Dolor</h3>
                <p className="text-text-dim text-base leading-relaxed">
                  Tecnología de sedación consciente y láser dental para que tu visita sea una experiencia relajante y segura.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctores Section */}
      <section className="py-24 px-6 md:px-40 bg-surface-dark" id="doctores">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="flex-1 relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-square border border-white/10 shadow-2xl">
              <div 
                className="h-full w-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" 
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTza4EIkApeSNz6xvjVJ3D7cj_VxoF4vl3pnHiWanHMO3t_RrqBX8FNPg1NauAfg-kkwvxo0McBxqKKLjJLrXZm5igFQN5D58RU8Eu9HweFhr4--czWnpIm0i7-N-eOGVi6nNTUv2gZP-ykwf01LrUmO65O9lXKmjypiOCYocSYMH_0KNrZxQ1Hr4sgiHUs83y0XY5CX8_o7V40zVhfuwiF3Kv_U-Vj-bu_xlOjfGxu8KF4oRRRZLwSq-ONHsniiCn91jcDRtKzeo')`
                }}
              ></div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-8 order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-black/50 w-fit backdrop-blur-md">
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Expertos Certificados</span>
            </div>
            <h2 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
              Liderados por el <br/><span className="text-primary">Dr. Andrés Velasco</span>
            </h2>
            <p className="text-text-dim text-lg leading-relaxed border-l-2 border-primary pl-6">
              "Mi misión no es solo arreglar dientes, es devolverle a las personas la seguridad para expresarse al mundo. Con más de 15 años de experiencia y especialización en estética dental avanzada, mi equipo y yo garantizamos resultados que superan expectativas."
            </p>
            <div className="grid grid-cols-2 gap-10 mt-2">
              <div>
                <p className="text-4xl font-black text-white mb-2">15+</p>
                <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">Años de experiencia</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-2">2.5k+</p>
                <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">Sonrisas diseñadas</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="flex items-center gap-3 text-primary font-bold hover:text-white transition-colors group">
                <span className="border-b border-primary group-hover:border-white transition-colors">Conoce a todo el equipo</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Section */}
      <section className="py-24 px-6 md:px-40 bg-background-dark border-t border-white/5" id="resultados">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-4">Transformaciones Reales</h2>
              <p className="text-text-dim text-lg">Cada sonrisa cuenta una historia. Desliza para ver el cambio.</p>
            </div>
            <button className="hidden md:flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 border border-white/20 text-white hover:bg-white/5 hover:border-primary transition-all font-medium">
              Ver galería completa
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="group relative rounded-xl overflow-hidden border border-white/10 bg-surface-dark hover:border-primary/30 transition-colors shadow-lg">
              <div className="aspect-[4/3] relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7iGwD1GHdPUSsxDVBmeNUhheOwz_wsPdeIu0idvyIkgswe0mtiQ_Lf9TXnW9PG6gTVVM_bShRBehQty3Lea6FLcKcCczWujYJuu2swWbV38i4eUZXp0_YdTDGOcFLajrrDMYy0QK38p0SzSvHVz8zxNUrTRYkoJSpkpczhOeE0qRN51ar-HfM_K4mR2KWAfsa3WN8xlFVzRtcJiN1W93eiwQAyMCf1fbXutmzgnw7AUJASRTz8UIefAdGqvnln9Q1wkK1MFfCMzU')`
                  }}
                >
                  <div className="absolute top-4 right-4 bg-primary text-black text-xs font-black tracking-wider px-3 py-1.5 rounded">DESPUÉS</div>
                </div>
                <div 
                  className="absolute inset-0 w-[50%] overflow-hidden border-r-2 border-white bg-cover bg-center" 
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEkI3lRNfD039Kuj4bI1QZNpftWMtLbBX91PFuWnDTXUqfxdFyqnDAp3qmfJZA5XidypOoz1AOSOuPa2fkiRk_VoE5LzDna-YvoKvF2NqRL4oG_F5-UHKm0qkP33CD8D05YYGCtwV0zwbxAdY7tJAFL3o4rx0MnbycFYhU_ypzcvyQ-SvI4oImy_8lMbjpfcXYKPabJ-Agpr2D_elyklBnF65v5rt2tLHj06YUnqPCzZWq6jtw_3cyWF1e58m2ijoEaLylMI6GldM')`
                  }}
                >
                  <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-black tracking-wider px-3 py-1.5 rounded backdrop-blur-md">ANTES</div>
                </div>
                <div className="absolute inset-y-0 left-[50%] -ml-4 flex items-center justify-center w-8 cursor-col-resize">
                  <div className="size-10 rounded-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center border-4 border-black/10">
                    <span className="material-symbols-outlined text-black" style={{ fontSize: '20px' }}>code</span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-white text-xl font-bold mb-2">Diseño de Sonrisa Cerámico</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-dim">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-primary text-base">check_circle</span> Carillas de porcelana</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-primary text-base">schedule</span> 2 semanas</span>
                </div>
              </div>
            </div>
            <div className="group relative rounded-xl overflow-hidden border border-white/10 bg-surface-dark hover:border-primary/30 transition-colors shadow-lg">
              <div className="aspect-[4/3] relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3U1z_Hu2x6JqEDAT7F0k2WtyS2_R5WdXomYPzgXJA1dexHx02OXH1l2k9rY17hxPiYLcZf3amWaeqEkhQ90MjRSGOyuQr6e2csLTPs0pBjM9KVJ1E5UzOUnpMOTY1JfnEn2Cgvbu6MHH44T9Zv7apN2OZHB7biyF0CnhHWQlBD1Ce34hNAkHMPxUDcxEpB20RjKFY14hgUDH5Ow0PCfrM9_u-z21b2Xb16X_sKkobdhwkzh8YemIQRA4qL2KL7WUngSwTJX_nj6I')`
                  }}
                >
                  <div className="absolute top-4 right-4 bg-primary text-black text-xs font-black tracking-wider px-3 py-1.5 rounded">DESPUÉS</div>
                </div>
                <div 
                  className="absolute inset-0 w-[50%] overflow-hidden border-r-2 border-white bg-cover bg-center" 
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIFg3DncvYooYVOpeU8UQXXmnVMYX_uy3tY5A7Bc07f-MiJ-RvIISSJxNPnJLR4YpGxYhF18T14BpUAgQXFY-d9c9ZLR0oMQfeY3iGKV7ENWBazIB6oHSafiBjH3crpua57lnqV8O5b46A6y-P9LOwinnXMNk0mGmJmAsZJGiud-ZIQq0tXPdfEMazDvXammaVc0dCwNyGvskvEqXlgX9tRannflSKS7FK3azqZNAkiSrG-5ELhkSpjcyb13fKuP62aqzQkDeK_F0')`
                  }}
                >
                  <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-black tracking-wider px-3 py-1.5 rounded backdrop-blur-md">ANTES</div>
                </div>
                <div className="absolute inset-y-0 left-[50%] -ml-4 flex items-center justify-center w-8 cursor-col-resize">
                  <div className="size-10 rounded-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center border-4 border-black/10">
                    <span className="material-symbols-outlined text-black" style={{ fontSize: '20px' }}>code</span>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-white text-xl font-bold mb-2">Rehabilitación Oral Completa</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-text-dim">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-primary text-base">check_circle</span> Implantes dentales</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-primary text-base">schedule</span> 3 meses</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 md:hidden flex justify-center">
            <button className="min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 border border-white/20 text-white hover:bg-surface-dark transition-colors w-full font-medium">
              Ver galería completa
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-40 bg-surface-dark" id="faq">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-16 text-center">Preguntas Frecuentes</h2>
          <div className="flex flex-col gap-6">
            <details className="group bg-black/40 border border-white/10 rounded-xl open:border-primary/50 open:ring-1 open:ring-primary/20 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-semibold text-lg hover:text-primary transition-colors">
                ¿El tratamiento de implantes es doloroso?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4 mt-2">
                En absoluto. Utilizamos técnicas de sedación consciente y anestesia local de última generación. La mayoría de nuestros pacientes reportan molestias mínimas o inexistentes durante y después del procedimiento.
              </div>
            </details>
            <details className="group bg-black/40 border border-white/10 rounded-xl open:border-primary/50 open:ring-1 open:ring-primary/20 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-semibold text-lg hover:text-primary transition-colors">
                ¿Ofrecen facilidades de pago?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4 mt-2">
                Sí, entendemos que es una inversión importante. Ofrecemos financiamiento directo hasta en 12 cuotas sin intereses con tarjetas de crédito seleccionadas y planes personalizados según el tratamiento.
              </div>
            </details>
            <details className="group bg-black/40 border border-white/10 rounded-xl open:border-primary/50 open:ring-1 open:ring-primary/20 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-semibold text-lg hover:text-primary transition-colors">
                ¿Cuánto tiempo duran las carillas de porcelana?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4 mt-2">
                Con el cuidado adecuado y las revisiones periódicas, nuestras carillas de alta calidad pueden durar entre 15 y 20 años manteniendo su color y brillo original.
              </div>
            </details>
            <details className="group bg-black/40 border border-white/10 rounded-xl open:border-primary/50 open:ring-1 open:ring-primary/20 transition-all duration-300">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-semibold text-lg hover:text-primary transition-colors">
                ¿Dónde está ubicada la clínica y tienen estacionamiento?
                <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4 mt-2">
                Estamos ubicados en la Torre Médica Central, Piso 5. Contamos con estacionamiento privado gratuito para todos nuestros pacientes durante su consulta.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6 md:px-40">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-10">
          <div className="flex flex-col gap-6 max-w-2xl">
            <h2 className="text-white text-4xl font-bold tracking-tight">¿Listo para cambiar tu sonrisa?</h2>
            <p className="text-text-dim text-lg">Agenda hoy tu evaluación gratuita y recibe un plan de tratamiento personalizado sin compromiso.</p>
            <Link 
              to="/quiz" 
              className="mx-auto flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-10 bg-primary hover:bg-primary-hover transition-all hover:scale-105 text-black text-lg font-bold leading-normal tracking-wide mt-6 shadow-[0_0_25px_rgba(255,215,0,0.3)]"
            >
              Reserva tu cita ahora
            </Link>
          </div>
          <div className="w-full h-px bg-white/10 my-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>dentistry</span>
              <span className="font-bold text-white text-lg tracking-wide uppercase">Luxe Dental</span>
            </div>
            <div className="flex gap-8">
              <a className="hover:text-primary transition-colors" href="#">Privacidad</a>
              <a className="hover:text-primary transition-colors" href="#">Términos</a>
              <a className="hover:text-primary transition-colors" href="#">Contacto</a>
            </div>
            <p>© 2024 Luxe Dental Clinic. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

