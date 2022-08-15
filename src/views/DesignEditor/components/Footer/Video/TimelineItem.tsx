import React from "react"
import { IFrame } from "@layerhub-io/types"
import { Block } from "baseui/block"
import VerticalLine from "~/components/Icons/VerticalLine"
import { Resizable } from "~/components/Resizable"
import { useTimer } from "@layerhub-io/use-timer"

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
  const [markerRefPosition, setMarkerRefPosition] = React.useState({ y: 0 })
  const { setTime } = useTimer()
  const markerRef = React.useRef<HTMLDivElement>(null)
  const [options, setOptions] = React.useState({
    isControlHover: false,
    isResizing: false,
    isItemHover: false,
  })

  const setControlHover = React.useCallback(
    (isHover: boolean) => {
      setOptions({ ...options, isControlHover: isHover })
    },
    [options]
  )

  const onMouseMoveItem = (evt: any) => {
    if (markerRef.current) {
      const position = evt.pageX - markerRef.current?.getBoundingClientRect().left
      setMarkerRefPosition({ y: position })
    }
  }
  const refBoundingRect = markerRef.current?.getBoundingClientRect()

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
        onMouseMove={onMouseMoveItem}
        ref={markerRef}
        $style={{
          background: "rgb(243,244,246)",
          width: "100%",
          height: "100%",
        }}
      >
        <Block
          onMouseEnter={() => setOptions({ ...options, isItemHover: true })}
          onMouseLeave={() => setOptions({ ...options, isItemHover: false })}
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

          {options.isItemHover &&
            refBoundingRect &&
            markerRefPosition.y + 22 < refBoundingRect.width &&
            markerRefPosition.y > 22 && (
              <Block
                // ref={markerRef}
                onClick={() => {
                  setTime(markerRefPosition.y * 40)
                }}
                $style={{
                  position: "absolute",
                  left: `${markerRefPosition.y}px`,
                  bottom: "0px",
                  height: "70px",
                  width: "2px",
                  backgroundColor: "#333333",
                  transform: "translate(0, -2px)",
                  cursor: "pointer",
                }}
              ></Block>
            )}

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
