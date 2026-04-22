import { useState } from "react";
import questions from "../data/questions";
import dimensions from "../data/dimensions";
import Header from "../components/Header";

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

    return (
    <div className="min-h-screen bg-gray-50">
        
        <Header />

        <div className="px-6 py-10 flex justify-center">
        <div className="max-w-3xl w-full"></div>
    
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center">
    
      <div className="max-w-3xl w-full">

        {/* HEADER */}
        <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-[#004E78]">
                {currentDimension?.name}
            </h1>

            <p className="text-sm text-gray-500">
                Etapa {currentIndex + 1} de {selectedDimensions.length}
            </p>
        </div>

        {/* PERGUNTAS */}
        <div cclassName="bg-white p-5 rounded-2xl border border-gray-200">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white p-4 rounded-xl border"
            >
              <p className="text-xs text-gray-500 mb-1">
                {q.subtheme}
              </p>

              <p className="font-medium text-gray-800 mb-3">
                {q.text}
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                ].map((value) => (
                  <button
                    key={value}
                    onClick={() => onAnswer(q.id, value)}
                    className={`px-3 py-1 rounded-lg border text-sm
                      ${
                        answers[q.id] === value
                          ? "bg-[#1C75BC] text-white border-[#1C75BC]"
                          : "bg-white text-gray-700 border-gray-300"
                      }
                    `}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTÃO */}
        <button
          onClick={handleNext}
          disabled={!allAnswered}
          className={`w-full mt-6 py-3 rounded-xl text-white transition
            ${
              allAnswered
                ? "bg-[#1C75BC] hover:opacity-90"
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
  );
}

export default ChecklistPage;