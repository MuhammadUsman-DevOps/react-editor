// @ts-nocheck
import { fabric } from "fabric"

export class StaticImageObject extends fabric.Image {
  static type = "StaticImage"
  public role: string = "regular"
  //@ts-ignore
  initialize(element, options) {
    this.role = element.role
    options.type = "StaticImage"
    //@ts-ignore
    super.initialize(element, options)
    return this
  }

  static fromObject(options: any, callback: Function) {
    fabric.util.loadImage(
      options.src,
      function (img) {
        // @ts-ignore
        return callback && callback(new fabric.StaticImage(img, options))
      },
      null,
      // @ts-ignore
      { crossOrigin: "anonymous" }
    )
  }

  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude)
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude)
  }
}

fabric.StaticImage = fabric.util.createClass(StaticImageObject, {
  type: StaticImageObject.type,
})
fabric.StaticImage.fromObject = StaticImageObject.fromObject

export interface StaticImageOptions extends fabric.IImageOptions {
  id: string
  name?: string
  description?: string
  subtype: string
  src: string
}

declare module "fabric" {
  namespace fabric {
    class StaticImage extends StaticImageObject {
      constructor(element: any, options: any)
    }
  }
}
