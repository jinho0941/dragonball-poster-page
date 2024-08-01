import { BackgroundImg } from './background-img'
import { Content } from './content'

const CharacterInfoPage = ({ isCurrentPage }: any) => {
  return (
    <div className='relative h-full'>
      <BackgroundImg />
      {isCurrentPage && <Content />}
    </div>
  )
}

export default CharacterInfoPage
