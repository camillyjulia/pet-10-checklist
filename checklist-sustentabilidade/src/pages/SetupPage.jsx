import Header from '../components/Header'
import ProfileSelector from '../components/ProfileSelector'
import DimensionGrid from '../components/DimensionGrid'

function SetupPage({
  dimensions,
  selectedProfile,
  selectedDimensions,
  onSelectProfile,
  onToggleDimension,
  onStart,
}) {
  const isStartDisabled =
    !selectedProfile || selectedDimensions.length === 0

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="space-y-6">
          <ProfileSelector
            selectedProfile={selectedProfile}
            onSelectProfile={onSelectProfile}
          />

          <DimensionGrid
            dimensions={dimensions}
            selectedDimensions={selectedDimensions}
            onToggleDimension={onToggleDimension}
          />
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Perfil selecionado:{' '}
              <span className="font-semibold text-slate-800">
                {selectedProfile === 'developer'
                  ? 'Desenvolvedor'
                  : selectedProfile === 'user'
                  ? 'Usuário'
                  : 'Nenhum'}
              </span>
            </p>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Dimensões selecionadas:{' '}
              <span className="font-semibold text-slate-800">
                {selectedDimensions.length}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onStart}
            disabled={isStartDisabled}
            className={`rounded-2xl px-6 py-3 text-base font-semibold transition ${
              isStartDisabled
                ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                : 'bg-[#1C75BC] text-white hover:opacity-90'
            }`}
          >
            Começar checklist
          </button>
        </div>
      </main>
    </div>
  )
}

export default SetupPage