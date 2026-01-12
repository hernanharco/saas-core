import { Routes, Route } from 'react-router-dom'
import { OnboardingPage } from './pages/OnboardingPage'
import { WebBuilderPage } from './pages/WebBuilderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<OnboardingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/web-builder" element={<WebBuilderPage />} />
    </Routes>
  )
}

export default App
