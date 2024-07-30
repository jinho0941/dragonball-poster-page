import { cn } from '@/lib/utils'

type Props = {
  isSelected: boolean
  onIconClick: () => void
  iconSrc: string
  alt: string
}

export const CharacterSelectSideBar = ({
  isSelected,
  onIconClick,
  iconSrc,
  alt,
}: Props) => {
  return (
    <>
      <div
        className={cn(
          'z-30 bg-slate-700 h-16 w-32 border-2 border-black relative cursor-pointer brightness-50 hover:brightness-100 transition',
          isSelected && 'brightness-100 border-yellow-500',
        )}
        onClick={onIconClick}
      >
        <img src={iconSrc} alt={alt} className='object-cover w-full h-full' />
      </div>
    </>
  )
}
