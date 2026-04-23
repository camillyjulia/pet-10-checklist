function Header() {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Prefeitura de Porto Alegre + UFCSPA
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#004E78]">
            Checklist de Sustentabilidade
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Ferramenta para avaliação de sustentabilidade em software
          </p>
        </div>

        <div className="ml-6 flex items-center gap-3">
          <div className="flex h-12 w-24 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-500">
            Logo 1
          </div>

          <div className="flex h-12 w-24 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-500">
            Logo 3
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header