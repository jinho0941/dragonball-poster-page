import { ReactNode, cloneElement, ReactElement } from 'react'

import { NavigationDots } from './navigation-dots'
import { useFullScroll } from '@/hooks/use-full-scroll'

type Props = {
  children: ReactNode
}

export const FullScrollPage = ({ children }: Props) => {
  const { mainRef, pageRefs, currentPageNum, handlePointClick, childrenArray } =
    useFullScroll(children)

  return (
    <main ref={mainRef} className='relative h-screen overflow-hidden'>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          ref={(el) => {
            if (!el) return
            pageRefs.current[index] = el
          }}
          className='w-full h-full'
        >
          {cloneElement(child as ReactElement, {
            isCurrentPage: currentPageNum === index,
          })}
        </div>
      ))}
      <NavigationDots
        totalPages={childrenArray.length}
        currentPageNum={currentPageNum}
        handlePointClick={handlePointClick}
      />
    </main>
  )
}
