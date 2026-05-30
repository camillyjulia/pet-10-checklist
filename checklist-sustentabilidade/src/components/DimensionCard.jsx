import { IconCheck } from "@tabler/icons-react";

function DimensionCard({ dimension, isSelected, onToggle, questionCount }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(dimension.id)}
      className={`h-full rounded-2xl border p-5 text-left transition ${
        isSelected
          ? "border-[#00A084] bg-[#89CFC2]/20"
          : "border-slate-200 bg-white hover:border-[#1C75BC] hover:bg-[#EFF6FF]"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: dimension.color }}
        />
        <div
          className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition ${
            isSelected
              ? "border-[#00A084] bg-[#00A084]"
              : "border-slate-300 bg-white"
          }`}
        >
          {isSelected && (
            <IconCheck size={10} className="text-white" strokeWidth={3} />
          )}
        </div>
      </div>

      <p className="text-sm font-bold text-slate-800">{dimension.name}</p>
      <p className="mt-1 text-xs leading-6 text-slate-500">
        {dimension.description}
      </p>

      {questionCount !== undefined && (
        <p className="mt-2 text-[11px] text-slate-400">
          {questionCount} perguntas
        </p>
      )}
    </button>
  );
}

export default DimensionCard;
