import React from "react"
import { styled, ThemeProvider, DarkTheme } from "baseui"

import { Theme } from "baseui/theme"
import { Button, KIND } from "baseui/button"
import Logo from "~/components/Icons/Logo"
import PreviewModal from "./PreviewModal"
import Download from "~/components/Icons/Download"
import { useEditor } from "@scenify/react"
import useEditorType from "~/hooks/useEditorType"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "flex",
  padding: "0 1rem",
  justifyContent: "space-between",
  alignItems: "center",
}))

export default function () {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const editorType = useEditorType()
  const editor = useEditor()
  const [video, setVideo] = React.useState<string | null>(null)

  const handleDownload = async () => {
    if (editorType === "VIDEO") {
      const template = editor.design.exportToJSON()
      const options = {
        outPath: "./position.mp4",
        verbose: false,
        duration: 5,
        fps: 25,
        dimension: template.frame,
        clips: [
          {
            duration: 5,
            layers: template.layers,
          },
        ],
      }

      // console.log({ objects })
      fetch("https://render.layerhub.io/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      })
        .then((res) => {
          return res.blob()
        })
        .then((blob) => {
          const element = window.URL.createObjectURL(blob)
          // console.log({ element })
          const a = document.createElement("a")
          // @ts-ignore
          a.href = element
          a.download = "drawing.mp4"
          a.click()
          setVideo(element)
        })
        .catch((err) => console.error(err))
    } else {
      const template = editor.design.exportToJSON()
      const image = (await editor.renderer.render(template)) as string
      const a = document.createElement("a")
      a.href = image
      a.download = "drawing.png"
      a.click()
    }
  }

  return (
    // @ts-ignore
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ color: "#ffffff" }}>
          <Logo size={36} />
        </div>
        <Button
          startEnhancer={<Download size={24} />}
          size="compact"
          onClick={handleDownload}
          kind={KIND.primary}
          overrides={{
            StartEnhancer: {
              style: {
                marginRight: "4px",
              },
            },
          }}
        >
          Download
        </Button>
        {isPreviewOpen && <PreviewModal isOpen={isPreviewOpen} setIsOpen={setIsPreviewOpen} />}
      </Container>
    </ThemeProvider>
  )
}
