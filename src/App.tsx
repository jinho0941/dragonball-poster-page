import CharacterInfoPage from './components/character-info/character-info-page'
import LandingPage from './components/landing/landing-page'
import StoryPage from './components/story/story-page'
import { FullScrollPage } from './components/full-page'

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
