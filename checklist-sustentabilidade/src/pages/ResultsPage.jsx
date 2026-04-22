import questions from "../data/questions";
import dimensions from "../data/dimensions";
import Header from "../components/Header";

function ResultsPage({ answers, selectedDimensions, onRestart }) {
  
  const totalQuestions = Object.keys(answers).length;

  // agrupar por dimensão
  const resultsByDimension = selectedDimensions.map((dimId) => {
    const dimQuestions = questions.filter(
      (q) => q.dimension === dimId && answers[q.id]
    );

    const values = dimQuestions.map((q) =>
      Number(answers[q.id])
    );

    const average =
      values.length > 0
        ? (
            values.reduce((a, b) => a + b, 0) /
            values.length
          ).toFixed(1)
        : "-";

    const dimensionInfo = dimensions.find(
      (d) => d.id === dimId
    );

    return {
      name: dimensionInfo?.name,
      average,
      total: values.length,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
        
        <Header />

        <div className="px-6 py-10 flex justify-center">
        <div className="max-w-3xl w-full"></div>

    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center">
    
      <div className="max-w-3xl w-full">

        <h1 className="text-2xl font-bold text-[#004E78] mb-6">
          Resultado da Avaliação
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <p className="text-gray-700">
            Total de perguntas respondidas:
          </p>
          <p className="text-2xl font-bold text-[#1C75BC]">
            {totalQuestions}
          </p>
        </div>

        {/* RESULTADOS POR DIMENSÃO */}
        <div className="space-y-4">
          {resultsByDimension.map((res, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl border"
            >
              <h2 className="font-semibold text-gray-800">
                {res.name}
              </h2>

              <p className="text-sm text-gray-600">
                Média das respostas:{" "}
                <span className="font-semibold">
                  {res.average}
                </span>
              </p>

              <p className="text-xs text-gray-400">
                {res.total} perguntas consideradas
              </p>
            </div>
          ))}
        </div>

        {/* BOTÃO */}
        <button
          onClick={onRestart}
          className="w-full mt-6 py-3 rounded-xl bg-[#1C75BC] text-white hover:opacity-90 transition"
        >
          Refazer avaliação
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default ResultsPage;