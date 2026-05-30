import { useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import SetupPage from "./pages/SetupPage";
import ChecklistPage from "./pages/ChecklistPage";
import ResultsPage from "./pages/ResultsPage";
import { dimensions } from "./data/dimensions";
import { questions } from "./data/questions";
import {
  getFilteredQuestions,
  groupQuestionsByDimension,
  getAnsweredQuestionsCount,
  getProgressPercentage,
} from "./utils/checklist";

function AppContent() {
  const navigate = useNavigate();

  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [validationErrorQuestionIds, setValidationErrorQuestionIds] = useState(
    [],
  );

  const filteredQuestions = useMemo(() => {
    if (!selectedProfile || selectedDimensions.length === 0) return [];
    return getFilteredQuestions(questions, selectedProfile, selectedDimensions);
  }, [selectedProfile, selectedDimensions]);

  const groupedQuestions = useMemo(() => {
    return groupQuestionsByDimension(filteredQuestions);
  }, [filteredQuestions]);

  const selectedDimensionObjects = useMemo(() => {
    return dimensions.filter((dimension) =>
      selectedDimensions.includes(dimension.id),
    );
  }, [selectedDimensions]);

  const currentDimension =
    selectedDimensionObjects[currentDimensionIndex] || null;

  const currentDimensionQuestions = currentDimension
    ? groupedQuestions[currentDimension.id] || []
    : [];

  const totalQuestions = filteredQuestions.length;
  const answeredQuestionsCount = getAnsweredQuestionsCount(answers);
  const progressPercentage = getProgressPercentage(
    totalQuestions,
    answeredQuestionsCount,
  );

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToQuestion(questionId) {
    const element = document.getElementById(`question-${questionId}`);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleGoToSetup() {
    navigate("/configuracao");
    setTimeout(scrollToTop, 0);
  }

  function handleGoBackToIntro() {
    navigate("/");
    setTimeout(scrollToTop, 0);
  }

  function handleToggleDimension(dimensionId) {
    const isSelected = selectedDimensions.includes(dimensionId);
    if (isSelected) {
      setSelectedDimensions(
        selectedDimensions.filter((id) => id !== dimensionId),
      );
    } else {
      setSelectedDimensions([...selectedDimensions, dimensionId]);
    }
  }

  function handleStartChecklist() {
    setAnswers({});
    setCurrentDimensionIndex(0);
    setValidationErrorQuestionIds([]);
    navigate("/checklist");
    setTimeout(scrollToTop, 0);
  }

  function handleGoBackToSetup() {
    navigate("/configuracao");
    setTimeout(scrollToTop, 0);
  }

  function handleAnswerQuestion(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setValidationErrorQuestionIds((prev) =>
      prev.filter((id) => id !== questionId),
    );
  }

  function handlePrevDimension() {
    if (currentDimensionIndex === 0) {
      handleGoBackToSetup();
      return;
    }
    setCurrentDimensionIndex((prev) => prev - 1);
    setTimeout(scrollToTop, 0);
  }

  function handleNextDimension() {
    const unansweredQuestions = currentDimensionQuestions.filter(
      (q) => answers[q.id] === undefined,
    );

    if (unansweredQuestions.length > 0) {
      setValidationErrorQuestionIds(unansweredQuestions.map((q) => q.id));
      setTimeout(() => scrollToQuestion(unansweredQuestions[0].id), 100);
      return;
    }

    setValidationErrorQuestionIds([]);

    const isLastDimension =
      currentDimensionIndex === selectedDimensionObjects.length - 1;

    if (isLastDimension) {
      navigate("/resultados");
      setTimeout(scrollToTop, 0);
      return;
    }

    setCurrentDimensionIndex((prev) => prev + 1);
    setTimeout(scrollToTop, 0);
  }

  function handleRestart() {
    setSelectedProfile("");
    setSelectedDimensions([]);
    setAnswers({});
    setCurrentDimensionIndex(0);
    setValidationErrorQuestionIds([]);
    navigate("/");
    setTimeout(scrollToTop, 0);
  }

  return (
    <Routes>
      <Route path="/" element={<IntroPage onStart={handleGoToSetup} />} />
      <Route
        path="/configuracao"
        element={
          <SetupPage
            dimensions={dimensions}
            selectedProfile={selectedProfile}
            selectedDimensions={selectedDimensions}
            onSelectProfile={setSelectedProfile}
            onToggleDimension={handleToggleDimension}
            onStart={handleStartChecklist}
            onBack={handleGoBackToIntro}
          />
        }
      />
      <Route
        path="/checklist"
        element={
          selectedProfile && selectedDimensions.length > 0 ? (
            <ChecklistPage
              currentDimension={currentDimension}
              currentDimensionIndex={currentDimensionIndex}
              totalDimensions={selectedDimensionObjects.length}
              questions={currentDimensionQuestions}
              answers={answers}
              onAnswer={handleAnswerQuestion}
              onNext={handleNextDimension}
              onBack={handlePrevDimension}
              progressPercentage={progressPercentage}
              answeredQuestionsCount={answeredQuestionsCount}
              totalQuestions={totalQuestions}
              validationErrorQuestionIds={validationErrorQuestionIds}
            />
          ) : (
            <Navigate to="/configuracao" replace />
          )
        }
      />
      <Route
        path="/resultados"
        element={
          selectedProfile && selectedDimensions.length > 0 ? (
            <ResultsPage
              dimensions={selectedDimensionObjects}
              groupedQuestions={groupedQuestions}
              answers={answers}
              progressPercentage={progressPercentage}
              onRestart={handleRestart}
              onBack={handleGoBackToSetup}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
