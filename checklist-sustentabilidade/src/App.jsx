import { useMemo, useState } from 'react'
import IntroPage from './pages/IntroPage'
import SetupPage from './pages/SetupPage'
import ChecklistPage from './pages/ChecklistPage'
import ResultsPage from './pages/ResultsPage'
import { dimensions } from './data/dimensions'
import { questions } from './data/questions'
import {
  getFilteredQuestions,
  groupQuestionsByDimension,
  getAnsweredQuestionsCount,
  getProgressPercentage,
} from './utils/checklist'

function App() {
  const [currentPage, setCurrentPage] = useState('intro')
  const [selectedProfile, setSelectedProfile] = useState('')
  const [selectedDimensions, setSelectedDimensions] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0)
  const [validationErrorQuestionIds, setValidationErrorQuestionIds] = useState([])

  const filteredQuestions = useMemo(() => {
    if (!selectedProfile || selectedDimensions.length === 0) return []
    return getFilteredQuestions(questions, selectedProfile, selectedDimensions)
  }, [selectedProfile, selectedDimensions])

  const groupedQuestions = useMemo(() => {
    return groupQuestionsByDimension(filteredQuestions)
  }, [filteredQuestions])

  const selectedDimensionObjects = useMemo(() => {
    return dimensions.filter((dimension) =>
      selectedDimensions.includes(dimension.id)
    )
  }, [selectedDimensions])

  const currentDimension = selectedDimensionObjects[currentDimensionIndex] || null

  const currentDimensionQuestions = currentDimension
    ? groupedQuestions[currentDimension.id] || []
    : []

  const totalQuestions = filteredQuestions.length
  const answeredQuestionsCount = getAnsweredQuestionsCount(answers)
  const progressPercentage = getProgressPercentage(
    totalQuestions,
    answeredQuestionsCount
  )

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function scrollToQuestion(questionId) {
    const element = document.getElementById(`question-${questionId}`)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  function handleGoToSetup() {
    setCurrentPage('setup')
    setTimeout(() => {
      scrollToTop()
    }, 0)
  }

  function handleToggleDimension(dimensionId) {
    const isSelected = selectedDimensions.includes(dimensionId)

    if (isSelected) {
      setSelectedDimensions(
        selectedDimensions.filter((id) => id !== dimensionId)
      )
      return
    }

    setSelectedDimensions([...selectedDimensions, dimensionId])
  }

  function handleStartChecklist() {
    setAnswers({})
    setCurrentDimensionIndex(0)
    setValidationErrorQuestionIds([])
    setCurrentPage('checklist')

    setTimeout(() => {
      scrollToTop()
    }, 0)
  }

  function handleAnswerQuestion(questionId, value) {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }))

    setValidationErrorQuestionIds((prevIds) =>
      prevIds.filter((id) => id !== questionId)
    )
  }

  function handleNextDimension() {
    const unansweredQuestions = currentDimensionQuestions.filter(
      (question) => answers[question.id] === undefined
    )

    if (unansweredQuestions.length > 0) {
      const unansweredIds = unansweredQuestions.map((question) => question.id)
      const firstUnansweredQuestionId = unansweredQuestions[0].id

      setValidationErrorQuestionIds(unansweredIds)

      setTimeout(() => {
        scrollToQuestion(firstUnansweredQuestionId)
      }, 100)

      return
    }

    setValidationErrorQuestionIds([])

    const isLastDimension =
      currentDimensionIndex === selectedDimensionObjects.length - 1

    if (isLastDimension) {
      setCurrentPage('results')

      setTimeout(() => {
        scrollToTop()
      }, 0)

      return
    }

    setCurrentDimensionIndex((prevIndex) => prevIndex + 1)

    setTimeout(() => {
      scrollToTop()
    }, 0)
  }

  function handleRestart() {
    setCurrentPage('intro')
    setSelectedProfile('')
    setSelectedDimensions([])
    setAnswers({})
    setCurrentDimensionIndex(0)
    setValidationErrorQuestionIds([])

    setTimeout(() => {
      scrollToTop()
    }, 0)
  }

  if (currentPage === 'intro') {
    return <IntroPage onStart={handleGoToSetup} />
  }

  if (currentPage === 'setup') {
    return (
      <SetupPage
        dimensions={dimensions}
        selectedProfile={selectedProfile}
        selectedDimensions={selectedDimensions}
        onSelectProfile={setSelectedProfile}
        onToggleDimension={handleToggleDimension}
        onStart={handleStartChecklist}
      />
    )
  }

  if (currentPage === 'checklist') {
    return (
      <ChecklistPage
        currentDimension={currentDimension}
        currentDimensionIndex={currentDimensionIndex}
        totalDimensions={selectedDimensionObjects.length}
        questions={currentDimensionQuestions}
        answers={answers}
        onAnswer={handleAnswerQuestion}
        onNext={handleNextDimension}
        progressPercentage={progressPercentage}
        answeredQuestionsCount={answeredQuestionsCount}
        totalQuestions={totalQuestions}
        validationErrorQuestionIds={validationErrorQuestionIds}
      />
    )
  }

  return (
    <ResultsPage
      dimensions={selectedDimensionObjects}
      groupedQuestions={groupedQuestions}
      answers={answers}
      progressPercentage={progressPercentage}
      onRestart={handleRestart}
    />
  )
}

export default App