import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Icons from "~/components/Icons"
import { Button, KIND, SIZE } from "baseui/button"
import { Slider } from "baseui/slider"
import { Input } from "baseui/input"
import { useEditor, useZoomRatio } from "@scenify/react"
import Timeline from "./Timeline"
import Common from "./Common"
import Pages from "./Pages"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  background: $theme.colors.white,
}))

export default function () {
  return (
    <Container>
      <Pages />
      <Common />
    </Container>
  )
}
