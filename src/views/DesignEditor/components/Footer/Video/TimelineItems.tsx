import React from "react"
import { Block } from "baseui/block"
import { DesignEditorContext } from "~/contexts/DesignEditor"
import TimelineItem from "./TimelineItem"
import { useEditor, useFrame } from "@layerhub-io/react"

export default function () {
  const { currentScene, scenes, currentPreview, setCurrentPreview, setScenes } = React.useContext(DesignEditorContext)
  const editor = useEditor()
  const frame = useFrame()

  React.useEffect(() => {
    let watcher = async () => {
      const updatedTemplate = editor.scene.exportToJSON()
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

  const makeResizeTimelineItem = React.useCallback(
    (id: string, props: any) => {
      const updatedItems = scenes.map((scene) => {
        if (scene.id === id) {
          return {
            ...scene,
            duration: props.width * 40,
          }
        }
        return scene
      })

      setScenes(updatedItems)
    },
    [scenes]
  )

  return (
    <Block $style={{ display: "flex" }}>
      {scenes.map((page) => {
        return (
          <TimelineItem
            makeResizeTimelineItem={makeResizeTimelineItem}
            width={page.duration ? page.duration / 40 : 5000 / 40}
            duration={page.duration ? page.duration : 5000}
            height={70}
            key={page.id}
            frame={frame}
            id={page.id}
            preview={currentPreview && page.id === currentScene?.id ? currentPreview : page.preview || ""}
            isCurrentScene={(currentScene && currentScene.id === page.id) || false}
          />
        )
      })}
    </Block>
  )
}

// 125px => 5s
// 25px => 1s

// markerRefPosition.y * 40

// px * 40 === time

// 125 * 40 === 5000
