import React from "react"
import { Block } from "baseui/block"
import { useEditor } from "@scenify/react"
import { useTimer } from "@layerhub-io/use-timer"
import PlaybackController from "./PlaybackControler"

const Playback = () => {
  const editor = useEditor()
  const controller = React.useRef<PlaybackController>()
  const frameBoundingRect = editor.frame.getBoundingClientRect()
  const [initialized, setInitialized] = React.useState(false)

  const { time, start } = useTimer()

  const loadFrames = React.useCallback(async () => {
    const layers = await editor.design.exportLayers()
    controller.current = new PlaybackController("scenify_playback_container", {
      data: layers,
    })
    // console.log({ layers })
    // console.log(controller.current?.initialized)
    setTimeout(() => {
      // console.log(controller.current?.initialized)
      setInitialized(true)
    }, 1000)
  }, [editor])

  React.useEffect(() => {
    if (editor) {
      console.log("initialized")
      loadFrames()
      // console.log({ layers })
    }
  }, [editor])

  React.useEffect(() => {
    if (controller.current && initialized) {
      // console.log("")
      controller.current!.play()
      start()
    }
  }, [initialized, controller])

  return (
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
  )
}

export default Playback
