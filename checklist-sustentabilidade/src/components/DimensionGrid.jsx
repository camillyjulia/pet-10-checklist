import { useState } from "react";
import DimensionCard from "./DimensionCard";
import { questions } from "../data/questions";

function DimensionGrid({
  dimensions,
  selectedDimensions,
  onToggleDimension,
  selectedProfile,
}) {
  const [allSelected, setAllSelected] = useState(true);

  function handleToggleAll() {
    if (allSelected) {
      dimensions.forEach((d) => {
        if (selectedDimensions.includes(d.id)) onToggleDimension(d.id);
      });
    } else {
      dimensions.forEach((d) => {
        if (!selectedDimensions.includes(d.id)) onToggleDimension(d.id);
      });
    }
    setAllSelected((prev) => !prev);
  }

  function getQuestionCount(dimensionId) {
    if (!selectedProfile) return undefined;
    return questions.filter(
      (q) => q.dimension === dimensionId && q.profile === selectedProfile,
    ).length;
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        Etapa 2
      </p>
      <h2 className="mt-1 text-xl font-bold text-[#004E78]">
        Selecione as dimensões da análise
      </h2>
      <p className="mt-1 text-sm leading-7 text-slate-500">
        Escolha quais dimensões deseja incluir no checklist.{" "}
        <span className="font-semibold text-slate-700">
          Recomendado: selecionar todas.
        </span>
      </p>

      <button
        type="button"
        onClick={handleToggleAll}
        className="mt-3 text-xs font-semibold text-[#1C75BC] hover:underline"
      >
        {allSelected ? "Desmarcar todas" : "Selecionar todas"}
      </button>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {dimensions.map((dimension) => (
          <DimensionCard
            key={dimension.id}
            dimension={dimension}
            isSelected={selectedDimensions.includes(dimension.id)}
            onToggle={onToggleDimension}
            questionCount={getQuestionCount(dimension.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default DimensionGrid;
