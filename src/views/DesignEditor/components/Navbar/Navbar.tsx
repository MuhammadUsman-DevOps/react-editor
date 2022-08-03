import React from "react"
import { styled, ThemeProvider, DarkTheme } from "baseui"

import { Theme } from "baseui/theme"
import { Button, KIND } from "baseui/button"
import Logo from "~/components/Icons/Logo"
import PreviewModal from "./PreviewModal"
import Download from "~/components/Icons/Download"
import { useEditor } from "@scenify/react"
import useEditorType from "~/hooks/useEditorType"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "flex",
  padding: "0 1rem",
  justifyContent: "space-between",
  alignItems: "center",
}))

export default function () {
  const { setDisplayPreview } = useDesignEditorContext()

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
          onClick={() => setDisplayPreview(true)}
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
      </Container>
    </ThemeProvider>
  )
}
