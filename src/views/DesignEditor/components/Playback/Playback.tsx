import React from "react"
import { Block } from "baseui/block"
import { useEditor, useZoomRatio } from "@scenify/react"
import { useTimer } from "@layerhub-io/use-timer"
import PlaybackController from "./PlaybackControler"
import useDesignEditorPages from "~/hooks/useDesignEditorPages"

const Playback = () => {
  const editor = useEditor()
  const controller = React.useRef<PlaybackController>()
  const frameBoundingRect = editor.frame.getBoundingClientRect()
  const [initialized, setInitialized] = React.useState(false)
  const zoomRatio = useZoomRatio() as number
  const { start } = useTimer()
  const pages = useDesignEditorPages()

  const loadFrames = React.useCallback(async () => {
    const layers = await editor.design.exportLayers()
    console.log({ layers })
    // console.log({ pages })
    controller.current = new PlaybackController("scenify_playback_container", {
      data: layers,
      zoomRatio,
    })
    let interval: any
    interval = setInterval(() => {
      if (controller.current?.initialized) {
        clearInterval(interval)
        setInitialized(true)
      }
    }, 1000)
  }, [editor, pages])

  React.useEffect(() => {
    if (editor) {
      loadFrames()
    }
  }, [editor])

  React.useEffect(() => {
    if (controller.current && initialized) {
      controller.current!.play()
      start()
    }
  }, [initialized, controller])

  return (
    <Block
      $style={{
        display: "flex",
        flex: 1,
        background: "#f1f2f6",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 4,
      }}
    >
      <Block $style={{ height: "100%", width: "100%", position: "relative" }}>
        <Block
          id="scenify_playback_container"
          $style={{
            flex: 1,
            position: "absolute",
            top: `${frameBoundingRect.top}px`,
            left: `${frameBoundingRect.left}px`,
            zIndex: 1000,
            height: `${frameBoundingRect.height}px`,
            width: `${frameBoundingRect.width}px`,
          }}
        ></Block>
      </Block>
    </Block>
  )
}

export default Playback
