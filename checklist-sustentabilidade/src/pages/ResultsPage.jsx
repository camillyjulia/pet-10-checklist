import { IconArrowLeft } from "@tabler/icons-react";
import Header from "../components/Header";
import ResultCard from "../components/ResultCard";

function ResultsPage({
  dimensions,
  groupedQuestions,
  answers,
  progressPercentage,
  onRestart,
  onBack,
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Avaliação concluída
              </p>
              <h1 className="mt-2 text-3xl font-bold text-[#004E78]">
                Resultado da avaliação
              </h1>
              <p className="mt-2 text-base leading-7 text-slate-600">
                Confira o desempenho da solução em cada dimensão avaliada.
              </p>
            </div>

            <div className="rounded-2xl bg-[#89CFC2]/20 px-5 py-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#006E7C]">
                Conclusão geral
              </p>
              <p className="mt-1 text-2xl font-bold text-[#004E78]">
                {progressPercentage}%
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {dimensions.map((dimension) => (
            <ResultCard
              key={dimension.id}
              dimension={dimension}
              questions={groupedQuestions[dimension.id] || []}
              answers={answers}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <IconArrowLeft size={16} strokeWidth={2} />
            Voltar para configuração
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="rounded-2xl bg-[#1C75BC] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1560a0]"
          >
            Nova avaliação →
          </button>
        </div>
      </main>
    </div>
  );
}

export default ResultsPage;
