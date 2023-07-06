// @ts-nocheck
import { fabric } from "fabric"

export class BackgroundImageObject extends fabric.Image {
  static type = "BackgroundImage"
  //@ts-ignore
  initialize(element, options) {
    options.type = "BackgroundImage"
    //@ts-ignore
    super.initialize(element, {
      ...options,
      hasControls: false,
      lockMovementY: true,
      lockMovementX: true,
      selectable: false,
      hoverCursor: "default",
      hasBorders: false,
    })

    this.on("mouseup", ({ target }) => {
      const activeSelection = this.canvas.getActiveObject()
      if (!activeSelection && target === this) {
        this.canvas.fire("background:selected")
      }
    })

    this.on("mousedblclick", () => {
      this.set({
        hasControls: true,
        lockMovementY: false,
        lockMovementX: false,
        hasBorders: true,
      })
      this.canvas.setActiveObject(this)
      this.canvas.requestRenderAll()
    })

    return this
  }

  static fromObject(options: any, callback: Function) {
    fabric.util.loadImage(
      options.src,
      function (img) {
        // @ts-ignore
        return callback && callback(new fabric.BackgroundImage(img, options))
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

fabric.BackgroundImage = fabric.util.createClass(BackgroundImageObject, {
  type: BackgroundImageObject.type,
})
fabric.BackgroundImage.fromObject = BackgroundImageObject.fromObject

export interface BackgroundImageOptions extends fabric.IImageOptions {
  id: string
  name?: string
  description?: string
  subtype: string
  src: string
}

declare module "fabric" {
  namespace fabric {
    class BackgroundImage extends BackgroundImageObject {
      constructor(element: any, options: any)
    }

    interface IUtil {
      isTouchEvent(event: Event): boolean
      getPointer(event: Event, a?: any): Point
    }
  }
}
