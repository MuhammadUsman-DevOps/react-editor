import React from "react"
import { IFrame } from "@layerhub-io/types"
import { Block } from "baseui/block"
import VerticalLine from "~/components/Icons/VerticalLine"
import { Resizable } from "~/components/Resizable"

const BottomRightHandle = ({
  isHover,
  setControlHover,
}: {
  isHover: boolean
  setControlHover: (v: boolean) => void
}) => (
  <div
    onMouseEnter={() => setControlHover(true)}
    onMouseLeave={() => setControlHover(false)}
    style={{
      background: "rgba(0,0,0,0.25)",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: isHover ? 1 : 0,
      cursor: "col-resize",
    }}
  >
    <VerticalLine size={24} />
  </div>
)

interface TimelineItemProps {
  id: string
  preview: string
  frame: IFrame
  width: number
  height: number
  makeResizeTimelineItem: (id: string, props: any) => void
}

export default function ({ id, preview, frame, width, height, makeResizeTimelineItem }: TimelineItemProps) {
  const [options, setOptions] = React.useState({
    isControlHover: false,
    isResizing: false,
  })

  const setControlHover = React.useCallback(
    (isHover: boolean) => {
      setOptions({ ...options, isControlHover: isHover })
    },
    [options]
  )

  return (
    <Resizable
      onResizeStart={() => setOptions({ ...options, isResizing: true })}
      onResizeStop={(e, direction, ref, d) => {
        setOptions({
          ...options,
          isResizing: false,
        })
        makeResizeTimelineItem(id, {
          width: width + d.width,
          height: height + d.height,
        })
      }}
      enable={{
        left: true,
        right: true,
      }}
      style={{
        overflow: "hidden",
        borderRadius: "10px",
        border: "1px solid rgba(0,0,0,.15)",
      }}
      size={{ width: width, height: height }}
      handleComponent={{
        right: (
          <BottomRightHandle setControlHover={setControlHover} isHover={options.isControlHover || options.isResizing} />
        ),
        left: (
          <BottomRightHandle setControlHover={setControlHover} isHover={options.isControlHover || options.isResizing} />
        ),
      }}
    >
      <Block
        // @ts-ignore
        //   onMouseMove={onMouseMoveItem}
        $style={{
          background: "rgb(243,244,246)",
          width: "100%",
          height: "100%",
        }}
      >
        <Block
          $style={{
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Block
            $style={{
              backgroundImage: `url(${preview})`,
              backgroundSize: `${frame ? (frame.width * 70) / frame.height : 70}px 70px`,
              backgroundRepeat: "repeat",
              height: "70px",
            }}
          ></Block>
          <Block
            $style={{
              position: "absolute",
              bottom: "4px",
              right: "4px",
              background: "rgba(0,0,0,0.4)",
              color: "#fff",
              fontSize: "10px",
              borderRadius: "2px",
              height: "16px",
              width: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Hi
          </Block>
        </Block>
      </Block>
    </Resizable>
  )
}
