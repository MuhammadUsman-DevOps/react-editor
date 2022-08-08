import React from "react"
import { styled, ThemeProvider, DarkTheme } from "baseui"
import { Theme } from "baseui/theme"
import { Button, KIND } from "baseui/button"
import Logo from "~/components/Icons/Logo"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Play from "~/components/Icons/Play"
import { Block } from "baseui/block"
import { useEditor } from "@scenify/react"
import useEditorType from "~/hooks/useEditorType"
import useDesignEditorScenes from "~/hooks/useDesignEditorScenes"
import { nanoid } from "nanoid"
import { IDesign } from "@scenify/types"
import { loadTemplateFonts } from "~/utils/fonts"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "64px",
  background: $theme.colors.black,
  display: "flex",
  padding: "0 1rem",
  justifyContent: "space-between",
  alignItems: "center",
}))

interface GraphicEditor {
  name: string
  frame: string
}

interface PresentatinoEditor {
  name: string
  frame: string
  scenes: [
    {
      duration: number
      layers: []
    }
  ]
}

interface Scene {
  duration: number
  layers: []
}

interface VideoEditor {
  id: string
  name: string
  frame: string
  duration: string
  scenes: Scene
}

export default function () {
  const { setDisplayPreview, setScenes } = useDesignEditorContext()
  const editorType = useEditorType()
  const scenes = useDesignEditorScenes()
  const editor = useEditor()
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const parseGraphicJSON = () => {
    const design = editor.design.exportToJSON()
    makeDownload(design)
  }

  const parsePresentationJSON = () => {
    const currentDesign = editor.design.exportToJSON()

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentDesign.id) {
        return {
          duration: 5000,
          layers: currentDesign.layers,
        }
      }
      return {
        duration: 5000,
        layers: scn.layers,
      }
    })

    const template = {
      name: currentDesign.name,
      frame: currentDesign.frame,
      scenes: updatedScenes,
    }
    makeDownload(template)
  }

  const parseVideoJSON = () => {
    const currentDesign = editor.design.exportToJSON()

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentDesign.id) {
        return {
          duration: 5000,
          layers: currentDesign.layers,
        }
      }
      return {
        duration: 5000,
        layers: scn.layers,
      }
    })

    const template = {
      name: currentDesign.name,
      frame: currentDesign.frame,
      scenes: updatedScenes,
    }
    makeDownload(template)
  }

  const makeDownload = (data: Object) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
    const a = document.createElement("a")
    a.href = dataStr
    a.download = "template.json"
    a.click()
  }

  const makeDownloadTemplate = async () => {
    if (editor) {
      if (editorType === "GRAPHIC") {
        return parseGraphicJSON()
      } else if (editorType === "PRESENTATION") {
        return parsePresentationJSON()
      } else {
        return parseVideoJSON()
      }
    }
  }

  const handleImportTemplate = React.useCallback(
    async (data: any) => {
      const scenes = []
      for (const scene of data.scenes) {
        const design: IDesign = {
          name: "Awesome template",
          frame: data.frame,
          id: nanoid(),
          layers: scene.layers,
          metadata: {},
        }

        const preview = (await editor.renderer.render(design)) as string
        await loadTemplateFonts(design)
        scenes.push({ ...design, preview })
      }
      setScenes(scenes)
    },
    [editor]
  )

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (res) => {
        const result = res.target!.result as string
        const design = JSON.parse(result)
        handleImportTemplate(design)
      }
      reader.onerror = (err) => {
        console.log(err)
      }

      reader.readAsText(file)
    }
  }

  return (
    // @ts-ignore
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ color: "#ffffff" }}>
          <Logo size={36} />
        </div>
        <Block $style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            multiple={false}
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFileRef}
            style={{ display: "none" }}
          />
          <Button
            size="compact"
            onClick={handleInputFileRefClick}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Import
          </Button>

          <Button
            size="compact"
            onClick={makeDownloadTemplate}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            Export
          </Button>
          <Button
            size="compact"
            onClick={() => setDisplayPreview(true)}
            kind={KIND.tertiary}
            overrides={{
              StartEnhancer: {
                style: {
                  marginRight: "4px",
                },
              },
            }}
          >
            <Play size={24} />
          </Button>
        </Block>
      </Container>
    </ThemeProvider>
  )
}
