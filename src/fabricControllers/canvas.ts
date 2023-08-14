import { fabric } from 'fabric'
import { FabricCanvas } from "~/common/interfaces"
import { EditorConfig } from "~/types"
import type { Editor } from "./index"

class Canvas {
  private editor: Editor
  public container: HTMLDivElement
  public canvasContainer: HTMLDivElement
  public canvasElement: HTMLCanvasElement
  public canvas: FabricCanvas
  public canvasId: string
  private options = {
    width: 0,
    height: 0,
  }
  private config: EditorConfig

  constructor({ id, config, editor }: { id: string; config: EditorConfig; editor: Editor }) {
    this.config = config
    this.editor = editor
    this.canvasId = id
    this.initialize()
  }

  public initialize = () => {
    const canvas = new fabric.Canvas(this.canvasId, {
      backgroundColor: this.config.background,
      preserveObjectStacking: true,
      fireRightClick: true,
      height: this.config.size.height,
      width: this.config.size.width,
    })
    this.canvas = canvas as FabricCanvas

    this.canvas.disableEvents = function () {
      if (this.__fire === undefined) {
        this.__fire = this.fire
        // @ts-ignore
        this.fire = function () {}
      }
    }

    this.canvas.enableEvents = function () {
      if (this.__fire !== undefined) {
        this.fire = this.__fire
        this.__fire = undefined
      }
    }
  }

  public destroy = () => {
    // this.canvas.dispose()
    // this.dettachResizeObserver()
  }

  public resize({ width, height }: any) {
    this.canvas.setWidth(width).setHeight(height)
    this.canvas.renderAll()
    const diffWidth = width / 2 - this.options.width / 2
    const diffHeight = height / 2 - this.options.height / 2

    this.options.width = width
    this.options.height = height

    const deltaPoint = new fabric.Point(diffWidth, diffHeight)
    this.canvas.relativePan(deltaPoint)
  }

  public getBoundingClientRect() {
    const canvasEl = document.getElementById("canvas")
    const position = {
      left: canvasEl?.getBoundingClientRect().left,
      top: canvasEl?.getBoundingClientRect().top,
    }
    return position
  }

  public requestRenderAll() {
    this.canvas.requestRenderAll()
  }

  public get backgroundColor() {
    return this.canvas.backgroundColor
  }

  public setBackgroundColor(color: string) {
    this.canvas.setBackgroundColor(color, () => {
      this.canvas.requestRenderAll()
      this.editor.emit("canvas:updated")
    })
  }
}

declare module "fabric" {
  namespace fabric {
    interface Canvas {
      __fire: any
      enableEvents: () => void
      disableEvents: () => void
    }
    interface Object {
      id: string
      name: string
      locked: boolean
      duration?: {
        start?: number
        stop?: number
      }
      _objects?: fabric.Object[]
      metadata?: Record<string, any>
      clipPath?: undefined | null | fabric.Object
    }
  }
}

export default Canvas
