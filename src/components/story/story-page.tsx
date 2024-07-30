const StoryPage = ({ isCurrentPage }: any) => {
  return (
    <div className='relative h-full'>
      <img
        src={'/bg2.jpg'}
        alt={'bg2'}
        className='absolute object-cover object-center brightness-50'
      />
      {isCurrentPage && <Content />}
    </div>
  )
}

const Content = () => {
  return <div></div>
}

export default StoryPage
