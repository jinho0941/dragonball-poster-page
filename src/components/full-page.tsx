import React, { cloneElement, useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
}

export const FullScrollPage = ({ children }: Props) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<HTMLDivElement[]>([])
  const [currentPageNum, setCurrentPageNum] = useState<number>(0)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)

  const childrenArray = React.Children.toArray(children)

  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, childrenArray.length)

    childrenArray.forEach((_, index) => {
      const pageRef = pageRefs.current[index]
      if (pageRef && !pageRefs.current.includes(pageRef)) {
        pageRefs.current[index] = pageRef
      }
    })
  }, [childrenArray])

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
      (event.deltaY < 0 && currentPageNum === minPage)
    ) {
      return
    }
    if (isScrolling) return

    let nextPage = currentPageNum
    if (event.deltaY > 0) {
      nextPage = Math.min(currentPageNum + 1, maxPage)
    } else if (event.deltaY < 0) {
      nextPage = Math.max(currentPageNum - 1, minPage)
    }

    setIsScrolling(true)
    mainRef.current?.scrollTo({
      top: pageRefs.current[nextPage].offsetTop,
      behavior: 'smooth',
    })

    const handleScrollEnd = () => {
      if (mainRef.current) {
        const currentScrollTop = mainRef.current.scrollTop
        const targetScrollTop = pageRefs.current[nextPage].offsetTop
        if (currentScrollTop === targetScrollTop) {
          setIsScrolling(false)
          mainRef.current.removeEventListener('scroll', handleScrollEnd)
        }
      }
    }

    mainRef.current?.addEventListener('scroll', handleScrollEnd)

    setCurrentPageNum(nextPage)
  }

  useEffect(() => {
    mainRef.current?.addEventListener('wheel', handleWheel)
    return () => {
      mainRef.current?.removeEventListener('wheel', handleWheel)
    }
  }, [currentPageNum, isScrolling])

  return (
    <main ref={mainRef} className='relative h-screen overflow-hidden'>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) {
              pageRefs.current[index] = el
            }
          }}
          className='h-full w-full'
        >
          {cloneElement(child as any, {
            // isCurrentPage: currentPageNum === index,
          })}
        </div>
      ))}
      <div className='flex flex-col space-y-4 fixed top-1/2 -translate-y-1/2 right-10 z-10'>
        {childrenArray.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePointClick(index)}
            className={`w-4 h-4 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-400 transition-colors duration-200 ease-in-out ${
              currentPageNum === index && 'bg-gray-800 text-white'
            }`}
          />
        ))}
      </div>
    </main>
  )
}
