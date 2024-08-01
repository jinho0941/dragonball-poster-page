import { Content } from './content'

const CharacterInfoPage = ({ isCurrentPage }: any) => {
  return (
    <div className='relative h-full'>
      <img
        src={'/bg1.jpg'}
        alt={'bg1'}
        className='absolute object-cover object-center w-full h-full brightness-50'
      />
      {isCurrentPage && <Content />}
    </div>
  )
}

export default CharacterInfoPage
