import React from "react"
import { Block } from "baseui/block"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { nanoid } from "nanoid"
import useOnClickOutside from "~/hooks/useOnClickOutside"
import { findSceneIndexByTime, getMaxTime } from "~/views/DesignEditor/utils/scenes"
import { useTimer } from "@layerhub-io/use-timer"

export default function () {
  const { time, setTime } = useTimer()
  const { scenes, setScenes, setContextMenuTimelineRequest, contextMenuTimelineRequest, currentScene } =
    useDesignEditorContext()
  const ref = React.useRef<HTMLDivElement | null>(null)

  useOnClickOutside(ref, () => {
    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false })
  })

  const timelineItemsContainerBounds = document.getElementById("TimelineItemsContainer")?.getBoundingClientRect() || {
    top: 0,
    left: 0,
  }

  const makeDeleteScene = () => {
    const updatedScenes = scenes.filter((scene) => scene.id !== contextMenuTimelineRequest.id)

    const sceneIndexInTime = findSceneIndexByTime(updatedScenes, time)
    // Adjust time if deleted scene is current scene
    if (sceneIndexInTime < 0) {
      const maxTime = getMaxTime(updatedScenes)
      setTime(maxTime - 1)
    }
    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false })
    setScenes(updatedScenes)
  }

  const makeAddScene = () => {}

  const makeDuplicateScene = () => {
    const currentScene = scenes.find((scene) => scene.id === contextMenuTimelineRequest.id)
    const updatedScenes = [...scenes, { ...currentScene, id: nanoid() }]
    //  @ts-ignore
    setScenes(updatedScenes)
    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false })
  }

  return (
    <Block
      ref={ref}
      $style={{
        width: "160px",
        position: "absolute",
        background: "#ffffff",
        boxShadow: "0 0 0 1px rgba(64,87,109,0.07),0 2px 12px rgba(53,71,90,0.2)",
        zIndex: 4,
        top: `${contextMenuTimelineRequest.top - timelineItemsContainerBounds.top - 80}px`,
        left: `${contextMenuTimelineRequest.left - timelineItemsContainerBounds.left}px`,
        padding: "0.5rem 0",
      }}
    >
      <Block
        onClick={makeDuplicateScene}
        $style={{
          fontSize: "14px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          padding: "0 1rem",
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
            cursor: "pointer",
          },
        }}
      >
        Duplicate Scene
      </Block>
      <Block
        onClick={makeDeleteScene}
        $style={{
          fontSize: "14px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          padding: "0 1rem",
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
            cursor: "pointer",
          },
        }}
      >
        Delete Scene
      </Block>
    </Block>
  )
}
