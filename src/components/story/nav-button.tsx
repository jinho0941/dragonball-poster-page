import { cn } from '@/lib/utils'

type Props = {
  index: number
  isActive: boolean
  title: string
  onClick: (index: number) => void
}

export const NavButton = ({ index, isActive, title, onClick }: Props) => {
  return (
    <button
      className={cn(
        'p-3 text-white transition-all duration-700',
        isActive ? 'bg-slate-700 text-yellow-500' : 'bg-gray-500 text-white',
      )}
      onClick={() => onClick(index)}
    >
      <span>{title}</span>
    </button>
  )
}
