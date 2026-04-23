function DimensionCard({ dimension, isSelected, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(dimension.id)}
      className={`h-full rounded-2xl border p-5 text-left transition ${
        isSelected
          ? 'border-[#00A084] bg-[#89CFC2]/20 shadow-sm'
          : 'border-slate-200 bg-white hover:border-[#1C75BC] hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: dimension.color }}
        />

        <div
          className={`h-5 w-5 rounded-full border-2 ${
            isSelected
              ? 'border-[#00A084] bg-[#00A084]'
              : 'border-slate-300 bg-white'
          }`}
        />
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-800">
        {dimension.name}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {dimension.description}
      </p>
    </button>
  )
}

export default DimensionCard