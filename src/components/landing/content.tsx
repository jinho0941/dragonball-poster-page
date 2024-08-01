import { ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'

import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Content: React.FC = () => {
  return (
    <div className='relative z-50 flex flex-col items-center justify-center w-full h-full'>
      <TextGenerateEffect
        words={'최 대 의 적 사 이 언 인'}
        className={cn('text-white text-6xl tracking-tighter relative top-14')}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <img src={'/logo2.webp'} alt='logo' width={750} height={384} />
        <h1 className={cn('relative text-white text-6xl text-center')}>
          {'브로리'}
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className='flex flex-col items-center mt-10 gap-y-3'
      >
        <ArrowDown className='w-12 h-12 text-white animate-bounce' />
        <Button className='bg-white text-black w-[300px] font-bold hover:bg-slate-300'>
          영상 보러가기
        </Button>
      </motion.div>
    </div>
  )
}
