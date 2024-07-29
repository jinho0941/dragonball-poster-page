import React, { cloneElement } from 'react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
}

export const FullScrollPage = ({ children }: Props) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<HTMLDivElement[]>([])

  const [currentPageNum, setCurrentPageNum] = useState<number>(0)

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
    setTimeout(() => {
      setCurrentPageNum(pageNum)
    }, 500)
    mainRef.current.scrollTo({
      top: pageRefs.current[pageNum].offsetTop,
      behavior: 'smooth',
    })
  }

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
            isCurrentPage: currentPageNum === index,
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
