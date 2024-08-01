import { ArrowLeft, ArrowRight } from 'lucide-react'

import { StoryCard } from './story-card'
import { Story } from '@/type'

export const Carousel = ({
  stories,
  currentIndex,
  delayIndex,
  showPrevImage,
  showNextImage,
}: {
  stories: Story[]
  currentIndex: number
  delayIndex: number
  showPrevImage: () => void
  showNextImage: () => void
}) => {
  return (
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
  )
}
