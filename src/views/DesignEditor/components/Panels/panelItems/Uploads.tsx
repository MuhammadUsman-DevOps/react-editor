import React from "react"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { Button, SIZE } from "baseui/button"
import DropZone from "~/components/Dropzone"
import { useAppDispatch } from "~/store/store"
import { setUploading, uploadFile } from "~/store/slices/uploads/actions"
import { useSelector } from "react-redux"
import { selectUploading, selectUploads } from "~/store/slices/uploads/selectors"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"

export default function () {
  const [currentFile, setCurrentFile] = React.useState<any>(null)
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const uploading = useSelector(selectUploading)
  const uploads = useSelector(selectUploads)
  const editor = useEditor()
  const dispatch = useAppDispatch()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const handleDropFiles = (files: FileList) => {
    const file = files[0]
    handleUploadFile(file)
    const reader = new FileReader()
    reader.addEventListener(
      "load",
      function () {
        setCurrentFile(reader.result)
      },
      false
    )

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleUploadFile = async (file: File) => {
    try {
      dispatch(
        setUploading({
          progress: 0,
          status: "IN_PROGRESS",
        })
      )
      dispatch(uploadFile({ file: file }))
    } catch (err) {
      console.log({ err })
    }
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const addImageToCanvas = (url: string) => {
    const options = {
      type: "StaticImage",
      src: url,
    }
    editor.objects.add(options)
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
              {uploading && <img width="100%" src={currentFile} alt="uploaded" />}

              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => addImageToCanvas(upload.url)}
                >
                  <div>
                    <img width="100%" src={upload.url} alt="preview" />
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
