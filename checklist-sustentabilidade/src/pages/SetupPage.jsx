import { IconArrowLeft } from "@tabler/icons-react";
import Header from "../components/Header";
import ProfileSelector from "../components/ProfileSelector";
import DimensionGrid from "../components/DimensionGrid";
import { questions } from "../data/questions";

function SetupPage({
  dimensions,
  selectedProfile,
  selectedDimensions,
  onSelectProfile,
  onToggleDimension,
  onStart,
  onBack,
}) {
  const isStartDisabled = !selectedProfile || selectedDimensions.length === 0;

  const totalQuestions = selectedProfile
    ? questions.filter(
        (q) =>
          q.profile === selectedProfile &&
          selectedDimensions.includes(q.dimension),
      ).length
    : null;

  const profileLabel =
    selectedProfile === "developer"
      ? "Desenvolvedor"
      : selectedProfile === "user"
        ? "Avaliador"
        : "Nenhum selecionado";

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#004E78]"
        >
          <IconArrowLeft size={16} strokeWidth={2} />
          Voltar para o início
        </button>

        <div className="space-y-4">
          <ProfileSelector
            selectedProfile={selectedProfile}
            onSelectProfile={onSelectProfile}
          />

          <DimensionGrid
            dimensions={dimensions}
            selectedDimensions={selectedDimensions}
            onToggleDimension={onToggleDimension}
            selectedProfile={selectedProfile}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Perfil
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {profileLabel}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Dimensões
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selectedDimensions.length} selecionada
                {selectedDimensions.length !== 1 ? "s" : ""}
              </p>
            </div>

            {totalQuestions !== null && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                  Total de perguntas
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {totalQuestions} perguntas
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onStart}
            disabled={isStartDisabled}
            className={`rounded-2xl px-6 py-3 text-sm font-semibold transition ${
              isStartDisabled
                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                : "bg-[#1C75BC] text-white hover:bg-[#1560a0]"
            }`}
          >
            Começar checklist →
          </button>
        </div>
      </main>
    </div>
  );
}

export default SetupPage;
