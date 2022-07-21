import React from "react"
import { Modal, ROLE, SIZE } from "baseui/modal"
import { ThemeProvider, LightTheme } from "baseui"
import { useEditor } from "@scenify/react"

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ({ isOpen, setIsOpen }: Props) {
  const editor = useEditor()
  const [previewImage, setPreviewImage] = React.useState<any>(null)

  const renderImage = async () => {
    const template = editor.design.exportToJSON()
    const image = await editor.renderer.render(template)
    setPreviewImage(image)
  }
  React.useEffect(() => {
    renderImage()
  }, [])
  return (
    <ThemeProvider theme={LightTheme}>
      <Modal
        onClose={() => setIsOpen(false)}
        closeable={true}
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.auto}
        role={ROLE.dialog}
        overrides={{
          Close: {
            component: () => null,
          },
          Dialog: {
            style: {
              borderTopRightRadius: "8px",
              borderEndStartRadius: "8px",
              borderEndEndRadius: "8px",
              borderStartEndRadius: "8px",
              borderStartStartRadius: "8px",
              padding: "0.5rem",
            },
          },
        }}
      >
        <img style={{ maxWidth: "1200px" }} src={previewImage} alt="preview" />
      </Modal>
    </ThemeProvider>
  )
}
