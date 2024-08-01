import { motion } from 'framer-motion'
import { CharacterName } from './character-name'
import { TransformName } from './transform-name'
import { TransformIcons } from './trnasform-icons'
import { CharacterComment } from './character-comment'

import { Character } from '@/type'
import { useCharacterState } from '@/hooks/use-character-state'
import { CharacterImg } from './character-img'

type Props = {
  character: Character
  isSelected: boolean
}

export const CharacterSection = ({ character, isSelected }: Props) => {
  const { selectedTransformType, setTransformType } = useCharacterState()

  if (!isSelected) return null

  return (
    <section className='w-[650px] h-full mx-auto relative flex justify-center'>
      <CharacterName name={character.name} engName={character.engName} />
      <div className='absolute top-96 -left-40 '>
        {character.characterInfo.map((info) => (
          <div key={info.transformName}>
            <TransformName
              isSelected={
                info.transformType === selectedTransformType[character.type]
              }
              name={info.transformName}
            />
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='flex'
        >
          {character.characterInfo.map((info) => (
            <TransformIcons
              key={info.iconSrc}
              iconSrc={info.iconSrc}
              alt={info.transformName}
              isSelected={
                info.transformType === selectedTransformType[character.type]
              }
              onIconClick={() =>
                setTransformType(character.type, info.transformType)
              }
            />
          ))}
        </motion.div>
      </div>
      {character.characterInfo.map((info) => (
        <CharacterImg
          key={info.imgSrc}
          isSelected={
            info.transformType === selectedTransformType[character.type]
          }
          imgSrc={info.imgSrc}
          alt={info.transformName}
          width={info.width}
        />
      ))}
      <div className='absolute top-80 left-0 transform translate-x-[500px] flex flex-col'>
        {character.characterInfo.map((info) => (
          <CharacterComment
            key={info.comment}
            isSelected={
              info.transformType === selectedTransformType[character.type]
            }
            comment={info.comment}
          />
        ))}
      </div>
    </section>
  )
}
