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


const Images = () => {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [input,setInput] =useState("");
  const [s3url,sets3url] = useState("")
  const {
    scenes,
    setScenes,
    setContextMenuTimelineRequest,
    contextMenuTimelineRequest,
    setCurrentScene,
    setCurrentDesign,
  } = useDesignEditorContext()

// adding the new slide for every new generation 
  const addScene = React.useCallback(async () => {
    // console.log("adding")

    const updatedTemplate = editor?.scene.exportToJSON() //first the json form is exported  
    const updatedPreview = await editor?.renderer.render(updatedTemplate??scenes[0]) //the preview if of the file is then added to the time line
    const updatedPages = scenes.map((p) => {
      if (p.id === updatedTemplate?.id) {
        return { ...updatedTemplate, preview: updatedPreview }
      }
      return p
    })///the states of the every member in the time line is updated
    const defaultTemplate = getDefaultTemplate(scenes[0].frame);//the last frame size is taken whic is going to be maintianed as a template
    const newPreview = await editor?.renderer.render(defaultTemplate) //the new previw is added and referesed or rendred 
    const newPage = { ...defaultTemplate, id: nanoid(), preview: newPreview } as any
    const newPages = [...updatedPages, newPage] as any[] ///the list is updated with the newpage
    //rendering the updates on the screen using hooks
    setScenes(newPages) 
    setCurrentScene(newPage)
  }, [scenes, setCurrentDesign])

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )
  const [imagess,setImage] = useState([""]);  
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("enable_hr", "false");
  headers.append("denoising_strength", "0");
  headers.append("firstphase_width", "0");
  headers.append("firstphase_height", "0");
  headers.append("hr_scale", "2");
  headers.append("hr_upscaler", "string");
  headers.append("hr_second_pass_steps", "0");
  headers.append("hr_resize_x", "0");
  headers.append("hr_resize_y", "0");
  headers.append("hr_sampler_name", "string");
  headers.append("hr_prompt", "");
  headers.append("hr_negative_prompt", "");
  headers.append("prompt", "a car in the sky");
  headers.append("styles", "string");
  headers.append("seed", "-1");
  headers.append("subseed", "-1");
  headers.append("subseed_strength", "0");
  headers.append("seed_resize_from_h", "-1");
  headers.append("seed_resize_from_w", "-1");
  headers.append("sampler_name", "");
  headers.append("batch_size", "1");
  headers.append("n_iter", "1");
  headers.append("steps", "50");
  headers.append("cfg_scale", "7");
  headers.append("width", "512");
  headers.append("height", "512");
  headers.append("restore_faces", "false");
  headers.append("tiling", "false");
  headers.append("do_not_save_samples", "false");
  headers.append("do_not_save_grid", "false");
  headers.append("negative_prompt", "string");
  headers.append("eta", "0");
  headers.append("s_min_uncond", "0");
  headers.append("s_churn", "0");
  headers.append("s_tmax", "0");
  headers.append("s_tmin", "0");
  headers.append("s_noise", "1");
  headers.append("override_settings", "{}");
  headers.append("override_settings_restore_afterwards", "true");
  headers.append("script_args", "[]");
  headers.append("sampler_index", "Euler");
  headers.append("script_name", "");
  headers.append("send_images", "true");
  headers.append("save_images", "false");
  headers.append("alwayson_scripts", "{}");
  
  
  const handleImageUpload = (callback:any) => {
    addScene()
    if(editor){
      const canvas = document.getElementById(editor.canvasId);
      const dataURL = canvas?.toDataURL('image/png');
      console.log("Button Clicked");
      AWS.config.update({
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        region: import.meta.env.VITE_REGION,
      });
      // Convert data URL to Blob
      fetch(dataURL)
      .then((res) => res.blob())
      .then((blob) => {
        // Create a File object from the Blob
        const d = new Date();
        let time = d.getTime();
        let file_name = `image${time}.png`;
        const file = new File([blob],file_name , { type: 'image/png' });
        // Upload the file to S3
        const s3 = new AWS.S3();
        s3.putObject({
          Bucket: import.meta.env.VITE_BUCKET,
          Key: file_name,
          Body: file,
          ContentType:"image/png",
        }, (err) => {
          if (err) {
            console.error(err);
          } else {
            // Get the S3 URL for the uploaded object
            const params = { Bucket: import.meta.env.VITE_BUCKET, Key: file_name };
            const url = s3.getSignedUrl('getObject', params);
            
            console.log('Image uploaded to S3');
            console.log('S3 URL:', url);
            sets3url(url)
            callback();
          }
        });
      })
      .catch((error) => {
        console.error('Error converting data URL to image file:', error);
      });}
    };
    
    const postToApi = () => {
      const dataObject = {
        "prompt":input,
      };
      const headers = {
        'Content-Type': 'application/json', // Specify the content type of the request body
        'Accept' : '*/*',
        // Add any other headers as needed
      };
      
      axios.post(`${import.meta.env.VITE_RADIANCE_BACKEND_URL}/txt2img`, dataObject,{headers})
      .then((response) => {
        // Handle success
        addObject(response.data.gen_image_url)
        console.log(response.data.gen_image_url);
        const currentScene = scenes.find((scene) => scene.id === contextMenuTimelineRequest.id)
        const updatedScenes = [...scenes, { ...currentScene, id: nanoid() }]
        //  @ts-ignore
        setScenes(updatedScenes)
        setContextMenuTimelineRequest({ ...contextMenuTimelineRequest, visible: false })
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    };
    
    return (
      <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <textarea value={input}  placeholder="Enter your prompt or choose from below" onChange={e => setInput(e.target.value)}  style={{display:"flex" , flexDirection:"column" , padding:"10px", margin:"10px" , borderRadius:"10px" , fontSize:15 , fontFamily:"sans-serif"}} />
          <Button style={{margin:"20px"}} onClick={()=>handleImageUpload(postToApi)}>Generate</Button>
          <Block
            $style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              justifyContent: "space-between",
              padding: "1.5rem",
            }}
            >
            <Block>Images</Block>
    
            <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
              <AngleDoubleLeft size={18} />
            </Block>
          </Block>
          <Scrollable>
            <Block padding="0 1.5rem">
              <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr",}}>
                {/* {images.map((image, index) => {
                  return (
                    <div  className="tooltip" onClick={() => setInput(image.alt)}>
                    <ImageItem key={index}   preview={image.src.small} />
                    <span className="tooltiptext">{image.alt}</span>
                    </div>
                    )
                  })} */}
                <div   className="tooltip" onClick={() => setInput("a bottle of whisky sitting on top of a wooden table")}>
                  <ImageItem preview={imagevariations} />
                  <span className="tooltiptext">{"a bottle of whisky sitting on top of a wooden table"}</span>
                  </div>
                <div  className="tooltip" onClick={() => setInput("A perfume bottle on desk with some flowers in the background")}>
                  <ImageItem preview={template1} />
                  <span className="tooltiptext">{"A perfume bottle on desk with some flowers in the background"}</span>
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
    
    export default Images
    
    // const heade = new Headers();
    
    // const image_fetcing= async()=>
    // {
      //   const response = await fetch("https://5ca46622-b0bb-40c7-91c1-8603e74421ad.mock.pstmn.io/api/fetch-response", {
        //     method: "GET",
        //     headers:headers,
        //     body: JSON.stringify({}),
        //   }).then(response => response.json()).then(data =>{ 
          //     console.log(data)
          //     setImage(data)});
          
          
          // }
          
          // useEffect
          // {
            //   image_fetcing();
            // }
            // const fetching = async (e: any) => {
            
            //   e.preventDefault();
            //   console.log(input);
              
          
          
            //   const response = await fetch("https://5ca46622-b0bb-40c7-91c1-8603e74421ad.mock.pstmn.io/api/fetch-response", {
            //     method: "POST",
            //     headers: headers,
            //     body: JSON.stringify({}),
            //   });
          
            //   if (response.ok) {
            //     const data = await response.json();
            //     const imageUrl = data.images[0];
          
            //     addObject(imageUrl);
            //   } else {
            //     console.error("Failed to fetch image from the API.");
            //   }
            // };