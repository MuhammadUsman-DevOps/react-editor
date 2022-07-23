import React from "react"
import { Canvas } from "@scenify/react"
import Playback from "../Playback"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"

export default function () {
  const { displayPlayback } = useDesignEditorContext()
  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      {displayPlayback && <Playback />}
      <Canvas
        config={{
          background: "#f1f2f6",
          controlsPosition: {
            rotation: "BOTTOM",
          },
          shadow: {
            blur: 8,
            color: "#ced6e0",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </div>
  )
}
