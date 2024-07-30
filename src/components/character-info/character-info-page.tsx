import { motion } from 'framer-motion'
import { Fragment, useState } from 'react'
import { CharacterSelectSideBar } from './character-selecte-sidebar'
import { SidebarTitle } from './sidebar-title'
import { CharacterName } from './character-name'
import { TransformName } from './transform-name'
import { TransformIcons } from './trnasform-icons'
import { Character } from './character'

const CharacterInfoPage = ({ isCurrentPage }: any) => {
  console.log(isCurrentPage)
  return (
    <div className='relative h-full'>
      <img
        src={'/bg1.jpg'}
        alt={'bg1'}
        className='absolute object-cover object-center w-full h-full brightness-50'
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

enum GogetaTransformType {
  NORMAL,
  SAI,
  BLUE,
}

enum VegetaTransformType {
  SAI,
  GOD,
  BLUE,
}

enum SonGokuTransformType {
  SAI,
  GOD,
  BLUE,
}

const Content = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType>(
    CharacterType.SV,
  )
  const [selectedVegetaTransformType, setSelectedVegetaTransformType] =
    useState<VegetaTransformType>(VegetaTransformType.GOD)
  const [selectedSonGokuTransformType, setSelectedSonGokuTransformType] =
    useState<SonGokuTransformType>(SonGokuTransformType.SAI)
  const [selectedGogetaTransformType, setSelectedGogetaTransformType] =
    useState<GogetaTransformType>(GogetaTransformType.BLUE)

  const handleClickSonGoku = () => setSelectedCharacter(CharacterType.S)
  const handleClickVegeta = () => setSelectedCharacter(CharacterType.V)
  const handleClickGogeta = () => setSelectedCharacter(CharacterType.SV)

  return (
    <div className='text-white'>
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
          onIconClick={handleClickSonGoku}
        />
        <CharacterSelectSideBar
          iconSrc='/v.png'
          alt='vegeta'
          isSelected={selectedCharacter === CharacterType.V}
          onIconClick={handleClickVegeta}
        />
        <CharacterSelectSideBar
          iconSrc='/sv-normal-icon.png'
          alt='Gogeta'
          isSelected={selectedCharacter === CharacterType.SV}
          onIconClick={handleClickGogeta}
        />
      </motion.div>

      {selectedCharacter === CharacterType.S && (
        <section className='w-[650px] h-full mx-auto relative flex justify-center'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='absolute flex flex-col top-48 -left-40 '
          >
            <CharacterName name='손오공' engName='songoku' />
          </motion.div>
          <div className='absolute top-96 -left-40 '>
            <TransformName
              isSelected={
                selectedSonGokuTransformType === SonGokuTransformType.SAI
              }
              name='초사이어인'
            />
            <TransformName
              isSelected={
                selectedSonGokuTransformType === SonGokuTransformType.GOD
              }
              name='초사이어인 갓'
            />
            <TransformName
              isSelected={
                selectedSonGokuTransformType === SonGokuTransformType.BLUE
              }
              name='초사이어인 블루'
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='flex'
            >
              <TransformIcons
                iconSrc='/s-sai-icon.png'
                alt='초사이어인'
                isSelected={
                  selectedSonGokuTransformType === SonGokuTransformType.SAI
                }
                onIconClick={() =>
                  setSelectedSonGokuTransformType(SonGokuTransformType.SAI)
                }
              />
              <TransformIcons
                iconSrc='/s-god-icon.png'
                alt='초사이어인 갓'
                isSelected={
                  selectedSonGokuTransformType === SonGokuTransformType.GOD
                }
                onIconClick={() =>
                  setSelectedSonGokuTransformType(SonGokuTransformType.GOD)
                }
              />
              <TransformIcons
                iconSrc='/s-blue-icon.png'
                alt='초사이어인 블루'
                isSelected={
                  selectedSonGokuTransformType === SonGokuTransformType.BLUE
                }
                onIconClick={() =>
                  setSelectedSonGokuTransformType(SonGokuTransformType.BLUE)
                }
              />
            </motion.div>
          </div>
          <Character
            isSelected={
              selectedSonGokuTransformType === SonGokuTransformType.SAI
            }
            imgSrc='/s2.webp'
            alt='초사이어인'
            width={750}
          />
          <Character
            isSelected={
              selectedSonGokuTransformType === SonGokuTransformType.GOD
            }
            imgSrc='/s3.webp'
            alt='초사이어인 갓'
            width={550}
          />
          <Character
            isSelected={
              selectedSonGokuTransformType === SonGokuTransformType.BLUE
            }
            imgSrc='/s4.webp'
            alt='초사이어인 블루'
            width={900}
          />
        </section>
      )}
      {selectedCharacter === CharacterType.V && (
        <section className='w-[650px] h-full mx-auto relative flex justify-center'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='absolute flex flex-col top-48 -left-40 '
          >
            <CharacterName name='배지터' engName='vegeta' />
          </motion.div>
          <div className='absolute top-96 -left-40 '>
            <TransformName
              isSelected={
                selectedVegetaTransformType === VegetaTransformType.SAI
              }
              name='초사이어인'
            />
            <TransformName
              isSelected={
                selectedVegetaTransformType === VegetaTransformType.GOD
              }
              name='초사이어인 갓'
            />
            <TransformName
              isSelected={
                selectedVegetaTransformType === VegetaTransformType.BLUE
              }
              name='초사이어인 블루'
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='flex'
            >
              <TransformIcons
                iconSrc='/v-sai-icon.png'
                alt='초사이어인'
                isSelected={
                  selectedVegetaTransformType === VegetaTransformType.SAI
                }
                onIconClick={() =>
                  setSelectedVegetaTransformType(VegetaTransformType.SAI)
                }
              />
              <TransformIcons
                iconSrc='/v-god-icon.png'
                alt='초사이어인 갓'
                isSelected={
                  selectedVegetaTransformType === VegetaTransformType.GOD
                }
                onIconClick={() =>
                  setSelectedVegetaTransformType(VegetaTransformType.GOD)
                }
              />
              <TransformIcons
                iconSrc='/v-blue-icon.png'
                alt='초사이어인 블루'
                isSelected={
                  selectedVegetaTransformType === VegetaTransformType.BLUE
                }
                onIconClick={() =>
                  setSelectedVegetaTransformType(VegetaTransformType.BLUE)
                }
              />
            </motion.div>
          </div>
          <Character
            isSelected={selectedVegetaTransformType === VegetaTransformType.SAI}
            imgSrc='/v2.webp'
            alt='초사이어인'
            width={650}
          />
          <Character
            isSelected={selectedVegetaTransformType === VegetaTransformType.GOD}
            imgSrc='/v3.webp'
            alt='초사이어인 갓'
            width={550}
          />
          <Character
            isSelected={
              selectedVegetaTransformType === VegetaTransformType.BLUE
            }
            imgSrc='/v4.webp'
            alt='초사이어인 블루'
            width={350}
          />
        </section>
      )}

      {selectedCharacter === CharacterType.SV && (
        <section className='w-[650px] h-full mx-auto relative flex justify-center'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='absolute flex flex-col top-48 -left-40 '
          >
            <CharacterName name='오지터' engName='Gogeta' />
          </motion.div>
          <div className='absolute top-96 -left-40 '>
            <TransformName
              isSelected={
                selectedGogetaTransformType === GogetaTransformType.NORMAL
              }
              name='노말'
            />
            <TransformName
              isSelected={
                selectedGogetaTransformType === GogetaTransformType.SAI
              }
              name='초사이어인'
            />
            <TransformName
              isSelected={
                selectedGogetaTransformType === GogetaTransformType.BLUE
              }
              name='초사이어인 블루'
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='flex'
            >
              <TransformIcons
                iconSrc='/sv-normal-icon.png'
                alt='노말'
                isSelected={
                  selectedGogetaTransformType === GogetaTransformType.NORMAL
                }
                onIconClick={() =>
                  setSelectedGogetaTransformType(GogetaTransformType.NORMAL)
                }
              />
              <TransformIcons
                iconSrc='/sv-sai-icon.png'
                alt='초사이어인'
                isSelected={
                  selectedGogetaTransformType === GogetaTransformType.SAI
                }
                onIconClick={() =>
                  setSelectedGogetaTransformType(GogetaTransformType.SAI)
                }
              />
              <TransformIcons
                iconSrc='/sv-blue-icon.png'
                alt='초사이어인 블루'
                isSelected={
                  selectedGogetaTransformType === GogetaTransformType.BLUE
                }
                onIconClick={() =>
                  setSelectedGogetaTransformType(GogetaTransformType.BLUE)
                }
              />
            </motion.div>
          </div>
          <Character
            isSelected={
              selectedGogetaTransformType === GogetaTransformType.NORMAL
            }
            imgSrc='/sv1.png'
            alt='노말'
            width={650}
          />
          <Character
            isSelected={selectedGogetaTransformType === GogetaTransformType.SAI}
            imgSrc='/sv2.webp'
            alt='초사이어인'
            width={650}
          />
          <Character
            isSelected={
              selectedGogetaTransformType === GogetaTransformType.BLUE
            }
            imgSrc='/sv3.webp'
            alt='초사이어인 블루'
            width={550}
          />
        </section>
      )}
    </div>
  )
}

export default CharacterInfoPage
