const CharacterInfoPage = ({ isCurrentPage }: any) => {
  return (
    <div className='h-full'>
      <img
        src={'/bg1.jpg'}
        alt={'bg1'}
        className='object-cover object-center w-full h-full brightness-50'
      />
      {isCurrentPage && <Content />}
    </div>
  )
}

const Content = () => {
  return <div></div>
}

export default CharacterInfoPage
