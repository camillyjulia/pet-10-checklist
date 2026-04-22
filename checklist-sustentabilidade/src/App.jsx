import { useState, useEffect } from "react";

import IntroPage from "./pages/IntroPage";
import SetupPage from "./pages/SetupPage";
import ChecklistPage from "./pages/ChecklistPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  const [currentPage, setCurrentPage] = useState("intro");

  const [profile, setProfile] = useState(null);
  const [selectedDimensions, setSelectedDimensions] = useState([]);

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("answers");
    if (saved) {
      setAnswers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    console.log("SALVANDO:", answers);
  }, [answers]);

  // iniciar avaliação
  const handleStart = (selectedProfile, dimensions) => {
    setProfile(selectedProfile);
    setSelectedDimensions(dimensions);
    setCurrentPage("checklist");
  };

  // salvar resposta
  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // finalizar avaliação
  const handleFinish = () => {
    setCurrentPage("results");
  };

  // reiniciar tudo
  const handleRestart = () => {
    setProfile(null);
    setSelectedDimensions([]);
    setAnswers({});
    localStorage.removeItem("answers"); // adiciona isso
    setCurrentPage("intro");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === "intro" && (
        <IntroPage
          onStart={() => {
            setAnswers({});
            localStorage.removeItem("answers");
            setCurrentPage("setup");
          }}
        />
      )}

      {currentPage === "setup" && (
        <SetupPage onStart={handleStart} />
      )}

      {currentPage === "checklist" && (
        <ChecklistPage
          profile={profile}
          selectedDimensions={selectedDimensions}
          answers={answers}
          onAnswer={handleAnswer}
          onFinish={handleFinish}
        />
      )}

      {currentPage === "results" && (
        <ResultsPage
          answers={answers}
          selectedDimensions={selectedDimensions}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;