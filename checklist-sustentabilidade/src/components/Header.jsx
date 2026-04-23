import prefeituraLogo from '../assets/logos/prefeitura.png'
import ufcspaLogo from '../assets/logos/logo-ufcspa.png'

function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Parceria Prefeitura de Porto Alegre e UFCSPA
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#004E78]">
            Checklist de Sustentabilidade para Projetos de Inovação
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Ferramenta para avaliação de sustentabilidade em software
          </p>
        </div>

        <div className="ml-6 flex items-center gap-3">
          <div className="flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-3">
            <img
              src={prefeituraLogo}
              alt="Logo da Prefeitura de Porto Alegre"
              className="max-h-8 w-auto object-contain"
            />
          </div>

          <div className="flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-3">
            <img
              src={ufcspaLogo}
              alt="Logo da UFCSPA"
              className="max-h-8 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header