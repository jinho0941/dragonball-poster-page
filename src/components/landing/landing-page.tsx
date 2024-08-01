import { BackgroundVideo } from './background-video'
import { Content } from './content'

const LandingPage = ({ isCurrentPage }: any) => {
  return (
    <div className='relative w-full h-full'>
      <BackgroundVideo isCurrentPage={isCurrentPage} />
      {isCurrentPage && <Content />}
    </div>
  )
}

export default LandingPage
