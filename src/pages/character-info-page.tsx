import { BackgroundImg } from '@/components/character-info/background-img'
import { Content } from '@/components/character-info/content'

const CharacterInfoPage = ({ isCurrentPage }: any) => {
  return (
    <div className='relative h-full'>
      <BackgroundImg />
      {isCurrentPage && <Content />}
    </div>
  )
}

export default CharacterInfoPage
