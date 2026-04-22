import { useState } from "react";
import questions from "../data/questions";
import dimensions from "../data/dimensions";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ChecklistPage({
  profile,
  selectedDimensions,
  answers,
  onAnswer,
  onFinish,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentDimensionId = selectedDimensions[currentIndex];

  const currentDimension = dimensions.find(
    (d) => d.id === currentDimensionId
  );

  // filtra perguntas por perfil + dimensão
  const filteredQuestions = questions.filter(
    (q) =>
      q.profile === profile &&
      q.dimension === currentDimensionId
  );

  const allAnswered = filteredQuestions.every(
    (q) => answers[q.id]
  );

  const isLast = currentIndex === selectedDimensions.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const options = [
    { value: "1", label: "Muito baixo" },
    { value: "2", label: "Baixo" },
    { value: "3", label: "Médio" },
    { value: "4", label: "Alto" },
    { value: "5", label: "Muito alto" },
  ];

  const progress =
     ((currentIndex + 1) / selectedDimensions.length) * 100;

    return (
    <div className="min-h-screen bg-gray-50">
        
        <Header />

        <div className="px-6 py-10 flex justify-center">

    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center">
    
      <div className="max-w-3xl w-full">

        {/* HEADER */}
        <div className="mb-6">
  
          <h1 className="text-2xl font-bold text-[#004E78] mb-2">
            {currentDimension?.name}
          </h1>

          <p className="text-sm text-gray-500 mb-3">
            Etapa {currentIndex + 1} de {selectedDimensions.length}
          </p>

          {/* BARRA */}
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-[#00A084] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* PERGUNTAS */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white p-5 rounded-2xl border border-gray-200"
            >
              <p className="text-xs text-gray-500 mb-1">
                {q.subtheme}
              </p>

              <p className="font-medium text-gray-800 mb-3">
                {q.text}
              </p>

              <div className="flex flex-wrap gap-2 justify-start">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onAnswer(q.id, opt.value)}
                    className={`px-3 py-2 rounded-lg border text-sm transition
                      ${
                        answers[q.id] === opt.value
                          ? "bg-[#004E78] text-white border-[#004E78]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#1C75BC]"
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÃO */}
        <div className="flex gap-3 mt-6">
  
       {/* BOTÃO VOLTAR */}
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`flex-1 py-3 rounded-xl border transition
              ${
                currentIndex === 0
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:border-[#1C75BC]"
              }
            `}
          >
            Voltar
          </button>

          {/* BOTÃO PRÓXIMO / FINALIZAR */}
          <button
            onClick={handleNext}
            disabled={!allAnswered}
            className={`flex-1 py-3 rounded-xl text-white font-medium transition
              ${
                allAnswered
                  ? "bg-[#004E78] hover:opacity-90"
                  : "bg-gray-300 cursor-not-allowed"
              }
            `}
          >
            {isLast ? "Finalizar avaliação" : "Próxima dimensão"}
          </button>

        </div>
                </div>
            </div>
        </div>
      <Footer />
    </div>
  );
}

export default ChecklistPage;