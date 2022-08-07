import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Controls from "./Controls"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
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
