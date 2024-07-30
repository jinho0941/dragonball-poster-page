import { useState } from 'react'
import { StoryCard } from './story-card'
import { motion } from 'framer-motion'

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
  const length = stories.length

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
              translateX={`${-100 * currentIndex}%`}
              onClick={() => {}}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default StoryPage
