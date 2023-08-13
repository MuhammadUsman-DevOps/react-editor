import React, { useEffect, useState } from "react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { useEditor } from "~/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { Button, SIZE } from "baseui/button"
import "./images.css"
import { nanoid } from "nanoid"
import { captureFrame, loadVideoResource } from "~/utils/video"
import { toBase64 } from "~/utils/data"
import DropZone from "~/components/Dropzone"
import { getDefaultTemplate } from "~/constants/design-editor"
import { IDesign } from "~/interfaces/DesignEditor"
import AWS from "aws-sdk"
import axios from "axios"
import useEditorType from "~/hooks/useEditorType"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { promisify } from "util"
import { Buffer } from "buffer"


const Shiftimages = (props: any) => {
  const [input, setInput] = useState("")
  const [artStyle, setartStyle] = useState("")
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [mode, setMode] = useState("Style")
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const editor = useEditor()
  const [uploads, setUploads] = React.useState<any[]>()
  const editorType = useEditorType()
  const [images3url, setImages3url] = useState("")
  const [styleImages3url, setStyleImages3url] = useState("")
  const {
    scenes,
    setScenes,
    setContextMenuTimelineRequest,
    contextMenuTimelineRequest,
    setCurrentScene,
    currentDesign,
    setCurrentDesign
  } = useDesignEditorContext()

  // adding the new slide for every new generation
  const addScene = React.useCallback(async (gen_image_url: string) => {
    console.log("adding")

    const updatedTemplate = editor?.scene.exportToJSON() //first the json form is exported
    const updatedPreview = await editor?.renderer.render(updatedTemplate ?? scenes[0]) //the preview if of the file is then added to the time line
    const updatedPages = scenes.map((p) => {
      if (p.id === updatedTemplate?.id) {
        return { ...updatedTemplate, preview: updatedPreview }
      }
      return p
    })///the states of the every member in the time line is updated
    const defaultTemplate = getDefaultTemplate(scenes[0].frame)//the last frame size is taken whic is going to be maintianed as a template
    const newPreview = await editor?.renderer.render(defaultTemplate) //the new previw is added and referesed or rendred
    const newPage = { ...defaultTemplate, id: nanoid(), preview: newPreview } as any
    const newPages = [...updatedPages, newPage] as any[] ///the list is updated with the newpage
    //rendering the updates on the screen using hooks
    setScenes(newPages)
    setCurrentScene(newPage)
    addObject(gen_image_url)

  }, [scenes, setCurrentDesign])

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )

  const convertJSON = () => {
    console.log("convert to json")
    const currentScene = editor?.scene.exportToJSON()

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene?.id) {
        return {
          id: currentScene.id,
          layers: currentScene.layers,
          name: currentScene.name
        }
      }
      return {
        id: scn.id,
        layers: scn.layers,
        name: scn.name
      }
    })

    if (currentDesign) {
      // @ts-ignore
      const graphicTemplate: IDesign = {
        id: currentDesign.id,
        type: "PRESENTATION",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        previews: []
      }
      console.log(graphicTemplate)
      const dataObject = {
        prompt: input,
        "image_url": "",
        canvas: currentDesign
      }

      /*
      const headers = {
        "Content-Type": "application/json"
      }

      axios.post("http://localhost:3000/productImage", dataObject, { headers })
        .then((response) => {
          console.log(response.data)
          const imageUrl = response.data?.canavas?.scenes[0]?.layers[0]?.src
          addObject(imageUrl)
        })
        .catch((error) => {
          console.error(error)
        })*/
    } else {
      console.log("NO CURRENT DESIGN")
    }
  }

  const handleGenerate = (callback: any) => {
    if (editor) {
      if (editorType === "PRESENTATION") {
        convertJSON()
      }

      const canvas = document.getElementById(editor.canvasId)
      // @ts-ignore
      const dataURL = canvas?.toDataURL("image/png")
      console.log("Button Clicked")
      AWS.config.update({
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        region: import.meta.env.VITE_REGION
      })
      // Convert data URL to Blob
      fetch(dataURL)
        .then((res) => res.blob())
        .then((blob) => {
          // Create a File object from the Blob
          const d = new Date()
          let time = d.getTime()
          let file_name = `style_canvas_${time}.png`
          const file = new File([blob], file_name, { type: "image/png" })
          // Upload the file to S3
          const s3 = new AWS.S3()
          s3.putObject({
            Bucket: import.meta.env.VITE_BUCKET ?? "radiance-sravan",
            Key: file_name,
            Body: file,
            ContentType: "image/png"
          }, (err) => {
            if (err) {
              console.error(err)
            } else {
              // Get the S3 URL for the uploaded object
              const params = { Bucket: import.meta.env.VITE_BUCKET, Key: file_name }
              const input_image_url = s3.getSignedUrl("getObject", params)

              console.log("Image uploaded to S3")
              console.log("S3 URL:", input_image_url)
              setImages3url(input_image_url)
              callback()
            }
          })
        })
        .catch((error) => {
          console.error("Error converting data URL to image file:", error)
        })
    }
  }

  const postToApi = () => {
    const dataObject = {
      "prompt": input,
      "image_url": images3url,
      "style_image_url": styleImages3url,
      "mode": mode
    }
    const headers = {
      "Content-Type": "application/json", // Specify the content type of the request body
      "Accept": "*/*"
      // Add any other headers as needed
    }

    let backendurl = `${import.meta.env.VITE_RADIANCE_BACKEND_URL}/styletransfer`
    axios.post(backendurl, dataObject, { headers })
      .then((response) => {
        // Handle success
        //addObject(response.data.gen_image_url)
        console.log(response.data.gen_image_url)
        const currentScene = scenes.find((scene) => scene.id === contextMenuTimelineRequest.id)
        const updatedScenes = [...scenes, { ...currentScene, id: nanoid() }]
        //  @ts-ignore
        setScenes(updatedScenes)
        setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false })

        addScene(response.data.gen_image_url)

      })
      .catch((error) => {
        // Handle error
        console.error(error)
      })


    console.log("downloading")
  }

  /*
   const base64ImageToS3Url = async (imageData: string): Promise<string> => {
    try {
      const s3: AWS.S3 = new AWS.S3({
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        region: import.meta.env.VITE_REGION
      })

      const imageName: string = "test.jpeg"
      const base64Data: Buffer = Buffer.from(imageData, 'base64')

      const uploadParams = {
        Bucket: import.meta.env.VITE_BUCKET ?? "radiance-sravan",
        Key: imageName,
        Body: base64Data,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      }

      const s3Upload = promisify(s3.upload).bind(s3)
      const data: AWS.S3.ManagedUpload.SendData = await s3Upload(uploadParams)

      console.log('Image uploaded successfully.')
      return data.Location
    } catch (error) {
      console.error('Error base64ImageToS3Url:', error)
      throw error
    }
  }
*/
  const handleDropFiles = async (files: FileList) => {
    const file = files[0]
    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64

    const d = new Date()
    let time = d.getTime()
    const file_name = `style_style_${time}.png`

    var base64String = base64.split(',')[1];

    // Upload the file to S3
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      region: import.meta.env.VITE_REGION
    })
    const s3 = new AWS.S3()
    s3.putObject(
      {
        Bucket: import.meta.env.VITE_BUCKET ?? "radiance-sravan",
        Key: file_name,
        Body: Buffer.from(base64String, 'base64'),
        ContentType: file.type
      },
      (err) => {
        if (err) {
          console.error(err)
        } else {
          // Get the S3 URL for the uploaded object
          const params = { Bucket: import.meta.env.VITE_BUCKET, Key: file.name }
          const input_style_image_url = s3.getSignedUrl("getObject", params)

          console.log("Image uploaded to S3")
          console.log("S3 URL:", input_style_image_url)
          setStyleImages3url(input_style_image_url)
        }
      })

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
    setUploads([upload])
  }
  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }
  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <textarea value={input} placeholder="Enter your prompt or choose from below"
                onChange={e => setInput(e.target.value)}
                style={{ display: "flex", flexDirection: "column", padding: "10px", margin: "10px 15px 10px 10px", fontSize: 15, fontFamily: "sans-serif" }} />
      <Button style={{ margin: "20px" }} onClick={() => handleGenerate(postToApi)}>Generate</Button>
      <textarea value={artStyle} placeholder="Select Style from below" onChange={e => setInput(e.target.value)}
                style={{ display: "flex", flexDirection: "column", padding: "10px", margin: "10px 15px 10px 10px", fontSize: 15, fontFamily: "sans-serif" }} />
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem"
        }}
      >
        <Block>Select Style</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      {/* <Scrollable> */}
      <Block padding="0 1.5rem" paddingBottom="30px">
        <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr" }}>
          <div className="tooltip" onClick={() => {
            setInput("Colourfull Image of cat from head to neck looking to the right"), setartStyle("Oil Painting")
          }}>
            <ImageItem preview={"https://i.ebayimg.com/images/g/iYMAAOSw269jXD2D/s-l1600.jpg"} />
            <span className="tooltiptext"><span style={{ color: "red" }}>{"{Oil painting}"}</span>{" of a cat"}</span>
          </div>
          <div className="tooltip" onClick={() => {
            setInput("Colourfull Image of cat from head to neck looking to the right"), setartStyle("Digital Art")
          }}>
            <ImageItem preview={"https://artsi.ai/wp-content/uploads/2023/03/Animal-design-4096px-1-2.png"} />
            <span className="tooltiptext"><span style={{ color: "red" }}>{"{Digital art}"}</span>{"of cat"}</span>
          </div>
        </div>
      </Block>
      {/* </Scrollable> */}
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem"
        }}
      >
        <Block>Select Mode</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <select value={mode} onChange={e => setMode(e.target.value)}
              style={{ display: "flex", alignContent: "center", alignItems: "center", margin: "20px 20px 0px 20px", padding: "15px", fontSize: "20px" }}>
        <option>Style</option>
        <option>Colour</option>
        <option>Style + Colour</option>
      </select>
      <DropZone handleDropFiles={handleDropFiles}>
        <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Block
            $style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              justifyContent: "space-between",
              padding: "1.5rem"
            }}
          >
          </Block>
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
              Select Style Reference Image
            </Button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />

            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr"
              }}
            >
              {uploads?.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  <div>
                    <img width="100%" src={upload.preview ? upload.preview : upload.url} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </Block>
        </Block>
      </DropZone>
    </Block>
  )
}

const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      className={css({
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1
        }
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
                    rgba(0, 0, 0, 0) 0,
                    rgba(0, 0, 0, 0.006) 8.1%,
                    rgba(0, 0, 0, 0.022) 15.5%,
                    rgba(0, 0, 0, 0.047) 22.5%,
                    rgba(0, 0, 0, 0.079) 29%,
                    rgba(0, 0, 0, 0.117) 35.3%,
                    rgba(0, 0, 0, 0.158) 41.2%,
                    rgba(0, 0, 0, 0.203) 47.1%,
                    rgba(0, 0, 0, 0.247) 52.9%,
                    rgba(0, 0, 0, 0.292) 58.8%,
                    rgba(0, 0, 0, 0.333) 64.7%,
                rgba(0, 0, 0, 0.371) 71%,
                rgba(0, 0, 0, 0.403) 77.5%,
                rgba(0, 0, 0, 0.428) 84.5%,
                rgba(0, 0, 0, 0.444) 91.9%,
                rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1
          }
        })}
      />
      <div className="tooltip">

        <img
          src={preview}
          className={css({
            width: "130px",
            height: "130px",
            objectFit: "cover",
            pointerEvents: "none",
            verticalAlign: "middle"
          })}
        />
      </div>
    </div>
  )
}

export default Shiftimages
{/* {images.map((image, index) => {
      return (
        <div  className="tooltip" onClick={() => setInput(image.alt)}>
        <ImageItem key={index}   preview={image.src.small} />
        <span className="tooltiptext">{image.alt}</span>
        </div>
        )
      })} */
}