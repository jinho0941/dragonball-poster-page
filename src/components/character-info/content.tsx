import { motion } from 'framer-motion'

import { useCharacterState } from '@/hooks/use-character-state'
import { characters } from '@/constants'

import { CharacterSelectSideBar } from './character-selecte-sidebar'
import { CharacterSection } from './character-section'
import { SidebarTitle } from './sidebar-title'

export const Content = () => {
  const { selectedCharacter, setSelectedCharacter } = useCharacterState()

  return (
    <div className='text-white'>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
        className='absolute top-0 left-0 flex flex-col pt-3 '
      >
        <SidebarTitle />
        {characters.map((character) => (
          <CharacterSelectSideBar
            key={character.name}
            iconSrc={character.icon}
            alt={character.engName}
            isSelected={character.type === selectedCharacter}
            onIconClick={() => setSelectedCharacter(character.type)}
          />
        ))}
      </motion.div>
      {characters.map((character) => (
        <CharacterSection
          key={character.type}
          character={character}
          isSelected={selectedCharacter === character.type}
        />
      ))}
    </div>
  )
}
