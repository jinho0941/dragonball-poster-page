import { motion } from 'framer-motion'
import { NavButton } from './nav-button'
import { Story } from '@/type'

type Props = {
  stories: Story[]
  currentIndex: number
  setCurrentIndex: (index: number) => void
}

export const Navigation = ({
  stories,
  currentIndex,
  setCurrentIndex,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className='absolute top-0 left-0 z-50 flex flex-col rounded-lg bg-black/50'
    >
      {stories.map((story, index) => (
        <NavButton
          key={index}
          index={index}
          isActive={index === currentIndex}
          title={story.title}
          onClick={setCurrentIndex}
        />
      ))}
    </motion.div>
  )
}
