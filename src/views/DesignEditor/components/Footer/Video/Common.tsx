import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Icons from "~/components/Icons"
import { Button, KIND, SIZE } from "baseui/button"
import { useZoomRatio } from "~/react"
import { useTimer } from "~/contexts/useTimer"
import { Block } from "baseui/block"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  height: "50px",
  background: $theme.colors.white,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

interface Options {
  zoomRatio: number
}

const Common = () => {
  const { time } = useTimer()
  const { maxTime } = useDesignEditorContext()
  const [options, setOptions] = React.useState<Options>({
    zoomRatio: 20,
  })
  const zoomRatio: number = useZoomRatio()

  React.useEffect(() => {
    setOptions({ ...options, zoomRatio: Math.round(zoomRatio * 100) })
  }, [zoomRatio])

  return (
    <Container>
      <Block $style={{ display: "flex", fontWeight: 500, fontSize: "15px", alignItems: "center" }}>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Layers size={20} />
        </Button>
        <Block>
          {new Date(time).toISOString().slice(14, 19)} / {new Date(maxTime).toISOString().slice(14, 19)}
        </Block>
      </Block>
      <Block $style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          {options.zoomRatio}
        </Button>
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
      </Block>
    </Container>
  )
}

export default Common
