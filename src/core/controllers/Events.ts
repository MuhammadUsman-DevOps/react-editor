import { fabric } from "fabric"
import Base from "./Base"
import shourcutsManager from "../utils/shourcutsManager"
import { LayerType } from "../common/constants"
import { ControllerOptions } from ".."

class Events extends Base {
  constructor(props: ControllerOptions) {
    super(props)
    this.initialize()
  }

  private initialize() {
    this.canvas.wrapperEl.tabIndex = 1
    this.canvas.wrapperEl.style.outline = "none"
    // @ts-ignore
    this.canvas.on({
      "mouse:dblclick": this.onDoubleClick,
      "mouse:down": this.onMouseDown,
      "mouse:up": this.handleSelection,
      "selection:cleared": this.handleSelection,
      "selection:updated": this.handleSelection,
      "mouse:wheel": this.onMouseWheel,
      "mouse:out": this.onMouseOut,
      "object:modified": this.objectModified,
      "background:selected": this.onBackgroundSelected,
    })

    this.canvas.wrapperEl.addEventListener("keydown", this.onKeyDown.bind(this), false)
  }

  public destroy() {
    this.canvas.off({
      "mouse:dblclick": this.onDoubleClick,
      "mouse:down": this.onMouseDown,
      "mouse:up": this.handleSelection,
      "selection:cleared": this.handleSelection,
      "selection:updated": this.handleSelection,
      "mouse:wheel": this.onMouseWheel,
      "mouse:out": this.onMouseOut,
      "object:modified": this.objectModified,
      "background:selected": this.onBackgroundSelected,
    })

    this.canvas.wrapperEl.removeEventListener("keydown", this.onKeyDown.bind(this))
  }

  private onDoubleClick = (event: fabric.IEvent<any>) => {
    const subTarget = event.subTargets![0]
    if (subTarget) {
      this.editor.objects.select(subTarget.id)
    }
  }

  private onMouseDown = (e: fabric.IEvent<any>) => {
    this.editor.objects.pasteStyle()
    if (e.button === 3) {
      this.state.setContextMenuRequest({ left: e.e.offsetX, top: e.e.offsetY, target: e.target })
    } else {
      this.state.setContextMenuRequest(null)
    }
  }
  objectModified = (event: fabric.IEvent) => {
    const { target } = event
    if (target instanceof fabric.Textbox) {
      this.scaleTextbox(target)
    }
    this.editor.history.save()
  }

  onMouseOut = () => {
    this.canvas.renderAll()
  }

  onMouseWheel = (event: fabric.IEvent<any>) => {
    const isCtrlKey = event.e.ctrlKey
    if (isCtrlKey) {
      this.handleZoom(event)
    }
  }

  handleZoom = (event: fabric.IEvent<any>) => {
    const delta = event.e.deltaY
    let zoomRatio = this.canvas.getZoom()
    if (delta > 0) {
      zoomRatio -= 0.02
    } else {
      zoomRatio += 0.02
    }
    this.editor.zoom.zoomToPoint(new fabric.Point(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2), zoomRatio)
    event.e.preventDefault()
    event.e.stopPropagation()
  }

  onKeyDown(event: KeyboardEvent) {
    if (shourcutsManager.isCtrlZero(event)) {
      event.preventDefault()
      this.editor.zoom.zoomToFit()
    } else if (shourcutsManager.isCtrlMinus(event)) {
      event.preventDefault()
      this.editor.zoom.zoomIn()
    } else if (shourcutsManager.isCtrlEqual(event)) {
      event.preventDefault()
      this.editor.zoom.zoomOut()
    } else if (shourcutsManager.isCtrlOne(event)) {
      event.preventDefault()
      this.editor.zoom.zoomToOne()
    } else if (shourcutsManager.isCtrlZ(event)) {
      this.editor.history.undo()
    } else if (shourcutsManager.isCtrlShiftZ(event)) {
      this.editor.history.redo()
    } else if (shourcutsManager.isCtrlY(event)) {
      this.editor.history.redo()
    } else if (shourcutsManager.isCtrlA(event)) {
      event.preventDefault()
      this.editor.objects.select()
    } else if (shourcutsManager.isDelete(event)) {
      event.preventDefault()
      this.editor.objects.remove()
    } else if (shourcutsManager.isCtrlC(event)) {
      event.preventDefault()
      this.editor.objects.copy()
    } else if (shourcutsManager.isCtrlV(event)) {
      event.preventDefault()
      this.editor.objects.paste()
    } else if (shourcutsManager.isCtrlX(event)) {
      event.preventDefault()
      this.editor.objects.cut()
    }
  }

  onBackgroundSelected = () => {
    const objects = this.canvas.getObjects()
    const frame = objects[0]
    this.canvas.setActiveObject(objects[0])
    this.state.setActiveObject(frame)
    this.canvas.requestRenderAll()
  }

  handleSelection = (target: fabric.IEvent) => {
    if (target) {
      this.state.setActiveObject(null)
      const initialSelection = this.canvas.getActiveObject() as any
      const isNotMultipleSelection =
        (initialSelection && initialSelection.type === LayerType.GROUP.toLowerCase()) ||
        (initialSelection && initialSelection.type === LayerType.STATIC_VECTOR)

      if (initialSelection && !isNotMultipleSelection && initialSelection._objects) {
        const filteredObjects = (initialSelection._objects as fabric.Object[]).filter((object) => {
          if (object.type === LayerType.BACKGROUND) {
            return false
          }
          return !object.locked
        })
        this.canvas.discardActiveObject()
        if (filteredObjects.length > 0) {
          if (filteredObjects.length === 1) {
            this.canvas.setActiveObject(filteredObjects[0])
            this.state.setActiveObject(filteredObjects[0])
          } else {
            const activeSelection = new fabric.ActiveSelection(filteredObjects, {
              canvas: this.canvas,
            }) as fabric.Object
            this.canvas.setActiveObject(activeSelection)
            this.state.setActiveObject(activeSelection)
          }
        }
      } else {
        this.state.setActiveObject(initialSelection)
      }
    } else {
      this.state.setActiveObject(null)
    }
    this.canvas.requestRenderAll()
  }

  scaleTextbox = (target: fabric.Textbox) => {
    const { fontSize, width, scaleX } = target
    target.set({
      fontSize: fontSize! * scaleX!,
      width: width! * scaleX!,
      scaleX: 1,
      scaleY: 1,
    })
  }
}

export default Events
