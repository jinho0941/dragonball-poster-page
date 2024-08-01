import { useVideoControl } from '@/hooks/use-video-control'

export const BackgroundVideo = ({
  isCurrentPage,
}: {
  isCurrentPage: boolean
}) => {
  const videoRef = useVideoControl(isCurrentPage)

  return (
    <video
      ref={videoRef}
      src={'/video1.mp4'}
      className='brightness-[25%] absolute w-full h-full object-cover'
      loop
      muted
    />
  )
}
