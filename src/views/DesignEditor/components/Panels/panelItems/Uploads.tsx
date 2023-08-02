import React from "react"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { Button, SIZE } from "baseui/button"
import DropZone from "~/components/Dropzone"
import { useEditor } from "~/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { nanoid } from "nanoid"
import { captureFrame, loadVideoResource } from "~/utils/video"
import { ILayer } from "~/types/"
import { toBase64 } from "~/utils/data"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { getDefaultTemplate } from "~/constants/design-editor"

export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const temp = {
    id: nanoid(),
    src: "https://i.ibb.co/TKx8vNN/bottle-Asset.png",
    preview: "https://i.ibb.co/TKx8vNN/bottle-Asset.png",
    type: "StaticImage",
  }
  const {
    scenes,
    setScenes,
    setContextMenuTimelineRequest,
    contextMenuTimelineRequest,
    setCurrentScene,
    setCurrentDesign,
  } = useDesignEditorContext()
  
  const [uploads, setUploads] = React.useState<any[]>([temp])
  
  
  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    
    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64
    if (isVideo) {
      const video = await loadVideoResource(base64)
      const frame = await captureFrame(video)
      preview = frame
    }
    
    const type = isVideo ? "StaticVideo" : "StaticImage"
    
    
    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      type: type,
    }
          setUploads([...uploads, upload])
        }  
        
        const handleInputFileRefClick = () => {
          inputFileRef.current?.click()
        }
        
        const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
          handleDropFiles(e.target.files!)
        }
// not necessary uploadded image will not be added to the canavas



        // const addScene = React.useCallback(async () => {
        //   // console.log("adding")
          
        //   setCurrentPreview("")
        //   const updatedTemplate = editor?.scene.exportToJSON()
        //   const updatedPreview = await editor?.renderer.render(updatedTemplate??scenes[0])
        //   const updatedPages = scenes.map((p) => {
        //     if (p.id === updatedTemplate?.id) {
        //       return { ...updatedTemplate, preview: updatedPreview }
        //     }
        //     return p
        //   })
        //   const defaultTemplate = getDefaultTemplate(setCurrentScene.frame)
        //   const newPreview = await editor?.renderer.render(defaultTemplate)
        //   const newPage = { ...defaultTemplate, id: nanoid(), preview: newPreview } as any
        //   const newPages = [...updatedPages, newPage] as any[]
        //   setScenes(newPages)
        //   setCurrentScene(newPage)
       // }, [scenes, setCurrentDesign])
        const addImageToCanvas = (props: Partial<ILayer>) => {
          editor?.objects.add(props)
          const currentScene = scenes.find((scene) => scene.id === contextMenuTimelineRequest.id)
    const updatedScenes = [...scenes, { ...currentScene, id: nanoid() }]
    //  @ts-ignore
    setScenes(updatedScenes)
    setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false })
        }
        return (
          <DropZone handleDropFiles={handleDropFiles}>
      <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Block
          $style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            justifyContent: "space-between",
            padding: "1.5rem",
          }}
          >
          <Block>Uploads</Block>

          <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
            <AngleDoubleLeft size={18} />
          </Block>
        </Block>
        <Scrollable>
          <Block padding={"0 1.5rem"}>
            <Button
              onClick={handleInputFileRefClick}
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                  },
                },
              }}
            >
              Computer
            </Button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />

            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => addImageToCanvas(upload)}
                >
                  <div>
                    <img width="100%" src={upload.preview ? upload.preview : upload.url} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </Block>
        </Scrollable>
      </Block>
    </DropZone>
  )
}
function setCurrentPreview(arg0: string) {
  throw new Error("Function not implemented.")
}

