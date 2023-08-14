// @ts-nocheck
import { fabric } from "fabric"
import { ControllerOptions } from "../common/interfaces"
import Base from "./Base"
import { drawCircleIcon } from "../utils/drawer"

class Personalization extends Base {
  constructor(props: ControllerOptions) {
    super(props)
    this.init()
  }

  init() {
    const rotationControlPosition = {
      y: this.config.controlsPosition.rotation === "TOP" ? -0.5 : 0.5,
      offsetY: this.config.controlsPosition.rotation === "TOP" ? -30 : 30,
    }

    //Disable context menu
    //@ts-ignore
    fabric.util.addListener(document.getElementsByClassName("upper-canvas")[0], "contextmenu", function (e) {
      e.preventDefault()
    })

    fabric.Object.prototype.transparentCorners = false
    fabric.Object.prototype.cornerColor = "#20bf6b"
    fabric.Object.prototype.cornerStyle = "circle"
    fabric.Object.prototype.borderColor = "#3782F7"
    fabric.Object.prototype.cornerSize = 12
    fabric.Object.prototype.borderScaleFactor = 2.25
    fabric.Object.prototype.borderOpacityWhenMoving = 1
    fabric.Object.prototype.borderOpacity = 1

    fabric.Object.prototype.controls.tr = new fabric.Control({
      x: 0.5,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.tl = new fabric.Control({
      x: -0.5,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.bl = new fabric.Control({
      x: -0.5,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.br = new fabric.Control({
      x: 0.5,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mt = new fabric.Control({
      x: 0,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mb = new fabric.Control({
      x: 0,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: 0.5,
      offsetY: 30,
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
      actionName: "rotate",
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
      ...rotationControlPosition,
    })

    // Texbox controls
    fabric.Textbox.prototype.controls.tr = fabric.Object.prototype.controls.tr
    fabric.Textbox.prototype.controls.tl = fabric.Object.prototype.controls.tl
    fabric.Textbox.prototype.controls.bl = fabric.Object.prototype.controls.bl
    fabric.Textbox.prototype.controls.br = fabric.Object.prototype.controls.br

    fabric.Textbox.prototype.controls.mt = new fabric.Control({
      render: () => true,
    })

    fabric.Textbox.prototype.controls.mb = fabric.Textbox.prototype.controls.mt

    fabric.Textbox.prototype.controls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.changeWidth,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: "resizing",
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Textbox.prototype.controls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.changeWidth,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: "resizing",
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Textbox.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: 0.5,
      offsetY: 30,
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
      actionName: "rotate",
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
      ...rotationControlPosition,
    })

    this.canvas.selectionColor = "rgba(55, 130, 247, 0.15)"
    this.canvas.selectionBorderColor = "#3782F7"
    this.canvas.selectionLineWidth = 1.5
    this.canvas.on("selection:created", (ev) => {
      const objects = this.canvas.getActiveObjects()
      const selection = this.canvas.getActiveObject()
      if (objects.length > 1) {
        selection.setControlsVisibility({
          mt: false,
          mb: false,
          mr: false,
          ml: false,
        })
        selection.padding = 10
      }
    })
    this.canvas.on("mouse:over", (event) => {
      const target = event.target
      const activeObjects = this.canvas.getActiveObject()
      if (target && activeObjects !== target && target.type !== "Background" && target.type !== "BackgroundImage") {
        const bound = target.getBoundingRect()
        const ctx = this.canvas.getContext()
        ctx.strokeStyle = "#3782F7"
        ctx.lineWidth = 2.25
        ctx.strokeRect(bound.left, bound.top, bound.width, bound.height)
      }
    })
  }
}

export default Personalization
