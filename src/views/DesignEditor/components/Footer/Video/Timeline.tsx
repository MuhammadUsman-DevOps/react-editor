import React from "react"
import { useStyletron } from "baseui"
import Add from "~/components/Icons/Add"
import { DesignEditorContext } from "~/contexts/DesignEditor"
import { nanoid } from "nanoid"
import { defaultTemplate } from "~/constants/design-editor"
import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { useTimer } from "@layerhub-io/use-timer"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { IDesign } from "@layerhub-io/types"
import TimelineItems from "./TimelineItems"
import TimeMarker from "./TimeMarker"
import TimelineControl from "./TimelineControl"

const SCALE_FACTOR = 1

export default function () {
  const { time, setTime, pause, status } = useTimer()
  const { setScenes, setCurrentScene, currentScene, scenes, setCurrentPreview, maxTime, setMaxTime } =
    React.useContext(DesignEditorContext)
  const { setDisplayPlayback } = useDesignEditorContext()
  const editor = useEditor()
  const [css] = useStyletron()
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  })

  React.useEffect(() => {
    let watcher = async () => {
      const updatedTemplate = editor.design.exportToJSON()
      const updatedPreview = (await editor.renderer.render(updatedTemplate)) as any
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
        editor.design
          .importFromJSON(defaultTemplate)
          .then(() => {
            // SET INITIAL DURATION
            const initialDesign = editor.design.exportToJSON() as any
            editor.renderer.render(initialDesign).then((data) => {
              setCurrentScene({ ...initialDesign, preview: data, duration: 5000 })
              setScenes([{ ...initialDesign, preview: data, duration: 5000 }])
            })
          })
          .catch(console.log)
      }
    }
  }, [editor, currentScene])

  const updateCurrentScene = React.useCallback(
    async (design: IDesign) => {
      await editor.design.importFromJSON(design)
      const updatedPreview = (await editor.renderer.render(design)) as string
      setCurrentPreview(updatedPreview)
    },
    [editor, currentScene]
  )

  const addScene = React.useCallback(async () => {
    setCurrentPreview("")
    const updatedTemplate = editor.design.exportToJSON()
    const updatedPreview = await editor.renderer.render(updatedTemplate)

    const updatedPages = scenes.map((p) => {
      if (p.id === updatedTemplate.id) {
        return { ...updatedTemplate, preview: updatedPreview, duration: p.duration }
      }
      return p
    })

    const maxTime = scenes.reduce(function (previousVal, currentValue) {
      return previousVal + currentValue.duration!
    }, 0)

    const newPreview = await editor.renderer.render(defaultTemplate)
    const newPage = { ...defaultTemplate, id: nanoid(), preview: newPreview, duration: 5000 } as any
    const newPages = [...updatedPages, newPage] as any[]
    setScenes(newPages)
    setTime(maxTime)
  }, [scenes])

  const changePage = React.useCallback(
    async (page: any) => {
      setCurrentPreview("")
      if (editor) {
        const updatedTemplate = editor.design.exportToJSON()
        const updatedPreview = await editor.renderer.render(updatedTemplate)

        const updatedPages = scenes.map((p) => {
          if (p.id === updatedTemplate.id) {
            return { ...updatedTemplate, preview: updatedPreview, duration: p.duration }
          }
          return p
        }) as any[]
        setScenes(updatedPages)
        setCurrentScene(page)
      }
    },
    [editor, scenes, currentScene]
  )
  const findSceneIndexByTime = (scenes: IDesign[], time: number) => {
    let currentIndex = 0
    let timeProgress = 0

    for (const scene of scenes) {
      if (scene.duration! > time - timeProgress) {
        return currentIndex
      }
      timeProgress += scene.duration!
      currentIndex += 1
    }
    return currentIndex
  }

  React.useEffect(() => {
    if (editor && scenes && currentScene && status !== "RUNNING") {
      const currentSceneIndex = findSceneIndexByTime(scenes, time)
      const currentIndex = scenes.findIndex((page) => page.id === currentScene.id)
      if (currentSceneIndex !== currentIndex && scenes[currentSceneIndex]) {
        changePage(scenes[currentSceneIndex])
      }
    }
  }, [editor, scenes, time, currentScene, status])

  return (
    <Block $style={{ display: "flex", alignItems: "center" }}>
      <TimelineControl />
      <Block $style={{ background: "#ffffff" }}>
        <div className={css({ display: "flex", alignItems: "center" })}>
          <Block $style={{ display: "flex", alignItems: "center", position: "relative", flex: 1 }}>
            <Block $style={{ display: "flex", alignItems: "center", position: "relative", padding: "1rem 0" }}>
              <TimeMarker />
              <TimelineItems />
            </Block>
          </Block>
          <div
            style={{
              background: "#ffffff",
            }}
          >
            <Block
              onClick={addScene}
              $style={{
                width: "100px",
                height: "56px",
                background: "rgb(243,244,246)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Add size={20} />
            </Block>
          </div>
        </div>
      </Block>
    </Block>
  )
}
