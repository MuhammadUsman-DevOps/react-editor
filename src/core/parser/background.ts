import { background } from "./constants"
export default function (layer: any, object?: any, bounds?: any) {
  const { width, height } = layer
  return {
    ...background,
    width,
    height,
  }
}
