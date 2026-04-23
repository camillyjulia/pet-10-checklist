import Header from '../components/Header'
import ResultCard from '../components/ResultCard'

function ResultsPage({
  dimensions,
  groupedQuestions,
  answers,
  progressPercentage,
  onRestart,
}) {
  const totalDimensions = dimensions.length
  const totalAnswered = Object.keys(answers).length

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="inline-flex rounded-full bg-[#89CFC2]/25 px-4 py-1 text-sm font-semibold text-[#006E7C]">
            Avaliação concluída
          </span>

          <h1 className="mt-4 text-3xl font-bold text-[#004E78]">
            Resumo dos resultados
          </h1>

          <p className="mt-3 w-full max-w-none text-base leading-7 text-slate-600">
            Abaixo está um resumo visual da avaliação realizada, organizado por
            dimensão selecionada.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Progresso concluído
            </p>
            <p className="mt-2 text-3xl font-bold text-[#004E78]">
              {progressPercentage}%
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Dimensões avaliadas
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-800">
              {totalDimensions}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Respostas registradas
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-800">
              {totalAnswered}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {dimensions.map((dimension) => (
            <ResultCard
              key={dimension.id}
              dimension={dimension}
              questions={groupedQuestions[dimension.id] || []}
              answers={answers}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onRestart}
            className="rounded-2xl bg-[#1C75BC] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
          >
            Iniciar nova avaliação
          </button>
        </div>
      </main>
    </div>
  )
}

export default ResultsPage