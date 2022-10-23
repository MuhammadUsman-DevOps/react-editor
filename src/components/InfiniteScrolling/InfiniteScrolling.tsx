import React from "react"
import { Block } from "baseui/block"

interface Props {
  children: React.ReactNode
  fetchData: () => void
  hasMore: boolean
}

function InfiniteScrolling({ children, fetchData, hasMore }: Props) {
  const lastElementRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    let observer: IntersectionObserver
    if (hasMore) {
      if (lastElementRef.current) {
        observer = new IntersectionObserver((entries) => {
          const first = entries[0]
          if (first.isIntersecting) {
            if (hasMore) {
              fetchData()
            }
          }
        })

        observer.observe(lastElementRef.current)
      }
    }

    return () => {
      if (observer && lastElementRef.current) {
        observer.unobserve(lastElementRef.current)
      }
    }
  }, [lastElementRef, fetchData, hasMore])

  return (
    <Block>
      {children}
      <Block ref={lastElementRef}></Block>
    </Block>
  )
}

export default InfiniteScrolling
