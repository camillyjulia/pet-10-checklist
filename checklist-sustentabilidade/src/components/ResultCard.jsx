function ResultCard({ dimension, questions, answers }) {
  const answeredValues = questions
    .map((question) => answers[question.id])
    .filter((value) => value !== undefined)

  const totalAnswered = answeredValues.length

  const average =
    totalAnswered > 0
      ? (
          answeredValues.reduce((sum, value) => sum + value, 0) / totalAnswered
        ).toFixed(1)
      : '0.0'

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: dimension.color }}
            />

            <h3 className="text-xl font-bold text-slate-800">
              {dimension.name}
            </h3>
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {dimension.description}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 px-4 py-3 text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Média visual
          </p>
          <p className="mt-1 text-2xl font-bold text-[#004E78]">{average}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-500">
            Perguntas respondidas
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-800">
            {totalAnswered}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-500">
            Total de perguntas da dimensão
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-800">
            {questions.length}
          </p>
        </div>
      </div>
    </article>
  )
}

export default ResultCard