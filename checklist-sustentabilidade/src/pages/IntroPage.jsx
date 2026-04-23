import Header from '../components/Header'
import IntroSection from '../components/IntroSection'

function IntroPage({ onStart }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <IntroSection onStart={onStart} />
    </div>
  )
}

export default IntroPage