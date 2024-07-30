import { cn } from '@/lib/utils'

type Props = {
  name: string
  engName: string
}

export const CharacterName = ({ name, engName }: Props) => {
  return (
    <>
      <h1 className={cn('text-5xl mb-1 border-b-2 border-white')}>{name}</h1>
      <h2 className={cn('text-3xl')}>{engName}</h2>
    </>
  )
}
