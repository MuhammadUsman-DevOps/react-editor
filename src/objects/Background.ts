import { fabric } from "fabric"

const defaultShadow = {
  blur: 10,
  color: "#C7C7C7",
  offsetX: 0,
  offsetY: 0,
}
// @ts-ignore
export class BackgroundObject extends fabric.Rect {
  static type = "Background"
  initialize(options: BackgroundOptions) {
    const shadowOptions = options.shadow ? options.shadow : defaultShadow
    const shadow = new fabric.Shadow({
      affectStroke: false,
      // @ts-ignore
      ...shadowOptions,
    })
    super.initialize({
      ...options,
      selectable: false,
      hasControls: false,
      hasBorders: false,
      lockMovementY: true,
      lockMovementX: true,
      strokeWidth: 0,
      evented: true,
      hoverCursor: "default",
      shadow,
    })

    this.on("mouseup", ({ target }) => {
      const activeSelection = this.canvas.getActiveObject()
      if (!activeSelection && target === this) {
        this.canvas.fire("background:selected")
      }
    })
    return this
  }

  toObject(propertiesToInclude: string[] = []) {
    return super.toObject(propertiesToInclude)
  }
  toJSON(propertiesToInclude: string[] = []) {
    return super.toObject(propertiesToInclude)
  }

  static fromObject(options: BackgroundOptions, callback: Function) {
    return callback && callback(new fabric.Background(options))
  }
}

fabric.Background = fabric.util.createClass(BackgroundObject, {
  type: BackgroundObject.type,
})
fabric.Background.fromObject = BackgroundObject.fromObject

export interface BackgroundOptions extends fabric.IRectOptions {
  id: string
  name: string
  description?: string
}

declare module "fabric" {
  namespace fabric {
    class Background extends BackgroundObject {
      constructor(options: BackgroundOptions)
    }
  }
}
