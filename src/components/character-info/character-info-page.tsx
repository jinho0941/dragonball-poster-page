import { motion } from 'framer-motion'
import { useState } from 'react'
import { CharacterSelectSideBar } from './character-selecte-sidebar'
import { SidebarTitle } from './sidebar-title'

const CharacterInfoPage = ({ isCurrentPage }: any) => {
  console.log(isCurrentPage)
  return (
    <div className='relative h-full'>
      <img
        src={'/bg1.jpg'}
        alt={'bg1'}
        className='object-cover object-center w-full h-full brightness-50'
      />
      {isCurrentPage && <Content />}
    </div>
  )
}

export enum CharacterType {
  S,
  V,
  SV,
}

const Content = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType>(
    CharacterType.SV,
  )

  const handleClickS = () => setSelectedCharacter(CharacterType.S)
  const handleClickV = () => setSelectedCharacter(CharacterType.V)
  const handleClickSV = () => setSelectedCharacter(CharacterType.SV)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
        className='absolute top-0 left-0 flex flex-col pt-3 '
      >
        <SidebarTitle />
        <CharacterSelectSideBar
          iconSrc='/s.png'
          alt='songoku'
          isSelected={selectedCharacter === CharacterType.S}
          onIconClick={handleClickS}
        />
        <CharacterSelectSideBar
          iconSrc='/v.png'
          alt='vegeta'
          isSelected={selectedCharacter === CharacterType.V}
          onIconClick={handleClickV}
        />
        <CharacterSelectSideBar
          iconSrc='/sv-normal-icon.png'
          alt='Gogeta'
          isSelected={selectedCharacter === CharacterType.SV}
          onIconClick={handleClickSV}
        />
      </motion.div>
    </>
  )
}

export default CharacterInfoPage
