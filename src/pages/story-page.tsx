import { BackgroundImg } from '@/components/story/background-img'
import { Content } from '@/components/story/content'

const StoryPage = ({ isCurrentPage }: any) => {
  return (
    <div className='relative h-full'>
      <BackgroundImg />
      {isCurrentPage && <Content />}
    </div>
  )
}

export default StoryPage
