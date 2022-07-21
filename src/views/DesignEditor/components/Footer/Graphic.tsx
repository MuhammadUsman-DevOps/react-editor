import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Icons from "~/components/Icons"
import { Button, KIND, SIZE } from "baseui/button"
import { Slider } from "baseui/slider"
import { Input } from "baseui/input"
import { useEditor, useZoomRatio } from "@scenify/react"
import Timeline from "./Timeline"
import Controls from "./Controls"

const Container = styled<{}, "div", Theme>("div", ({ $theme }) => ({
  // height: "56px",
  background: $theme.colors.white,
  // display: "grid",
  // gridTemplateColumns: "240px 1fr 240px",
  // borderTop: "1px solid #d7d8e3",
  // alignItems: "center",
  // padding: "0 0.5rem",
}))

export default function () {
  return (
    <Container>
      <Controls />
    </Container>
  )
}
