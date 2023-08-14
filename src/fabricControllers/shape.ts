import { path as base } from "./constants"

export default function (object: any) {
  let position = {
    top: object.top,
    left: object.left,
  }

  const { top, left, fill, path } = object

  return {
    ...base,
    ...position,
    stroke: object.stroke,
    strokeWidth: object.strokeWidth,
    strokeDashArray: object.strokeDashArray,
    strokeLineCap: object.strokeLineCap,
    strokeLineJoin: object.strokeLineJoin,
    strokeUniform: object.strokeUniform,
    strokeMiterLimit: object.strokeMiterLimit,
    strokeDashOffset: object.strokeDashOffset,
    fill,
    path: path,
  }
}
