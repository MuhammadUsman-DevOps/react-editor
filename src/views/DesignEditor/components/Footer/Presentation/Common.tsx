import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Icons from "~/components/Icons"
import { Button, KIND, SIZE } from "baseui/button"
import { Slider } from "baseui/slider"
import { Input } from "baseui/input"
import { useEditor, useZoomRatio } from "@layerhub-io/react"
import { StatefulTooltip } from "baseui/tooltip"
import { Block } from "baseui/block"
import { PLACEMENT } from "baseui/toast"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "50px",
  background: $theme.colors.white,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

interface Options {
  zoomRatio: number
  zoomRatioTemp: number
}

const Common = () => {
  const zoomMin = 10
  const zoomMax = 240
  const [options, setOptions] = React.useState<Options>({
    zoomRatio: 20,
    zoomRatioTemp: 20,
  })
  const editor = useEditor()
  const zoomRatio: number = useZoomRatio()

  React.useEffect(() => {
    setOptions({ ...options, zoomRatio: Math.round(zoomRatio * 100) })
  }, [zoomRatio])

  const handleChange = (type: string, value: number) => {
    if (editor) {
      if (type.includes("emp")) {
        setOptions({ ...options, zoomRatioTemp: value })
      }
    }
  }

  const applyZoomRatio = (type: string, e: any) => {
    const value = e.target.value
    if (editor) {
      if (value === "") {
        setOptions({ ...options, zoomRatio: options.zoomRatio, zoomRatioTemp: options.zoomRatio })
      } else {
        let parsedValue = parseFloat(value)

        if (parsedValue < 0) {
          editor.zoom.zoomToRatio(zoomMin / 100)
        } else if (parsedValue > zoomMax) {
          editor.zoom.zoomToRatio(zoomMax / 100)
        } else {
          editor.zoom.zoomToRatio(parsedValue / 100)
        }
      }
    }
  }

  return (
    <Container>
      <div>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Layers size={20} />
        </Button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Expand size={16} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => editor.zoom.zoomToFit()}>
          <Icons.Compress size={16} />
        </Button>
        <Block>
          <StatefulTooltip
            placement={PLACEMENT.bottom}
            showArrow={true}
            accessibilityType={"tooltip"}
            content="Zoom Out"
          >
            <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => editor.zoom.zoomOut()}>
              <Icons.RemoveCircleOutline size={24} />
            </Button>
          </StatefulTooltip>
        </Block>
        <Slider
          overrides={{
            InnerThumb: () => null,
            ThumbValue: () => null,
            TickBar: () => null,
            Root: {
              style: { width: "140px" },
            },
            Thumb: {
              style: {
                height: "12px",
                width: "12px",
                paddingLeft: 0,
              },
            },
            Track: {
              style: {
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
          }}
          value={[options.zoomRatio]}
          onChange={({ value }) => applyZoomRatio("zoomRatio", { target: { value: value[0] } })}
          min={zoomMin}
          max={zoomMax}
        />
        <Block>
          <StatefulTooltip
            placement={PLACEMENT.bottom}
            showArrow={true}
            accessibilityType={"tooltip"}
            content="Zoom Out"
          >
            <Button kind={KIND.tertiary} size={SIZE.compact} onClick={() => editor.zoom.zoomIn()}>
              <Icons.AddCircleOutline size={24} />
            </Button>
          </StatefulTooltip>
        </Block>
        <Input
          type="number"
          endEnhancer="%"
          overrides={{
            Input: {
              style: {
                backgroundColor: "#ffffff",
                textAlign: "center",
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
            Root: {
              style: {
                borderBottomColor: "rgba(0,0,0,0.15)",
                borderTopColor: "rgba(0,0,0,0.15)",
                borderRightColor: "rgba(0,0,0,0.15)",
                borderLeftColor: "rgba(0,0,0,0.15)",
                borderTopWidth: "1px",
                borderBottomWidth: "1px",
                borderRightWidth: "1px",
                borderLeftWidth: "1px",
                height: "20px",
                width: "52px",
                paddingRight: 0,
              },
            },
            EndEnhancer: {
              style: {
                paddingLeft: 0,
                paddingRight: "10px",
                backgroundColor: "#ffffff",
              },
            },
          }}
          size={SIZE.mini}
          max={zoomMax}
          min={zoomMin}
          onChange={(e) => handleChange("zoomRatioTemp", parseFloat(e.target.value))}
          onKeyUp={(e) => applyZoomRatio("zoomRatio", e)}
          value={options.zoomRatioTemp}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Refresh size={16} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Undo size={22} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Redo size={22} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.TimePast size={16} />
        </Button>
      </div>
    </Container>
  )
}

export default Common
