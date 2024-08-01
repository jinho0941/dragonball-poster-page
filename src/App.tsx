import CharacterInfoPage from './pages/character-info-page'
import LandingPage from './pages/landing-page'
import StoryPage from './pages/story-page'
import { FullScrollPage } from './components/full-scroll-page'

function App() {
  return (
    <FullScrollPage>
      <LandingPage />
      <CharacterInfoPage />
      <StoryPage />
    </FullScrollPage>
  )
}

export default App
