import { motion } from 'framer-motion'
type Props = {
  isSelected: boolean
  imgSrc: string
  alt: string
  width: number
}

export const Character = ({ isSelected, imgSrc, alt, width }: Props) => {
  return (
    isSelected && (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='relative h-auto'
        style={{ width }}
      >
        <img
          src={imgSrc}
          alt={alt}
          className='object-cover object-top w-full h-full'
        />
      </motion.div>
    )
  )
}
