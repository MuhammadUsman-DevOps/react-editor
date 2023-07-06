import Base from "./Base"
import { fabric } from "fabric"
import throttle from "lodash/throttle"
import { LayerType } from "../common/constants"

class History extends Base {
  private redos: any[] = []
  private undos: any[] = []
  private current: any[] = []
  private isActive: boolean = false

  public initialize = () => {
    const canvasJSON = this.canvas.toJSON(this.config.propertiesToInclude) as any
    canvasJSON.objects.forEach((object: fabric.Object) => {
      if (object.clipPath) {
        fabric.util.enlivenObjects(
          [object.clipPath],
          function (arg1: any) {
            object.clipPath = arg1[0]
          },
          ""
        )
      }
    })
    this.current = canvasJSON.objects
  }
  public getStatus = () => {
    return {
      hasUndo: this.undos.length >= 1,
      hasRedo: this.undos.length > 0,
      undos: this.undos,
      redos: this.redos,
      state: this.current,
    }
  }

  public save = () => {
    try {
      if (this.current) {
        const json = this.current
        this.undos.push({
          type: "UPDATE",
          json,
        })
        const canvasJSON = this.canvas.toJSON(this.config.propertiesToInclude) as any
        canvasJSON.objects.forEach((object: fabric.Object) => {
          if (object.clipPath) {
            fabric.util.enlivenObjects(
              [object.clipPath],
              function (arg1: any) {
                object.clipPath = arg1[0]
              },
              ""
            )
          }
        })
        this.current = canvasJSON.objects
      }
    } catch (err) {
      console.log(err)
    }
    this.emitStatus()
  }

  public undo = throttle(() => {
    if (this.undos.length >= 1) {
      const undo = this.undos.pop()
      if (!undo) {
        return
      }
      this.redos.push({
        type: "redo",
        json: this.current,
      })
      this.restore(undo)
    }
  }, 100)

  public redo = throttle(() => {
    const redo = this.redos.pop()
    if (!redo) {
      return
    }
    this.undos.push({
      type: "undo",
      json: this.current,
    })
    this.restore(redo)
  }, 100)

  private restore = (transaction: any) => {
    if (!this.isActive) {
      this.editor.objects.clear()
      const objects = transaction.json
      this.current = objects
      this.isActive = true
      fabric.util.enlivenObjects(
        objects,
        (enlivenObjects: any[]) => {
          enlivenObjects.forEach((enlivenObject) => {
            if (enlivenObject.type !== LayerType.FRAME) {
              this.canvas.add(enlivenObject)
            }
          })
          this.emitStatus()
        },
        ""
      )
      this.isActive = false
    }
  }

  public reset = () => {
    this.redos = []
    this.undos = []

    this.emitStatus()
  }

  public emitStatus = () => {
    this.editor.emit("history:changed", {
      hasUndo: this.undos.length >= 1,
      hasRedo: this.redos.length > 0,
    })
  }

  public get status() {
    return {
      undos: this.undos,
      redos: this.redos,
      state: this.current,
    }
  }
}

export default History
