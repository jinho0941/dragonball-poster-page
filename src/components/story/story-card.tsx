import { cn } from '@/lib/utils'

interface Props {
  imgSrc: string
  isCurrent: boolean
  isDelay: boolean
  translateX: string
  onClick: () => void
}

export const StoryCard = ({
  imgSrc,
  isCurrent,
  isDelay,
  translateX,
  onClick,
}: Props) => {
  return (
    <div
      className={cn(
        'relative min-w-full min-h-full duration-500 ease-in-out',

        !isCurrent && 'scale-100 brightness-50',
      )}
      style={{ transform: `translateX(${translateX})` }}
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt={'Story Image'}
        className={cn(
          'object-cover transition',
          !isCurrent && 'grayscale z-0',
          isDelay && 'scale-125 brightness-100 z-50',
          isCurrent && 'cursor-pointer',
        )}
      />
    </div>
  )
}
