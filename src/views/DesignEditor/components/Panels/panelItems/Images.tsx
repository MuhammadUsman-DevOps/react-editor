import React, { useState } from "react"
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

const Images = () => {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [input,setInput] =useState("");

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
  const fetching = async (e: any) => {
  
    e.preventDefault();
console.log(input);
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


    const response = await fetch("https://5ca46622-b0bb-40c7-91c1-8603e74421ad.mock.pstmn.io/api/fetch-response", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({}),
    });

    if (response.ok) {
      const data = await response.json();
      const imageUrl = data.images[0];

      addObject(imageUrl);
    } else {
      console.error("Failed to fetch image from the API.");
    }
  };
  
  
  

  return (
    <Block>
      <Block style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"10px",marginBottom:"10px",marginLeft:"20%"}}>
      
      <Block>
      <Input onChange={(e)=> setInput(e.target.value)}/>
      </Block>
      <Button style={{height:"10%", maxHeight:"100px",marginTop:"10px"}} onClick={fetching}>Generate Button</Button>
      </Block>
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
        
        <Block>Images</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr" }}>
         
          </div>
        </Block>
      </Scrollable>
    </Block>
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
      <img
        src={preview}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
    </div>
  )
}

export default Images
