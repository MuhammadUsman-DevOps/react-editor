import Timeline from "./Timeline"
import Common from "./Common"
import { Block } from "baseui/block"

export default function () {
  return (
    <Block $style={{ background: "#ffffff" }}>
      <Timeline />
      <Common />
    </Block>
  )
}
