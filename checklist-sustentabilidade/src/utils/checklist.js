export function getQuestionsByProfile(questions, profile) {
  return questions.filter((question) => question.profile === profile)
}

export function getQuestionsBySelectedDimensions(questions, selectedDimensions) {
  return questions.filter((question) =>
    selectedDimensions.includes(question.dimension)
  )
}

export function getFilteredQuestions(questions, profile, selectedDimensions) {
  const profileQuestions = getQuestionsByProfile(questions, profile)
  return getQuestionsBySelectedDimensions(profileQuestions, selectedDimensions)
}

export function groupQuestionsByDimension(questions) {
  return questions.reduce((acc, question) => {
    if (!acc[question.dimension]) {
      acc[question.dimension] = []
    }

    acc[question.dimension].push(question)
    return acc
  }, {})
}

export function getDimensionQuestions(questions, dimension) {
  return questions.filter((question) => question.dimension === dimension)
}

export function getTotalQuestions(questions) {
  return questions.length
}

export function getAnsweredQuestionsCount(answers) {
  return Object.keys(answers).length
}

export function getProgressPercentage(totalQuestions, answeredQuestions) {
  if (totalQuestions === 0) return 0
  return Math.round((answeredQuestions / totalQuestions) * 100)
}

export function isDimensionComplete(dimensionQuestions, answers) {
  return dimensionQuestions.every((question) => answers[question.id] !== undefined)
}

export function getCompletedDimensionsCount(groupedQuestions, answers) {
  const dimensions = Object.keys(groupedQuestions)

  return dimensions.filter((dimension) =>
    isDimensionComplete(groupedQuestions[dimension], answers)
  ).length
}