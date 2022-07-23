import React from "react"
import { Block } from "baseui/block"
import { useEditor } from "@scenify/react"
import { useTimer } from "@layerhub-io/use-timer"
import PlaybackController from "./PlaybackControler"

const Playback = () => {
  const editor = useEditor()
  const controller = React.useRef<PlaybackController>()
  const frameBoundingRect = editor.frame.getBoundingClientRect()
  const { time } = useTimer()

  React.useEffect(() => {
    if (editor) {
      console.log("initialized")
      controller.current = new PlaybackController("scenify_playback_container", {
        data: [],
      })
    }
  }, [editor])

  console.log({ frameBoundingRect })
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
    >
      Hello world
    </Block>
  )
}

export default Playback
