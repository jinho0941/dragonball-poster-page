import { useEffect, useRef } from 'react'

export const useVideoControl = (isCurrentPage: boolean) => {
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

  return videoRef
}
