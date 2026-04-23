import { useState } from 'react'
import IntroPage from './pages/IntroPage'
import SetupPage from './pages/SetupPage'
import { dimensions } from './data/dimensions'

function App() {
  const [currentPage, setCurrentPage] = useState('intro')
  const [selectedProfile, setSelectedProfile] = useState('')
  const [selectedDimensions, setSelectedDimensions] = useState([])

  function handleGoToSetup() {
    setCurrentPage('setup')
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
    alert('Próxima etapa: checklist')
  }

  if (currentPage === 'intro') {
    return <IntroPage onStart={handleGoToSetup} />
  }

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

export default App