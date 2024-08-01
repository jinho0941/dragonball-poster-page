import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

type Props = {
  isSelected: boolean
  comment: string
}

export const CharacterComment = ({ isSelected, comment }: Props) => {
  return (
    isSelected && (
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className={cn('text-3xl shadow-lg w-[300px] bg-black/40 rounded-xl')}
      >
        {comment}
      </motion.h2>
    )
  )
}
