import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Controls from "./Controls"

const Container = styled<"div", {}, Theme>("div", ({ $theme }) => ({
  background: $theme.colors.white,
}))

export default function () {
  return (
    <Container>
      <Controls />
    </Container>
  )
}
