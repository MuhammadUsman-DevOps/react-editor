import * as React from "react"
import { Editor } from "~/core"
import { Context } from "./context"
import ResizeObserver from "resize-observer-polyfill"
import { EditorConfig } from "~/types"

interface Props {
  config?: Partial<EditorConfig>
}
export const Canvas = (props: Props) => {
  const context = React.useContext(Context)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = containerRef.current as HTMLDivElement
    const { clientHeight, clientWidth } = container
    const editor = new Editor({
      id: "layerhub_io_canvas",
      config: {
        ...props.config,
        size: {
          width: clientWidth,
          height: clientHeight,
        },
      },
      state: context,
    })

    const resizeObserver = new ResizeObserver((entries) => {
      const { width = clientWidth, height = clientHeight } = (entries[0] && entries[0].contentRect) || {}
      editor.canvas.resize({
        width,
        height,
      })
    })
    resizeObserver.observe(container)
    return () => {
      editor.destroy()
      if (container) {
        resizeObserver.unobserve(container)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div
      id="layerhub_io_canvas_container"
      ref={containerRef}
      style={{ flex: 1, position: "relative", overflow: "hidden", backgroundColor:"white"}}
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor:"black"
        }}
        
      >
        <canvas id="layerhub_io_canvas" ></canvas>
      </div>
    </div>
  )
}
