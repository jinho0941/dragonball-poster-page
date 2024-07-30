import { cn } from '@/lib/utils'

type Props = {
  isSelected: boolean
  onIconClick: () => void
  iconSrc: string
  alt: string
}

export const TransformIcons = ({
  isSelected,
  onIconClick,
  iconSrc: imgSrc,
  alt,
}: Props) => {
  return (
    <div
      className={cn(
        'z-20 relative h-20 w-20 border-2 border-black bg-slate-700 brightness-50 cursor-pointer hover:brightness-110 transition',
        isSelected && 'border-4 border-yellow-400 brightness-100',
      )}
      onClick={onIconClick}
    >
      <img src={imgSrc} alt={alt} className='object-cover h-full w-full' />
    </div>
  )
}
