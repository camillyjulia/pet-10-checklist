import { useState } from "react";
import dimensions from "../data/dimensions";
import Header from "../components/Header";

function SetupPage({ onStart }) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedDimensions, setSelectedDimensions] = useState([]);

  const toggleDimension = (id) => {
    setSelectedDimensions((prev) =>
      prev.includes(id)
        ? prev.filter((d) => d !== id)
        : [...prev, id]
    );
  };

  const canStart =
    selectedProfile !== null && selectedDimensions.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      
      <Header />

    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center">
    
      <div className="max-w-4xl w-full">
        
        <h1 className="text-2xl font-bold text-[#004E78] mb-2">
         Configuração da Avaliação
        </h1>

        <p className="text-gray-600 mb-6">
         Selecione seu perfil e as dimensões que deseja avaliar.
        </p>

        {/* PERFIL */}
        <div className="mb-8">
          <h2 className="font-semibold mb-3 text-gray-700">
            Selecione seu perfil
          </h2>

          <div className="flex gap-4">
            <button
              onClick={() => setSelectedProfile("usuario")}
              className={`px-5 py-3 rounded-xl border transition
                ${
                  selectedProfile === "usuario"
                    ? "bg-[#00A084] text-white border-[#00A084]"
                    : "bg-white text-gray-700 border-gray-300"
                }
              `}
            >
              Usuário
            </button>

            <button
              onClick={() => setSelectedProfile("desenvolvedor")}
              className={`px-5 py-3 rounded-xl border transition
                ${
                  selectedProfile === "desenvolvedor"
                    ? "bg-[#00A084] text-white border-[#00A084]"
                    : "bg-white text-gray-700 border-gray-300"
                }
              `}
            >
              Desenvolvedor
            </button>
          </div>
        </div>

        {/* DIMENSÕES */}
        <div className="mb-8">
          <h2 className="font-semibold mb-3 text-gray-700">
            Selecione as dimensões para análise
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Recomendado selecionar todas
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dimensions.map((dim) => {
              const selected = selectedDimensions.includes(dim.id);

              return (
                <div
                  key={dim.id}
                  onClick={() => toggleDimension(dim.id)}
                  className={`cursor-pointer p-5 rounded-2xl border transition
                    ${
                        selected
                        ? "bg-[#E6F4F1] border-[#00A084]"
                        : "bg-white border-gray-200 hover:border-[#1C75BC]"
                    }
                    `}
                >
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {dim.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {dim.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTÃO */}
        <button
          onClick={() => onStart(selectedProfile, selectedDimensions)}
          disabled={!canStart}
          className={`w-full py-3 rounded-xl text-white font-medium transition
            ${
                canStart
                ? "bg-[#004E78] hover:opacity-90"
                : "bg-gray-300 cursor-not-allowed"
            }
            `}
        >
          Começar avaliação
        </button>

          </div>
      </div>
    </div>
  );
}

export default SetupPage;