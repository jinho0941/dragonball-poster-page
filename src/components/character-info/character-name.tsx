import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

type Props = {
  name: string
  engName: string
}

export const CharacterName = ({ name, engName }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className='absolute flex flex-col top-48 -left-40 '
    >
      <h1 className={cn('text-5xl mb-1 border-b-2 border-white')}>{name}</h1>
      <h2 className={cn('text-3xl')}>{engName}</h2>
    </motion.div>
  )
}
