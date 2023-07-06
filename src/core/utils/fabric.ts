import { ILayer } from "~/types"
import { fabric } from "fabric"
import { isNaN } from "lodash"
import { ShadowOptions } from "../common/interfaces"

export function angleToPoint(angle: number, sx: number, sy: number) {
  while (angle < 0) angle += 360
  angle %= 360
  let a = sy,
    b = a + sx,
    c = b + sy,
    p = (sx + sy) * 2,
    rp = p * 0.00277,
    pp = Math.round((angle * rp + (sy >> 1)) % p)

  if (pp <= a) return { x: 0, y: sy - pp }
  if (pp <= b) return { y: 0, x: pp - a }
  if (pp <= c) return { x: sx, y: pp - b }
  return { y: sy, x: sx - (pp - c) }
}

const setObjectGradient = (object: fabric.Object, angle: number, colors: string[]) => {
  let odx = object.width! >> 1
  let ody = object.height! >> 1
  let startPoint = angleToPoint(angle, object.width!, object.height!)
  let endPoint = {
    x: object.width! - startPoint.x,
    y: object.height! - startPoint.y,
  }

  object.set(
    "fill",
    new fabric.Gradient({
      type: "linear",
      coords: {
        x1: startPoint.x - odx,
        y1: startPoint.y - ody,
        x2: endPoint.x - odx,
        y2: endPoint.y - ody,
      },
      colorStops: [
        { offset: 0, color: colors[0] },
        { offset: 1, color: colors[1] },
      ],
    })
  )
}

export const setObjectShadow = (object: fabric.Object | any, options: ShadowOptions) => {
  if (options.enabled) {
    object.set({
      shadow: new fabric.Shadow(options),
    })
  } else {
    object.set({
      shadow: null,
    })
  }
}

export const updateObjectShadow = (object: fabric.Object | any, options: any) => {
  if (options) {
    object.set({
      shadow: new fabric.Shadow(options),
    })
  } else {
    object.set({
      shadow: null,
    })
  }
}

export const updateObjectBounds = (element: fabric.Object | any, options: Required<ILayer>) => {
  const { top, left, width, height } = element
  if (isNaN(top) || isNaN(left)) {
    element.set({
      top: options.top + options.height / 2 - height / 2,
      left: options.left + options.width / 2 - width / 2,
    })
  }
}

export default setObjectGradient
