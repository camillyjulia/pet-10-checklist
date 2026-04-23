import { answerOptions } from '../data/answerOptions'

function AnswerOptions({ selectedValue, onChange }) {
  return (
    <div className="mt-4 grid gap-3">
      {answerOptions.map((option) => {
        const isSelected = selectedValue === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
              isSelected
                ? 'border-[#00A084] bg-[#89CFC2]/20 text-slate-800 shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-[#1C75BC] hover:bg-slate-50'
            }`}
          >
            <span className="font-semibold">{option.value}.</span> {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default AnswerOptions