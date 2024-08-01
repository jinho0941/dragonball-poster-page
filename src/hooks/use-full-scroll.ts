import { Children, ReactNode, useEffect, useRef, useState } from 'react'

export const useFullScroll = (children: ReactNode) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<HTMLDivElement[]>([])
  const [currentPageNum, setCurrentPageNum] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const childrenArray = Children.toArray(children)

  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, childrenArray.length)

    childrenArray.forEach((_, index) => {
      const pageRef = pageRefs.current[index]
      if (pageRef && !pageRefs.current.includes(pageRef)) {
        pageRefs.current[index] = pageRef
      }
    })
  }, [])

  const handlePointClick = (pageNum: number) => {
    if (!mainRef.current) return
    setCurrentPageNum(pageNum)
    mainRef.current.scrollTo({
      top: pageRefs.current[pageNum].offsetTop,
      behavior: 'smooth',
    })
  }

  const handleWheel = (event: WheelEvent) => {
    const maxPage = pageRefs.current.length - 1
    const minPage = 0
    if (
      (event.deltaY > 0 && currentPageNum === maxPage) ||
      (event.deltaY < 0 && currentPageNum === minPage) ||
      isScrolling
    ) {
      return
    }

    let nextPage = currentPageNum + (event.deltaY > 0 ? 1 : -1)
    nextPage = Math.max(Math.min(nextPage, maxPage), minPage)

    setIsScrolling(true)
    mainRef.current?.scrollTo({
      top: pageRefs.current[nextPage].offsetTop,
      behavior: 'smooth',
    })

    const handleScrollEnd = () => {
      const currentScrollTop = mainRef.current?.scrollTop
      const targetScrollTop = pageRefs.current[nextPage].offsetTop
      if (
        currentScrollTop! - 1 < targetScrollTop &&
        targetScrollTop < currentScrollTop! + 1
      ) {
        setIsScrolling(false)
        mainRef.current?.removeEventListener('scroll', handleScrollEnd)
      }
    }
    mainRef.current?.addEventListener('scroll', handleScrollEnd)

    setTimeout(() => {
      setCurrentPageNum(nextPage)
    }, 500)
  }

  useEffect(() => {
    mainRef.current?.addEventListener('wheel', handleWheel)
    return () => {
      mainRef.current?.removeEventListener('wheel', handleWheel)
    }
  }, [currentPageNum, isScrolling])

  useEffect(() => {
    const handleResize = () => {
      mainRef.current?.scrollTo({
        top: pageRefs.current[currentPageNum].offsetTop,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [currentPageNum])

  return { mainRef, pageRefs, currentPageNum, handlePointClick, childrenArray }
}
