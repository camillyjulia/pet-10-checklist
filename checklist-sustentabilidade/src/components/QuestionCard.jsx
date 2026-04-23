import AnswerOptions from './AnswerOptions'

function QuestionCard({ question, selectedValue, onAnswer, showError }) {
  return (
    <article
      id={`question-${question.id}`}
      className={`rounded-3xl border bg-white p-6 shadow-sm transition ${
        showError
          ? 'border-red-400 ring-2 ring-red-100'
          : 'border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {question.subtheme}
        </span>

        {showError && (
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
            Resposta obrigatória
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-8 text-slate-800">
        {question.text}
      </h3>

      <AnswerOptions
        selectedValue={selectedValue}
        onChange={(value) => onAnswer(question.id, value)}
      />
    </article>
  )
}

export default QuestionCard