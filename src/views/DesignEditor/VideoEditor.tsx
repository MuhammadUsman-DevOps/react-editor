import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import Toolbox from "./components/Toolbox"
import { DesignType } from "~/interfaces/DesignEditor"
import { useAppDispatch } from "~/store/store"
import { getUploads } from "~/store/slices/uploads/actions"
import { getPixabayResources } from "~/store/slices/resources/actions"
import useEditorType from "~/hooks/useEditorType"
import SelectEditor from "./SelectEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Preview from "./components/Preview"
import { Block } from "baseui/block"

type CustomTheme = Theme & { extraProp: string }

const Container = styled<"div", {}, CustomTheme>("div", ({ $theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: $theme.colors.white,
  fontFamily: "Uber Move Text",
}))

function VideoEditor() {
  const [designType, setDesignType] = React.useState<DesignType>("GRAPHIC")
  const editorType = useEditorType()
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()

  if (editorType === "NONE") {
    return <SelectEditor />
  }
  return (
    <>
      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}

      <Container>
        <Navbar />
        <div style={{ display: "flex", flex: 1 }}>
          <Panels />
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Toolbox />
            <Canvas />
            <Footer />
          </div>
        </div>
      </Container>
    </>
  )
}

export default VideoEditor
