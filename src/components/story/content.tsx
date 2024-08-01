import { motion } from 'framer-motion'

import { Carousel } from './carousel'
import { Navigation } from './navigation'

import { stories } from '@/constants'
import { useCarousel } from '@/hooks/use-carousel'

export const Content = () => {
  const {
    currentIndex,
    delayIndex,
    showPrevImage,
    showNextImage,
    setCurrentIndex,
  } = useCarousel(stories.length)

  return (
    <div className='flex items-center w-full h-full'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='relative h-[400px] w-full max-w-3xl mx-auto flex items-center justify-center'
      >
        <Carousel
          stories={stories}
          currentIndex={currentIndex}
          delayIndex={delayIndex}
          showPrevImage={showPrevImage}
          showNextImage={showNextImage}
        />
      </motion.div>
      <Navigation
        stories={stories}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  )
}
