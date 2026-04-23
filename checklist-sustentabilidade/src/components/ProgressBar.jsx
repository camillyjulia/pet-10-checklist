function ProgressBar({ value, answeredQuestionsCount, totalQuestions }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Progresso da avaliação
          </p>
          <p className="mt-2 text-base text-slate-600">
            {answeredQuestionsCount} de {totalQuestions} perguntas respondidas
          </p>
        </div>

        <div className="rounded-full bg-[#89CFC2]/20 px-4 py-2 text-sm font-semibold text-[#006E7C]">
          {value}%
        </div>
      </div>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[#1C75BC] transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar