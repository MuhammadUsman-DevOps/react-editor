import React from "react"
import { useStyletron } from "baseui"
import Add from "~/components/Icons/Add"
import useDesignEditorPages from "~/hooks/useDesignEditorScenes"
import { DesignEditorContext } from "~/contexts/DesignEditor"
import { nanoid } from "nanoid"
import { getDefaultTemplate } from "~/constants/design-editor"
import { useEditor } from "@layerhub-io/react"
import { IScene } from "@layerhub-io/types"
import { Block } from "baseui/block"

export default function () {
  const scenes = useDesignEditorPages()
  const { setScenes, setCurrentScene, currentScene, setCurrentDesign, currentDesign } =
    React.useContext(DesignEditorContext)
  const editor = useEditor()
  const [css] = useStyletron()
  const [currentPreview, setCurrentPreview] = React.useState("")

  React.useEffect(() => {
    if (editor && scenes && currentScene) {
      const isCurrentSceneLoaded = scenes.find((s) => s.id === currentScene?.id)
      if (!isCurrentSceneLoaded) {
        setCurrentScene(scenes[0])
      }
    }
  }, [editor, scenes, currentScene])

  React.useEffect(() => {
    let watcher = async () => {
      const updatedTemplate = editor.scene.exportToJSON()
      const updatedPreview = (await editor.renderer.render(updatedTemplate)) as string
      setCurrentPreview(updatedPreview)
    }
    if (editor) {
      editor.on("history:changed", watcher)
    }
    return () => {
      if (editor) {
        editor.off("history:changed", watcher)
      }
    }
  }, [editor])

  React.useEffect(() => {
    if (editor) {
      if (currentScene) {
        updateCurrentScene(currentScene)
      } else {
        const defaultTemplate = getDefaultTemplate({
          width: 1200,
          height: 1200,
        })
        setCurrentDesign({
          id: nanoid(),
          frame: defaultTemplate.frame,
          metadata: {},
          name: "Untitled Design",
          preview: "",
          scenes: [],
          type: "GRAPHIC",
        })
        editor.scene
          .importFromJSON(defaultTemplate)
          .then(() => {
            const initialDesign = editor.scene.exportToJSON() as any
            editor.renderer.render(initialDesign).then((data) => {
              setCurrentScene({ ...initialDesign, preview: data })
              setScenes([{ ...initialDesign, preview: data }])
            })
          })
          .catch(console.log)
      }
    }
  }, [editor, currentScene])

  const updateCurrentScene = React.useCallback(
    async (design: IScene) => {
      await editor.scene.importFromJSON(design)
      const updatedPreview = (await editor.renderer.render(design)) as string
      setCurrentPreview(updatedPreview)
    },
    [editor, currentScene]
  )

  const addScene = React.useCallback(async () => {
    setCurrentPreview("")

    const updatedTemplate = editor.scene.exportToJSON()
    const updatedPreview = await editor.renderer.render(updatedTemplate)

    const updatedPages = scenes.map((p) => {
      if (p.id === updatedTemplate.id) {
        return { ...updatedTemplate, preview: updatedPreview }
      }
      return p
    })

    const defaultTemplate = getDefaultTemplate(currentDesign.frame)
    const newPreview = await editor.renderer.render(defaultTemplate)
    const newPage = { ...defaultTemplate, id: nanoid(), preview: newPreview } as any
    const newPages = [...updatedPages, newPage] as any[]
    setScenes(newPages)
    setCurrentScene(newPage)
  }, [scenes, currentDesign])

  const changePage = React.useCallback(
    async (page: any) => {
      setCurrentPreview("")
      if (editor) {
        const updatedTemplate = editor.scene.exportToJSON()
        const updatedPreview = await editor.renderer.render(updatedTemplate)

        const updatedPages = scenes.map((p) => {
          if (p.id === updatedTemplate.id) {
            return { ...updatedTemplate, preview: updatedPreview }
          }
          return p
        }) as any[]

        setScenes(updatedPages)
        setCurrentScene(page)
      }
    },
    [editor, scenes, currentScene]
  )

  return (
    <Block
      $style={{
        padding: "0.25rem 0.75rem",
        background: "#ffffff",
      }}
    >
      <Block $style={{ display: "flex", alignItems: "center" }}>
        {scenes.map((page, index) => (
          <div
            style={{
              background: page.id === currentScene?.id ? "rgb(243,244,246)" : "#ffffff",
              padding: "1rem 0.5rem",
            }}
            key={index}
          >
            <div
              onClick={() => changePage(page)}
              className={css({
                cursor: "pointer",
                position: "relative",
                border: page.id === currentScene?.id ? "2px solid #7158e2" : "2px solid rgba(0,0,0,.15)",
              })}
            >
              <img
                style={{ maxWidth: "90px", maxHeight: "80px", display: "flex" }}
                src={currentPreview && page.id === currentScene?.id ? currentPreview : page.preview}
              />
              <div
                className={css({
                  position: "absolute",
                  bottom: "4px",
                  right: "4px",
                  background: "rgba(0,0,0,0.4)",
                  color: "#fff",
                  fontSize: "10px",
                  borderRadius: "2px",
                  height: "16px",
                  width: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                })}
              >
                {index + 1}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            background: "#ffffff",
            padding: "1rem 1rem 1rem 0.5rem",
          }}
        >
          <div
            onClick={addScene}
            className={css({
              width: "100px",
              height: "56px",
              background: "rgb(243,244,246)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            })}
          >
            <Add size={20} />
          </div>
        </div>
      </Block>
    </Block>
  )
}
