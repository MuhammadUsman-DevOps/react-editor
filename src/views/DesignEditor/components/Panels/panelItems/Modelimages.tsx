import React, { useEffect, useState } from "react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { useEditor } from "~/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { Button , SIZE } from "baseui/button"
import './images.css'
import { nanoid } from "nanoid"
import { captureFrame, loadVideoResource } from "~/utils/video"
import { toBase64 } from "~/utils/data"
import DropZone from "~/components/Dropzone"


const Modelimages = (props:any) => {
    const [input,setInput] =useState("");
    const [modelStyle,setmodelStyle] =useState("");
    const setIsSidebarOpen = useSetIsSidebarOpen()
    const [mode,setMode] = useState("Select Mode")
    const inputFileRef = React.useRef<HTMLInputElement>(null)
    const editor = useEditor()
    const [uploads, setUploads] = React.useState<any[]>()
    
    
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
        setUploads([upload])
      }  
      const handleInputFileRefClick = () => {
          inputFileRef.current?.click()
        } 
        const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
          handleDropFiles(e.target.files!)
        }
  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" ,}}>
          <textarea value={input}  placeholder="Enter your prompt or choose from below" onChange={e => setInput(e.target.value)}  style={{display:"flex" , flexDirection:"column" , padding:"10px", margin:"10px 15px 10px 10px" , fontSize:15 , fontFamily:"sans-serif"}} />
          <Button style={{margin:"20px"}}>Generate</Button>
          <textarea value={modelStyle}  placeholder="Select Model from below" onChange={e => setInput(e.target.value)}  style={{display:"flex" , flexDirection:"column" , padding:"10px", margin:"10px 15px 10px 10px" , fontSize:15 , fontFamily:"sans-serif"}} />
          <Block
            $style={{
                display: "flex",
                alignItems: "center",
              fontWeight: 500,
              justifyContent: "space-between",
              padding: "1.5rem",
            }}
            >
                <Block>Select Model</Block>
    
            <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
              <AngleDoubleLeft size={18} />
            </Block>
          </Block>
          {/* <Scrollable> */}
            <Block padding="0 1.5rem" paddingBottom="30px">
              <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr",}}>
                <div   className="tooltip" onClick={() => {setInput("Model with white background"),setmodelStyle("African American")}}>
                  <ImageItem preview={"https://img.freepik.com/free-photo/pretty-black-woman-s-portrait-wears-braids-pony-tail_633478-1392.jpg"} />
                  <span className="tooltiptext"><span style={{color:"red"}}>{"{African American}"}</span>{" Model"}</span>
                  </div>
                <div  className="tooltip" onClick={() => {setInput("Model with white background"),setmodelStyle("Asian")}}>
                  <ImageItem preview={"https://static.vecteezy.com/system/resources/previews/004/797/118/large_2x/beautiful-young-asian-woman-with-clean-fresh-skin-on-white-background-face-care-facial-treatment-cosmetology-beauty-and-spa-asian-women-portrait-photo.jpg"} />
                  <span className="tooltiptext"><span style={{color:"red"}}>{"{Asian}"}</span>{" Model"}</span>
                  </div>
              </div>
            </Block>
            {/* </Scrollable> */}
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
        </Block>
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
              Select Model Reference Image
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
              {uploads?.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
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
                    opacity: 1,
                },
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
                    opacity: 1,
                },
            })}
            />
         <div     className="tooltip">
      
      <img
        src={preview}
        className={css({
            width: "130px",
            height: "130px",
            objectFit: "cover",
            pointerEvents: "none",
            verticalAlign: "middle",
        })}
        />
        </div>
        </div>
      )
    }
    
    export default Modelimages
    {/* {images.map((image, index) => {
      return (
        <div  className="tooltip" onClick={() => setInput(image.alt)}>
        <ImageItem key={index}   preview={image.src.small} />
        <span className="tooltiptext">{image.alt}</span>
        </div>
        )
      })} */}
