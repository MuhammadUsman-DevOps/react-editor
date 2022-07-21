import React from "react"
import { Canvas } from "@scenify/react"

export default function () {
  return (
    <div style={{ flex: 1, display: "flex", padding: "1px" }}>
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
