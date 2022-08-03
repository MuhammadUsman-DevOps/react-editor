import React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from "baseui/modal"
import useEditorType from "~/hooks/useEditorType"
import { useEditor } from "@scenify/react"
import { Block } from "baseui/block"
import { Button } from "baseui/button"
import Loading from "~/components/Loading"
import Video from "./Video"
import Presentation from "./Presentation"
import Graphic from "./Graphic"

interface ComponentProps {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}
export default function ({ isOpen, setIsOpen }: ComponentProps) {
  const editorType = useEditorType()
  // const editor = useEditor()
  // const [preview, setPreview] = React.useState<string>("")

  // const makeVideoPreview = React.useCallback(async () => {
  //   const template = editor.design.exportToJSON()
  //   const options = {
  //     outPath: "./position.mp4",
  //     verbose: false,
  //     duration: 5,
  //     fps: 25,
  //     dimension: template.frame,
  //     clips: [
  //       {
  //         duration: 5,
  //         layers: template.layers,
  //       },
  //     ],
  //   }

  //   fetch("https://render.layerhub.io/render", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(options),
  //   })
  //     .then((res) => {
  //       return res.blob()
  //     })
  //     .then((blob) => {
  //       const element = window.URL.createObjectURL(blob)
  //       setPreview(element)
  //     })
  //     .catch((err) => console.error(err))
  // }, [editor])

  // const makeGraphicPreview = React.useCallback(async () => {
  //   const template = editor.design.exportToJSON()
  //   const image = (await editor.renderer.render(template)) as string
  //   setPreview(image)
  // }, [editor])

  // const makeDownload = React.useCallback(() => {
  //   if (preview) {
  //     const a = document.createElement("a")
  //     a.href = preview
  //     a.download = "drawing.png"
  //     a.click()
  //   }
  // }, [preview])

  // React.useEffect(() => {
  //   if (editor) {
  //     if (editorType === "GRAPHIC") {
  //       makeGraphicPreview()
  //     } else if (editorType === "VIDEO") {
  //       makeVideoPreview()
  //     }
  //   }
  // }, [editor, editorType])

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.full}
      role={ROLE.dialog}
      overrides={{
        Root: {
          style: {
            zIndex: 5,
          },
        },
        Dialog: {
          style: {
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      }}
    >
      <ModalBody
        $style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          height: "100%",
          position: "relative",
        }}
      >
        <Block
          $style={{
            position: "absolute",
            flex: 1,
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        >
          {
            {
              video: <Video />,
            }[editorType]
          }
        </Block>
      </ModalBody>
    </Modal>
  )
}
