import { useState } from 'react'

import { CharacterType, TransformType } from '@/type'

export const useCharacterState = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType>(
    CharacterType.SV,
  )
  const [selectedTransformType, setSelectedTransformType] = useState<
    Record<CharacterType, TransformType>
  >({
    [CharacterType.S]: TransformType.SAI,
    [CharacterType.V]: TransformType.GOD,
    [CharacterType.SV]: TransformType.BLUE,
  })

  const setTransformType = (
    characterType: CharacterType,
    transformType: TransformType,
  ) => {
    setSelectedTransformType((prev) => ({
      ...prev,
      [characterType]: transformType,
    }))
  }

  return {
    selectedCharacter,
    setSelectedCharacter,
    selectedTransformType,
    setTransformType,
  }
}
