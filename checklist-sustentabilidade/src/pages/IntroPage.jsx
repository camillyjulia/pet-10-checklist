import Header from "../components/Header";
import Footer from "../components/Footer";

function IntroPage({ onStart }) {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Header />

      <div className="flex flex-col items-center justify-center px-6 py-20">
        
        <h1 className="text-2xl font-bold text-[#004E78] mb-4">
          Checklist de Sustentabilidade
        </h1>

        <button
          onClick={onStart}
          className="bg-[#1C75BC] text-white px-6 py-3 rounded-xl"
        >
          Iniciar avaliação
        </button>

      </div>

      <Footer />
    </div>
  );
}

export default IntroPage;