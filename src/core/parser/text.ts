import { text as base } from "./constants"
export default function (layer: any, object: any, bounds: any) {
  const octopus = layer.octopus
  const text = octopus.text
  const styles = text.styles[0]
  const { r, g, b, a } = styles.color

  const metadata = {}
  return {
    ...base,
    top: bounds.bounds.top,
    left: bounds.bounds.left,
    width: bounds.bounds.width,
    height: bounds.bounds.height,
    angle: 0,
    fill: `rgba(${r}, ${g}, ${b}, ${a})`,
    fontFamily: styles.font.postScriptName,
    postScriptName: styles.font.postScriptName,
    fontSize: styles.font.size,
    text: text.value,
    metadata,
  }
}
