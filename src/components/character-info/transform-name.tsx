import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

type Props = {
  isSelected: boolean
  name: string
}

export const TransformName = ({ isSelected, name }: Props) => {
  return (
    isSelected && (
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={cn('text-4xl mb-1 ')}
      >
        {name}
      </motion.h2>
    )
  )
}
