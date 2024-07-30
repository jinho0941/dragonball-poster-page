import { useEffect, useState } from 'react'
import { StoryCard } from './story-card'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const stories = [
  { imgSrc: '/story1.png', title: '브로리의 유배, 복수의 다짐' },
  { imgSrc: '/story2.png', title: '복수의 시작, 파라가스의 야망' },
  { imgSrc: '/story3.png', title: '분노의 브로리 사이언인의 위기' },
  { imgSrc: '/story4.png', title: '파라가스의 죽음, 각성 브로리' },
  { imgSrc: '/story5.png', title: '오지터의 등장, 싸움의 끝' },
]

const StoryPage = ({ isCurrentPage }: any) => {
  return (
    <div className='relative h-full'>
      <img
        src={'/bg2.jpg'}
        alt={'bg2'}
        className='absolute object-cover object-center w-full h-full brightness-50'
      />
      {isCurrentPage && <Content />}
    </div>
  )
}

const Content = () => {
  const [currentIndex, setCurrentIndex] = useState(2)
  const [delayIndex, setDelayIndex] = useState(currentIndex)
  const length = stories.length

  useEffect(() => {
    setTimeout(() => {
      setDelayIndex(currentIndex)
    }, 500)
  }, [currentIndex])

  const showPrevImage = () => {
    setCurrentIndex((index) => {
      if (index === 0) return length - 1
      return index - 1
    })
  }

  const showNextImage = () => {
    setCurrentIndex((index) => {
      if (index === length - 1) return 0
      return index + 1
    })
  }

  return (
    <div className='flex items-center w-full h-full'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='relative h-[400px] w-full max-w-3xl mx-auto flex items-center justify-center'
      >
        <div className='flex w-full h-full'>
          {stories.map((story, i) => (
            <StoryCard
              key={i}
              imgSrc={story.imgSrc}
              isCurrent={i === currentIndex}
              isDelay={i === delayIndex}
              translateX={`${-100 * currentIndex}%`}
              onClick={() => {}}
            />
          ))}
          <button
            onClick={showPrevImage}
            className='absolute z-50 p-3 text-yellow-300 transition transform -translate-y-1/2 bg-black border-2 border-yellow-300 rounded-full -left-20 top-1/2 hover:bg-black/50 group active:outline'
          >
            <ArrowLeft className='w-6 h-6 transition-all group-hover:scale-125' />
          </button>
          <button
            onClick={showNextImage}
            className='absolute z-50 p-3 text-yellow-300 transition transform -translate-y-1/2 bg-black border-2 border-yellow-300 rounded-full -right-20 top-1/2 hover:bg-black/50 group active:outline'
          >
            <ArrowRight className='w-6 h-6 transition-all group-hover:scale-125' />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default StoryPage
