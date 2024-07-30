import { useEffect, useRef } from 'react'

const LandingPage = ({ isCurrentPage }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current

    if (!videoElement) return

    if (!isCurrentPage) {
      videoElement.pause()
      return
    }

    videoElement.play().catch((error) => {
      console.error('에러발생', error)
    })
  }, [isCurrentPage])

  return (
    <div className='relative w-full h-full'>
      <video
        ref={videoRef}
        src='/video1.mp4'
        className='brightness-[25%] absolute w-full h-full object-cover'
        loop
        muted
      />
      {/* {isCurrentPage && <Content />} */}
    </div>
  )
}

export default LandingPage
