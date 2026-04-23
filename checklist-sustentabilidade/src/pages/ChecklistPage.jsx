import Header from '../components/Header'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'

function ChecklistPage({
  currentDimension,
  currentDimensionIndex,
  totalDimensions,
  questions,
  answers,
  onAnswer,
  onNext,
  progressPercentage,
  answeredQuestionsCount,
  totalQuestions,
  validationErrorQuestionIds,
}) {
  const isLastDimension = currentDimensionIndex === totalDimensions - 1

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Dimensão {currentDimensionIndex + 1} de {totalDimensions}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-[#004E78]">
                {currentDimension?.name}
              </h1>

              <p className="mt-3 w-full max-w-none text-base leading-7 text-slate-600">
                {currentDimension?.description}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
              Responda as perguntas para continuar
            </div>
          </div>
        </div>

        <div className="mb-8">
          <ProgressBar
            value={progressPercentage}
            answeredQuestionsCount={answeredQuestionsCount}
            totalQuestions={totalQuestions}
          />
        </div>

        <div className="space-y-5">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              selectedValue={answers[question.id]}
              onAnswer={onAnswer}
              showError={validationErrorQuestionIds.includes(question.id)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className="rounded-2xl bg-[#1C75BC] px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
          >
            {isLastDimension ? 'Finalizar avaliação' : 'Próxima dimensão'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default ChecklistPage