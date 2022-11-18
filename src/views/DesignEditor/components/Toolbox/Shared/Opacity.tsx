import React from "react"
import { Block } from "baseui/block"
import { Input } from "baseui/input"
import { Slider } from "baseui/slider"
import { ILayer } from "@layerhub-io/types"
import { StatefulPopover, PLACEMENT } from "baseui/popover"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { Button, SIZE, KIND } from "baseui/button"
import OpacityIcon from "~/components/Icons/Opacity."
import { StatefulTooltip } from "baseui/tooltip"

const Opacity = () => {
  const editor = useEditor()
  const [state, setState] = React.useState<{
    opacity: number
    opacityTemp: number
  }>({ opacity: 0, opacityTemp: 0 })
  const activeObject = useActiveObject() as Required<ILayer>

  React.useEffect(() => {
    if (activeObject) {
      setState({
        opacity: activeObject.opacity * 100,
        opacityTemp: activeObject.opacity * 100,
      })
    }
  }, [activeObject])

  const handleChange = (type: string, value: number) => {
    if (editor) {
      if (type.includes("emp")) {
        setState({ ...state, opacityTemp: value })
      }
    }
  }
  const applyTextOpacity = (type: string, e: any) => {
    const value = e.target.value
    if (editor) {
      if (value === "") {
        setState({ ...state, opacity: state.opacity, opacityTemp: state.opacity })
      } else {
        let parsedValue = parseFloat(value)
        if (parsedValue >= 100) {
          parsedValue = 100
        }
        setState({ ...state, opacity: parsedValue, opacityTemp: parsedValue })
        editor.objects.update({ opacity: parsedValue / 100 })
      }
    }
  }

  return (
    <StatefulPopover
    placement={PLACEMENT.bottomLeft}
    content={() => (
      <Block width={"200px"} backgroundColor={"#ffffff"} padding={"20px"}>
        <Block $style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Block $style={{ fontSize: "14px" }}>Opacity</Block>
          <Block width={"52px"}></Block>
        </Block>

        <Block $style={{ display: "grid", gridTemplateColumns: "1fr 40px", gap: "1rem" }}>
          <Slider
            overrides={{
              InnerThumb: () => null,
              ThumbValue: () => null,
              TickBar: () => null,
              Track: {
                style: {
                  paddingRight: 0,
                  paddingLeft: 0,
                },
              },
              Thumb: {
                style: {
                  height: "12px",
                  width: "12px",
                },
              },
            }}
            min={0}
            max={100}
            marks={false}
            value={[state.opacity]}
            onChange={(event) => applyTextOpacity("", { target: { value: event.value[0] } })}
          />
          <Block $style={{ display: "flex", alignItems: "center" }}>
            <Input
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
                  },
                },
              }}
              size={SIZE.mini}
              type={"number"}
              inputMode="decimal"
              pattern="[0-9]*(.[0-9]+)?"
              onChange={(e) => handleChange("opacityTemp", parseFloat(e.target.value))}
              onBlur={(e) => applyTextOpacity("opacity", e)}
              value={state.opacityTemp}
            />
          </Block>
        </Block>
      </Block>
    )}
  >
    <Block>
      <StatefulTooltip placement={PLACEMENT.bottom} showArrow={true} accessibilityType={"tooltip"} content="Opacity">
        <Button kind={KIND.tertiary} size={SIZE.mini}>
          <OpacityIcon size={24} />
        </Button>
      </StatefulTooltip>
    </Block>
  </StatefulPopover>
  )
}

export default Opacity
