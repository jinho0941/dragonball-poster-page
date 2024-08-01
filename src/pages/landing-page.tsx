import { BackgroundVideo } from '@/components/landing/background-video'
import { Content } from '@/components/landing/content'

const LandingPage = ({ isCurrentPage }: any) => {
  return (
    <div className='relative w-full h-full'>
      <BackgroundVideo isCurrentPage={isCurrentPage} />
      {isCurrentPage && <Content />}
    </div>
  )
}

export default LandingPage
