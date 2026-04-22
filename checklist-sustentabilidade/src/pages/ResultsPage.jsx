import questions from "../data/questions";
import dimensions from "../data/dimensions";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ResultsPage({ answers, selectedDimensions, onRestart }) {
  
  const totalQuestions = Object.keys(answers).length;

  const allValues = Object.values(answers).map(Number);

  const answeredQuestions = questions.filter(
    (q) => answers[q.id] !== undefined
  );

  const weightedGlobal = answeredQuestions.map((q) => ({
    value: Number(answers[q.id]),
    weight: q.weight || 1,
  }));

  const totalGlobalWeight = weightedGlobal.reduce(
    (sum, item) => sum + item.weight,
    0
  );

  const weightedGlobalSum = weightedGlobal.reduce(
    (sum, item) => sum + item.value * item.weight,
    0
  );

  const globalAverage =
    totalGlobalWeight > 0
      ? (weightedGlobalSum / totalGlobalWeight).toFixed(1)
      : "-";

  // agrupar por dimensão
  const resultsByDimension = selectedDimensions.map((dimId) => {
    const dimQuestions = questions.filter(
      (q) => q.dimension === dimId && answers[q.id]
    );

    const values = dimQuestions.map((q) =>
      Number(answers[q.id])
    );

  const weightedValues = dimQuestions.map((q) => ({
    value: Number(answers[q.id]),
    weight: q.weight || 1,
  }));

  const totalWeight = weightedValues.reduce(
    (sum, item) => sum + item.weight,
    0
  );

  const weightedSum = weightedValues.reduce(
    (sum, item) => sum + item.value * item.weight,
    0
  );

  const average =
    totalWeight > 0
      ? (weightedSum / totalWeight).toFixed(1)
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

  const getDimensionFeedback = (avg) => {
    const value = Number(avg);

    if (value <= 2) {
      return "Baixo desempenho. Recomenda-se revisão e melhorias nessa dimensão.";
    }

    if (value <= 3.5) {
      return "Desempenho moderado. Há oportunidades claras de evolução.";
    }

    return "Bom desempenho. A dimensão apresenta práticas adequadas.";
  };

const getClassification = (avg) => {
    const value = Number(avg);

    if (value <= 2) {
      return { label: "Baixo", color: "text-red-600" };
    }
    if (value <= 3.5) {
      return { label: "Médio", color: "text-yellow-600" };
    }
    return { label: "Alto", color: "text-green-600" };
  };

  const globalClassification =
  globalAverage !== "-"
    ? getClassification(globalAverage)
    : null;

    const getFeedback = (avg) => {
      const value = Number(avg);

      if (value <= 2) {
        return "O sistema apresenta baixo nível de sustentabilidade, indicando a necessidade de melhorias significativas nas dimensões avaliadas.";
      }

      if (value <= 3.5) {
        return "O sistema apresenta nível moderado de sustentabilidade, com oportunidades claras de evolução e melhoria.";
      }

      return "O sistema apresenta um bom nível de sustentabilidade, demonstrando práticas adequadas na maioria das dimensões avaliadas.";
    };


  return (
    <div className="min-h-screen bg-gray-50">
        
        <Header />

        <div className="px-6 py-10 flex justify-center">

    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center">
    
      <div className="max-w-3xl w-full">

        <h1 className="text-2xl font-bold text-[#004E78] mb-6">
          Resultado da Avaliação
        </h1>

      <div className="bg-white p-6 rounded-2xl border mb-6">

        <h2 className="text-lg font-semibold text-[#004E78] mb-3">
          Resultado geral
        </h2>

        <p className="text-gray-600">
          Score médio:
          <span className="font-bold ml-2 text-xl text-[#004E78]">
            {globalAverage}
          </span>
        </p>

        {globalClassification && (
          <p className={`mt-1 font-medium ${globalClassification.color}`}>
            Nível: {globalClassification.label}
          </p>
        )}

        {globalAverage !== "-" && (
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">
            {getFeedback(globalAverage)}
          </p>
        )}
      </div>

        <div className="bg-white p-6 rounded-2xl border mb-6">
          <p className="text-gray-600">
            Total de respostas registradas
          </p>

          <p className="text-3xl font-bold text-[#004E78]">
            {totalQuestions}
          </p>
        </div>

        

        {/* RESULTADOS POR DIMENSÃO */}
        <div className="space-y-4">
          {resultsByDimension.map((res, index) => {
            const classification =
              res.average !== "-"
                ? getClassification(res.average)
                : null;

            return (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl border border-gray-200"
              >
                <h2 className="font-semibold text-[#004E78] mb-2">
                  {res.name}
                </h2>

                <p className="text-sm text-gray-600 mb-1">
                  Média das respostas:
                  <span className="font-semibold ml-1">
                    {res.average}
                  </span>
                </p>

                {classification && (
                  <p className={`text-sm font-medium ${classification.color}`}>
                    Nível: {classification.label}
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-1">
                  {res.total} perguntas consideradas
                </p>
  
              <p className="text-xs text-gray-600 mt-2">
                {getDimensionFeedback(res.average)}
              </p>
              </div>
             
            );
          })}
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

      <Footer />

    </div>
  );
}

export default ResultsPage;