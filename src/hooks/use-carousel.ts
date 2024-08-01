import { useState, useEffect } from 'react'

export const useCarousel = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(2)
  const [delayIndex, setDelayIndex] = useState(currentIndex)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayIndex(currentIndex)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentIndex])

  const showPrevImage = () => {
    setCurrentIndex((index) => (index === 0 ? length - 1 : index - 1))
  }

  const showNextImage = () => {
    setCurrentIndex((index) => (index === length - 1 ? 0 : index + 1))
  }

  return {
    currentIndex,
    delayIndex,
    showPrevImage,
    showNextImage,
    setCurrentIndex,
  }
}
