import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Timeline from "./Timeline"
import Common from "./Common"
import { Block } from "baseui/block"
import PlaySolid from "~/components/Icons/PlaySolid"
import { useTimer } from "@layerhub-io/use-timer"
import Pause from "~/components/Icons/Pause"

const Container = styled<{}, "div", Theme>("div", ({ $theme }) => ({
  background: $theme.colors.white,
}))

export default function () {
  const { pause, start, status } = useTimer()

  return (
    <Container>
      <Block $style={{ display: "flex", alignItems: "center" }}>
        <Block $style={{ padding: "0 1rem" }}>
          <Block
            onClick={status === "RUNNING" ? pause : start}
            $style={{
              height: "56px",
              width: "56px",
              background: "#ffffff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 1px rgba(64,87,109,0.07),0 2px 12px rgba(53,71,90,0.2)",
            }}
          >
            {status === "RUNNING" ? <Pause size={24} /> : <PlaySolid size={24} />}
          </Block>
        </Block>
        <Timeline />
      </Block>
      <Common />
    </Container>
  )
}
