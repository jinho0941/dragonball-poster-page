type Props = {
  totalPages: number
  currentPageNum: number
  handlePointClick: (pageNum: number) => void
}
export const NavigationDots = ({
  totalPages,
  currentPageNum,
  handlePointClick,
}: Props) => {
  return (
    <div className='fixed z-10 flex flex-col space-y-4 -translate-y-1/2 top-1/2 right-10'>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePointClick(index)}
          className={`w-4 h-4 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-400 transition-colors duration-200 ease-in-out ${
            currentPageNum === index && 'bg-gray-800 text-white'
          }`}
        />
      ))}
    </div>
  )
}
