import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"

import useEditorType from "~/hooks/useEditorType"
import SelectEditor from "./SelectEditor"
import GraphicEditor from "./GraphicEditor"
import PresentationEditor from "./PresentationEditor"
import VideoEditor from "./VideoEditor"

const Container = styled<{}, "div", Theme>("div", ({ $theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: $theme.colors.white,
  fontFamily: "Uber Move Text",
}))

function DesignEditor() {
  const editorType = useEditorType()

  if (editorType === "NONE") {
    return <SelectEditor />
  } else if (editorType === "PRESENTATION") {
    return <PresentationEditor />
  } else if (editorType === "VIDEO") {
    return <VideoEditor />
  } else {
    return <GraphicEditor />
  }
}

export default DesignEditor
