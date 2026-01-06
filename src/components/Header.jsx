import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-white/10 bg-black/90 backdrop-blur-md px-6 md:px-10 py-4 shadow-lg shadow-black/50">
      <Link to="/" className="flex items-center gap-4 text-white">
        <div className="size-8 text-primary">
          <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>dentistry</span>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-wide uppercase">Luxe Dental</h2>
      </Link>
      <div className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a className="text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors tracking-wide" href="#beneficios">Beneficios</a>
          <a className="text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors tracking-wide" href="#doctores">Doctores</a>
          <a className="text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors tracking-wide" href="#resultados">Resultados</a>
          <a className="text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors tracking-wide" href="#faq">FAQ</a>
        </div>
        <Link to="/quiz" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary hover:bg-primary-hover transition-colors text-black text-sm font-extrabold leading-normal tracking-wide shadow-[0_0_15px_rgba(255,215,0,0.3)]">
          <span className="truncate">Reserva Cita</span>
        </Link>
      </div>
      <div className="md:hidden text-white">
        <span className="material-symbols-outlined">menu</span>
      </div>
    </header>
  )
}

export default Header

