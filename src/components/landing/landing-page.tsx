import { motion } from 'framer-motion'

const LandingPage = ({ isCurrentPage }: any) => {
  return (
    <div className='h-full bg-slate-500'>{isCurrentPage && <Content />}</div>
  )
}

const Content = () => {
  return (
    <div className='flex items-center h-full'>
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 100 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className='w-40 h-40 bg-slate-800'
      ></motion.div>
    </div>
  )
}

export default LandingPage
