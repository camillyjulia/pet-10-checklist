import DimensionCard from './DimensionCard'

function DimensionGrid({
  dimensions,
  selectedDimensions,
  onToggleDimension,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Etapa 2
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#004E78]">
          Selecione as dimensões da análise
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Escolha quais dimensões deseja incluir no checklist.
          <span className="font-semibold text-slate-800">
            {' '}
            Recomendado: selecionar todas.
          </span>
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dimensions.map((dimension) => (
          <DimensionCard
            key={dimension.id}
            dimension={dimension}
            isSelected={selectedDimensions.includes(dimension.id)}
            onToggle={onToggleDimension}
          />
        ))}
      </div>
    </section>
  )
}

export default DimensionGrid