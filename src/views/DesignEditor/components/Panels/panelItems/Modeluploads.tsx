import React, { useState } from "react"
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
import AWS from "aws-sdk"
import { Buffer } from "buffer"

export default function() {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [uploads, setUploads] = React.useState<any[]>()
  const [s3url, sets3url] = useState("")

  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    const d = new Date()
    let time = d.getTime()
    const file_name = `model_product_${time}.png`
    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let base64String = base64.split(",")[1]

    // Upload the file to S3
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID, secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY, region: import.meta.env.VITE_REGION
    })
    const s3 = new AWS.S3()
    s3.putObject({
      Bucket: import.meta.env.VITE_BUCKET ?? "radiance-sravan", Key: file_name, Body: Buffer.from(base64String, "base64"), ContentType: file.type
    }, (err) => {
      if (err) {
        console.error(err)
      } else {
        // Get the S3 URL for the uploaded object
        const params = { Bucket: import.meta.env.VITE_BUCKET, Key: file_name }
        const input_image_url = s3.getSignedUrl("getObject", params)

        console.log("Image uploaded to S3")
        console.log("S3 URL:", input_image_url)
        sets3url(input_image_url)
      }
    })

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
      type: type
    }
    if (uploads) {
      setUploads([...uploads, upload])
    }
    else {
      setUploads([upload])
    }
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }
  const addImageToCanvas = (props: Partial<ILayer>) => {
    editor?.objects.add(props)
  }
  return (<DropZone handleDropFiles={handleDropFiles}>
      <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Block
          $style={{
            display: "flex", alignItems: "center", fontWeight: 500, justifyContent: "space-between", padding: "1.5rem"
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
                    width: "100%"
                  }
                }
              }}
            >
              Computer
            </Button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />

            <div
              style={{
                marginTop: "1rem", display: "grid", gap: "0.5rem", gridTemplateColumns: "1fr 1fr"
              }}
            >
              {uploads?.map((upload) => (<div
                  key={upload.id}
                  style={{
                    display: "flex", alignItems: "center", cursor: "pointer"
                  }}
                  onClick={() => addImageToCanvas(upload)}
                >
                  <div>
                    <img width="100%" src={upload.preview ? upload.preview : upload.url} alt="preview" />
                  </div>
                </div>))}
            </div>
          </Block>
        </Scrollable>
      </Block>
    </DropZone>)
}

function setCurrentPreview(arg0: string) {
  throw new Error("Function not implemented.")
}

