import React from "react"
import { styled, ThemeProvider, DarkTheme } from "baseui"
import { Theme } from "baseui/theme"
import { Button, KIND } from "baseui/button"
import Logo from "~/components/Icons/Logo"
import PreviewModal from "./PreviewModal"
import Download from "~/components/Icons/Download"
import { useEditor } from "@scenify/react"
const Container = styled<{}, "div", Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "flex",
  padding: "0 1rem",
  justifyContent: "space-between",
  alignItems: "center",
}))

export default function () {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const editor = useEditor()

  const handleDownloadImage = async () => {
    const template = editor.design.exportToJSON()
    const image = await editor.renderer.render(template)
    const a = document.createElement("a")
    a.href = image
    a.download = "drawing.png"
    a.click()
  }
  return (
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ color: "#ffffff" }}>
          <Logo size={36} />
        </div>
        <Button
          startEnhancer={<Download size={24} />}
          size="compact"
          onClick={handleDownloadImage}
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
