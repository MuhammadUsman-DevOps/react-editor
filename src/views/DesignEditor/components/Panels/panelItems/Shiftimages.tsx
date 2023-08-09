import React, { useEffect, useState } from "react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { images } from "~/constants/mock-data"
import { useEditor } from "~/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import Input from "baseui/input/input"
import { Button } from "baseui/button"
import image from "~/core/parser/image"
import './images.css'
import { Header } from "baseui/accordion/styled-components"
import imagevariations from '../../../../../constants/mock-images/ImageVariations.jpg'
import template1 from '../../../../../constants/mock-images/template2.jpg'
import AWS from 'aws-sdk'
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { getDefaultTemplate } from "~/constants/design-editor"

import axios from 'axios'
import { log } from "console"
import { nanoid } from "nanoid"
import useEditorType from "~/hooks/useEditorType"
import { IDesign } from "~/interfaces/DesignEditor"
import Scene from "~/core/controllers/Scene"


const Shiftimages = () => {
    const [input,setInput] =useState("");
    const [artStyle,setartStyle] =useState("");
    const setIsSidebarOpen = useSetIsSidebarOpen()
    const hello = () =>{
        setInput(()=>"hello")
    }
  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <textarea value={input}  placeholder="Enter your prompt or choose from below" onChange={e => setInput(e.target.value)}  style={{display:"flex" , flexDirection:"column" , padding:"10px", margin:"10px" , borderRadius:"10px" , fontSize:15 , fontFamily:"sans-serif"}} />
          <Button style={{margin:"20px"}} onClick={()=>hello}>Generate</Button>
          <textarea value={artStyle}  placeholder="Enter Style" onChange={e => setInput(e.target.value)}  style={{display:"flex" , flexDirection:"column" , padding:"10px", margin:"10px" , borderRadius:"10px" , fontSize:15 , fontFamily:"sans-serif"}} />
          <Block
            $style={{
                display: "flex",
                alignItems: "center",
              fontWeight: 500,
              justifyContent: "space-between",
              padding: "1.5rem",
            }}
            >
                <Block>Select Style</Block>
    
            <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
              <AngleDoubleLeft size={18} />
            </Block>
          </Block>
          <Scrollable>
            <Block padding="0 1.5rem">
              <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr",}}>
                <div   className="tooltip" onClick={() => {setInput("Colourfull Image of cat from head to neck looking to the right"),setartStyle("Oil Painting")}}>
                  <ImageItem preview={"https://i.ebayimg.com/images/g/iYMAAOSw269jXD2D/s-l1600.jpg"} />
                  <span className="tooltiptext"><span style={{color:"red"}}>{"{Oil painting}"}</span>{" of a cat"}</span>
                  </div>
                <div  className="tooltip" onClick={() => {setInput("Colourfull Image of cat from head to neck looking to the right"),setartStyle("Digital Art")}}>
                  <ImageItem preview={"https://artsi.ai/wp-content/uploads/2023/03/Animal-design-4096px-1-2.png"} />
                  <span className="tooltiptext"><span style={{color:"red"}}>{"{Digital art}"}</span>{"of cat"}</span>
                  </div>
              </div>
            </Block>
          </Scrollable>
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
    
    export default Shiftimages
    {/* {images.map((image, index) => {
      return (
        <div  className="tooltip" onClick={() => setInput(image.alt)}>
        <ImageItem key={index}   preview={image.src.small} />
        <span className="tooltiptext">{image.alt}</span>
        </div>
        )
      })} */}