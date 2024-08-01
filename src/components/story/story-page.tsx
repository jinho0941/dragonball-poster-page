import { BackgroundImg } from './background-img'
import { Content } from './content'

const StoryPage = ({ isCurrentPage }: any) => {
  return (
    <div className='relative h-full'>
      <BackgroundImg />
      {isCurrentPage && <Content />}
    </div>
  )
}

export default StoryPage
