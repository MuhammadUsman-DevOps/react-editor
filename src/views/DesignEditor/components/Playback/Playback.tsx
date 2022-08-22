import React from "react"
import { Block } from "baseui/block"
import { useEditor, useZoomRatio } from "@layerhub-io/react"
import { useTimer } from "@layerhub-io/use-timer"
import Controller from "./Controler"
import useDesignEditorPages from "~/hooks/useDesignEditorScenes"

const Playback = () => {
  const editor = useEditor()
  const controller = React.useRef<Controller>()
  const frameBoundingRect = editor.frame.getBoundingClientRect()
  const [initialized, setInitialized] = React.useState(false)
  const zoomRatio = useZoomRatio() as number
  const { start } = useTimer()
  const pages = useDesignEditorPages()
  const { time } = useTimer()
  const loadFrames = React.useCallback(async () => {
    const currentTemplate = editor.scene.exportToJSON()

    let refTime = 0
    const templates = pages.map((page) => {
      const currentTemplate = editor.scene.exportToJSON()
      if (page.id === currentTemplate.id) {
        return { ...currentTemplate, duration: page.duration }
      }
      return page
    })

    let clips = []
    for (const template of templates) {
      const layers = await editor.scene.exportLayers(template)
      const timedLayers = layers.map((layer) => {
        return {
          ...layer,
          display: {
            from: refTime,
            to: refTime + template.duration!,
          },
        }
      })
      clips.push({
        duration: template.duration!,
        layers: timedLayers,
      })

      refTime += template.duration!
    }

    const videoTemplate = {
      name: currentTemplate.name,
      frame: currentTemplate.frame,
      clips: clips,
    }

    const layers = await editor.scene.exportLayers(currentTemplate)

    controller.current = new Controller("scenify_playback_container", {
      data: layers,
      template: videoTemplate,
      zoomRatio,
    })
    let interval: any
    interval = setInterval(() => {
      if (controller.current?.initialized) {
        clearInterval(interval)
        setInitialized(true)
      }
    }, 50)
  }, [editor, pages])

  React.useEffect(() => {
    if (initialized && time && controller.current) {
      controller.current.render(time)
    }
  }, [time, initialized, controller])

  React.useEffect(() => {
    if (editor) {
      loadFrames()
    }
  }, [editor])

  React.useEffect(() => {
    if (controller.current && initialized) {
      controller.current!.play()
      start()
    }
  }, [initialized, controller])

  return (
    <Block
      $style={{
        display: "flex",
        flex: 1,
        background: "#f1f2f6",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 4,
      }}
    >
      <Block $style={{ height: "100%", width: "100%", position: "relative" }}>
        <Block
          id="scenify_playback_container"
          $style={{
            flex: 1,
            position: "absolute",
            top: `${frameBoundingRect.top}px`,
            left: `${frameBoundingRect.left}px`,
            zIndex: 1000,
            height: `${frameBoundingRect.height}px`,
            width: `${frameBoundingRect.width}px`,
          }}
        ></Block>
      </Block>
    </Block>
  )
}

export default Playback
