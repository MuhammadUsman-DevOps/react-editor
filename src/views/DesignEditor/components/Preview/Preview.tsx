import React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from "baseui/modal"
import useEditorType from "~/hooks/useEditorType"
import { useEditor } from "@scenify/react"
import { Block } from "baseui/block"
import { Button } from "baseui/button"

interface ComponentProps {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}
export default function ({ isOpen, setIsOpen }: ComponentProps) {
  const editorType = useEditorType()
  const editor = useEditor()
  const [preview, setPreview] = React.useState<string>("")

  const makePreview = React.useCallback(async () => {
    const template = editor.design.exportToJSON()
    const image = (await editor.renderer.render(template)) as string
    setPreview(image)
  }, [editor])

  const makeDownload = React.useCallback(() => {
    if (preview) {
      const a = document.createElement("a")
      a.href = preview
      a.download = "drawing.png"
      a.click()
    }
  }, [preview])

  React.useEffect(() => {
    if (editor) {
      makePreview()
    }
  }, [editor])

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
        }}
      >
        <Block
          $style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {preview && <img style={{ maxHeight: "680px" }} src={preview} />}
        </Block>
        <Block
          $style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "120px",
          }}
        >
          <Button onClick={makeDownload}>Download</Button>
        </Block>
      </ModalBody>
    </Modal>
  )
}
