import Scrollbars from "@scenify/react-custom-scrollbar"
import React from "react"

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, position: "relative" }}>
      <div style={{ height: "100%", width: "100%", position: "absolute", overflow: "hidden" }}>
        <Scrollbars>{children}</Scrollbars>
      </div>
    </div>
  )
}
