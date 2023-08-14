import React from "react"
import { Skeleton } from "baseui/skeleton";

export default function LazyLoadImage({ url }: { url: string }) {
  const [state, setState] = React.useState<{ image: HTMLImageElement | null }>({ image: null })
  React.useEffect(() => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      setTimeout(() => {
        setState({ image: image })
      }, 1000)
    }
  }, [])
  return (
    <>
      {state.image ? <img src={url} style={{ height: "180px" }} alt="image" /> : <Skeleton height="180px" animation />}
    </>
  )
}
