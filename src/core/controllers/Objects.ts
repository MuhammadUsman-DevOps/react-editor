import { fabric } from "fabric"
import { isArray, pick } from "lodash"
import { nanoid } from "nanoid"
import Base from "./Base"
import { ILayer, ILayerOptions } from "~/types"
import { copyStyleProps, getCopyStyleCursor, LayerType } from "../common/constants"
import { Direction, GradientOptions, ScaleType, ShadowOptions, Size } from "../common/interfaces"
import ObjectImporter from "../utils/object-importer"
import setObjectGradient, { setObjectShadow } from "../utils/fabric"
import { loadImageFromURL } from "../utils/image-loader"

class Objects extends Base {
  public clipboard: any
  public isCut: any
  public copyStyleClipboard: any

  public add = async (item: Partial<ILayer>) => {
    const { canvas } = this
    const options = this.editor.frame.options
    const objectImporter = new ObjectImporter(this.editor)
    const refItem = item as unknown as ILayer
    const { width, height, top } = this.editor.frame.frame
    const object: fabric.Object = await objectImporter.import(refItem, options)
    if (this.config.clipToFrame) {
      const frame = this.editor.frame.frame
      object.clipPath = frame
    }

    const isBackgroundImage = refItem.type === LayerType.BACKGROUND_IMAGE
    const isgeneratedImage = refItem.type === LayerType.STATIC_IMAGE
    let currentBackgrounImage: any
    if (isBackgroundImage) {
      currentBackgrounImage = await this.unsetBackgroundImage()
    }

    if (isBackgroundImage) {
      canvas.add(object)
      object.moveTo(2)
      this.scale("fill", object.id)
      if (currentBackgrounImage) {
        canvas.add(currentBackgrounImage)
        this.sendToBack(currentBackgrounImage.id)
      }
    } else if(isgeneratedImage){
      object.scaleToWidth(width, false);
      object.scaleToHeight(height, false);
      canvas.add(object)
      object.center()
    }
    else{
      canvas.add(object)
      object.center()
    }

    this.state.setActiveObject(object)
    canvas.setActiveObject(object)

    this.updateContextObjects()
    this.editor.history.save()

    if (object.type === "StaticVideo") {
      setTimeout(() => {
        this.canvas.requestRenderAll()
      }, 500)
    }
  }
  /**
   *
   * @param options object properties to be updated
   * @param id if provided, will update the update by id
   */
  public update = (options: Partial<ILayerOptions>, id?: string) => {
    const frame = this.editor.frame.frame
    let refObject = this.canvas.getActiveObject()
    if (id) {
      refObject = this.findOneById(id)
    }
    const canvas = this.canvas
    if (refObject) {
      for (const property in options) {
        if (property === "angle" || property === "top" || property === "left") {
          if (property === "angle") {
            // @ts-ignore
            refObject.rotate(options["angle"])
            canvas.requestRenderAll()
          } else {
            // @ts-ignore
            refObject.set(property as "top" | "left", frame[property] + options[property])
            canvas.requestRenderAll()
          }
        } else if (property === "clipToFrame") {
          if (options["clipToFrame"]) {
            refObject.set("clipPath", frame)
          } else {
            refObject.set("clipPath", null)
          }
        } else if (property === "shadow") {
          // @ts-ignore
          this.setShadow(options["shadow"])
        } else if (property === "metadata") {
          refObject.set("metadata", {
            ...refObject.metadata,
            ...options[property],
          })
        } else if (refObject.type === LayerType.ACTIVE_SELECTION && refObject._objects) {
          refObject._objects.forEach((object) => {
            if (property === "metadata") {
              object.set("metadata", {
                ...object.metadata,
                ...options["metadata"],
              })
            } else {
              // @ts-ignore
              object.set(property, options[property])
            }
            object.setCoords()
          })
        } else {
          // @ts-ignore
          refObject.set(property as keyof fabric.Object, options[property])
          canvas.requestRenderAll()
          refObject.setCoords()
        }
      }
      this.editor.history.save()
    }
  }

  public clear = () => {
    const frame = this.editor.frame.frame
    this.canvas.getObjects().forEach((object) => {
      if (object.type !== LayerType.FRAME) {
        this.canvas.remove(object)
      }
    })
    frame.set({
      fill: "#ffffff",
    })
    this.canvas.renderAll()
  }

  public reset = () => {
    const background = this.editor.frame.background

    this.canvas.getObjects().forEach((object) => {
      if (object.type !== LayerType.FRAME && object.type !== LayerType.BACKGROUND) {
        this.canvas.remove(object)
      }
    })
    background?.set({
      fill: "#ffffff",
    })
    this.canvas.renderAll()
    this.editor.history.reset()
  }

  public select = (id?: string) => {
    this.canvas.discardActiveObject()
    if (id) {
      const [object] = this.findById(id) as fabric.Object[]
      if (object) {
        this.canvas.disableEvents()
        this.canvas.setActiveObject(object)
        if (object.group) {
          object.hasControls = false
        }
        this.canvas.enableEvents()
        this.canvas.requestRenderAll()

        const activeObject = this.canvas.getActiveObject()
        this.state.setActiveObject(activeObject)
      }
    } else {
      const filteredObjects = this.canvas.getObjects().filter((object) => {
        if (object.type === LayerType.FRAME || object.type === LayerType.BACKGROUND) {
          return false
        } else if (!object.evented) {
          return false
        } else if (object.locked) {
          return false
        }
        return true
      })
      if (!filteredObjects.length) {
        return
      }
      if (filteredObjects.length === 1) {
        this.canvas.setActiveObject(filteredObjects[0])
        this.canvas.renderAll()
        this.state.setActiveObject(filteredObjects[0])
        return
      }
      const activeSelection = new fabric.ActiveSelection(filteredObjects, {
        canvas: this.canvas,
      }) as fabric.Object
      this.canvas.setActiveObject(activeSelection)
      this.canvas.renderAll()
      this.state.setActiveObject(activeSelection)
    }
  }

  public deselect = () => {
    this.canvas.discardActiveObject()
    this.canvas.requestRenderAll()
    this.state.setActiveObject(null)
  }

  public move(direction: Direction, value: number, id?: string) {
    let refObject = this.canvas.getActiveObject() as Required<fabric.Object>
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject) {
      const updatedPosition = refObject[direction] + value
      refObject.set(direction, updatedPosition)
      this.editor.history.save()
    }
  }

  public position(position: Direction, value: number, id?: string) {
    let refObject = this.canvas.getActiveObject() as Required<fabric.Object>
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject) {
      refObject.set(position, value)
      this.editor.history.save()
    }
  }

  public resize(size: Size, value: number, id?: string) {
    let refObject = this.canvas.getActiveObject() as Required<fabric.Object>
    if (id) {
      refObject = this.findOneById(id)
    }
    if (size === "width") {
      refObject.set("scaleX", value / refObject.width)
    }
    if (size === "height") {
      refObject.set("scaleY", value / refObject.height)
    }
  }

  public scale(type: ScaleType, id?: string) {
    let refObject = this.canvas.getActiveObject() as Required<fabric.Object>
    const { width, height, top } = this.editor.frame.frame
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject) {
      let scaleX = width / refObject.width
      let scaleY = height / refObject.height
      const scaleMax = Math.max(scaleX, scaleY)
      const scaleMin = Math.min(scaleX, scaleY)

      if (type === "fit") {
        refObject.set({
          scaleX: scaleMin,
          scaleY: scaleMin,
        })
      }
      if (type === "fill") {
        refObject.set({
          scaleY: scaleMax,
          scaleX: scaleMax,
        })
      }
      refObject.center()
      if (scaleY >= scaleX) {
        refObject.set("top", top)
      }
    }
  }

  public cut = () => {
    this.copy()
    this.isCut = true
    this.remove()
  }

  public copy = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      this.clipboard = activeObject
    }
  }

  public copyById = (id: string) => {
    const object = this.findOneById(id)
    if (object) {
      this.clipboard = object
    }
  }

  public clone = () => {
    if (this.canvas) {
      const activeObject = this.canvas.getActiveObject()
      const frame = this.editor.frame.frame

      this.canvas.discardActiveObject()

      this.duplicate(activeObject, frame, (duplicates) => {
        const selection = new fabric.ActiveSelection(duplicates, {
          canvas: this.canvas,
        }) as fabric.Object
        this.canvas.setActiveObject(selection)
        this.canvas.requestRenderAll()
      })
    }
  }

  public cloneAudio = (id: string) => {
    const object = this.findOneById(id)
    const frame = this.editor.frame.frame
    this.deselect()
    this.duplicate(object, frame, (duplicates) => {
      this.canvas.requestRenderAll()
      this.updateContextObjects()
    })
  }

  private duplicate(object: fabric.Object, frame: fabric.Object, callback: (clones: fabric.Object[]) => void): void {
    if (object instanceof fabric.Group && object.type !== LayerType.STATIC_VECTOR) {
      const objects: fabric.Object[] = (object as fabric.Group).getObjects()
      const duplicates: fabric.Object[] = []
      for (let i = 0; i < objects.length; i++) {
        this.duplicate(objects[i], frame, (clones) => {
          duplicates.push(...clones)
          if (i === objects.length - 1) {
            callback(duplicates)
          }
        })
      }
    } else {
      object.clone(
        (clone: fabric.Object) => {
          clone.clipPath = undefined
          clone.id = nanoid()
          clone.set({
            left: object.left! + 10,
            top: object.top! + 10,
          })
          if (this.config.clipToFrame) {
            const frame = this.editor.frame.frame
            clone.clipPath = frame
          }
          this.canvas.add(clone)
          callback([clone])
        },
        ["keyValues", "src"]
      )
    }
  }

  public paste = () => {
    const object = this.clipboard
    if (object) {
      const frame = this.editor.frame.frame
      this.canvas.discardActiveObject()
      this.duplicate(object, frame, (duplicates) => {
        const selection = new fabric.ActiveSelection(duplicates, {
          canvas: this.canvas,
        }) as fabric.Object
        this.canvas.setActiveObject(selection)
        this.canvas.requestRenderAll()
        this.updateContextObjects()
      })
    }
  }

  /**`
   * Remove active object
   */
  public remove = (id?: string) => {
    let refObject = this.canvas.getActiveObjects()

    if (id) {
      refObject = this.findOneById(id)
    }

    if (isArray(refObject)) {
      refObject.forEach((obj) => {
        this.canvas.remove(obj)
      })
    } else {
      this.canvas.remove(refObject)
    }

    this.canvas.discardActiveObject().renderAll()
    this.editor.history.save()
    this.updateContextObjects()
  }

  public list = () => {
    const objects = this.canvas.getObjects()
    const filteredObjects = objects.filter((o) => {
      return o.type !== LayerType.FRAME && o.type !== LayerType.BACKGROUND
    })
    return filteredObjects
  }

  public copyStyle = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      //  @ts-ignore
      const clonableProps = copyStyleProps[activeObject.type]
      const clonedProps = pick(activeObject.toJSON(), clonableProps)

      this.copyStyleClipboard = {
        objectType: activeObject.type,
        props: clonedProps,
      }

      this.editor.frame.setHoverCursor(getCopyStyleCursor())
      this.canvas.hoverCursor = getCopyStyleCursor()
      this.canvas.defaultCursor = getCopyStyleCursor()
    }
  }

  public pasteStyle = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject && this.copyStyleClipboard) {
      if (activeObject.type === this.copyStyleClipboard.objectType) {
        const { fill, ...basicProps } = this.copyStyleClipboard.props
        activeObject.set(basicProps)

        if (fill) {
          if (fill.type) {
            activeObject.set({ fill: new fabric.Gradient(fill) })
          } else {
            activeObject.set({ fill })
          }
        }
      }
    }
    this.copyStyleClipboard = null
    this.editor.frame.setHoverCursor("default")
    this.canvas.hoverCursor = "move"
    this.canvas.defaultCursor = "default"
  }

  /**
   * Moves an object or a selection up in stack of drawn objects.
   */
  public bringForward = (id?: string) => {
    let refObject = this.canvas.getActiveObject()
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject) {
      this.canvas.bringForward(refObject)
    }
  }

  public bringForwardById = (id: string) => {
    this.canvas.getObjects().forEach((o) => {
      if (o.id === id) {
        this.canvas.bringForward(o)
      }
    })
  }

  /**
   * Moves an object or the objects of a multiple selection to the top of the stack of drawn objects
   */
  public bringToFront = (id?: string) => {
    let refObject = this.canvas.getActiveObject()
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject) {
      this.canvas.bringToFront(refObject)
    }
  }

  /**
   * Moves an object or a selection down in stack of drawn objects.
   */
  public sendBackwards = (id?: string) => {
    const objects = this.canvas.getObjects()
    let refObject = this.canvas.getActiveObject()
    if (id) {
      refObject = this.findOneById(id)
    }

    const index = objects.findIndex((o) => o === refObject)

    const backgroundImage = objects.find((o) => o.type === LayerType.BACKGROUND_IMAGE)
    const canBeMoved = backgroundImage ? index > 3 : index > 2

    if (refObject && canBeMoved) {
      this.canvas.sendBackwards(refObject)
    }
  }

  /**
   * Moves an object to specified level in stack of drawn objects.
   */
  public sendToBack = (id?: string) => {
    let refObject = this.canvas.getActiveObject()
    const objects = this.canvas.getObjects()
    const backgroundImage = objects.find((o) => o.type === LayerType.BACKGROUND_IMAGE)
    if (id) {
      refObject = this.findOneById(id)
    }
    // const indexx =
    if (refObject) {
      if (backgroundImage) {
        refObject.moveTo(3)
      } else {
        refObject.moveTo(2)
      }
    }
  }
  /**
   * Moves an object to the top of the frame. If multiple objects are selected,
   * will move all objects to the top of the selection.
   */
  public alignTop = (id?: string) => {
    const frame = this.editor.frame.frame

    let refObject = this.canvas.getActiveObject()
    if (id) {
      refObject = this.findOneById(id)
    }

    if (refObject) {
      if (refObject.type === LayerType.ACTIVE_SELECTION) {
        const selectedObjects = refObject._objects as fabric.Object[]
        const refTop = refObject.top
        this.canvas.discardActiveObject()
        selectedObjects.forEach((object) => {
          const currentObject = object
          currentObject.set({
            top: refTop,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas,
        }) as fabric.Object
        this.canvas.setActiveObject(selection)
        this.state.setActiveObject(selection)
      } else {
        const currentObject = refObject
        currentObject.set({
          top: frame.top,
        })
      }
      this.canvas.requestRenderAll()
    }
  }
  /**
   * Moves an object to the middle of the frame. If multiple objects are selected,
   * will move all objects to the middle of the selection.
   */
  public alignMiddle = (id?: string) => {
    const frame = this.editor.frame.frame
    let refObject = this.canvas.getActiveObject() as Required<fabric.Object>
    if (id) {
      refObject = this.findOneById(id)
    }

    if (refObject) {
      if (refObject.type === LayerType.ACTIVE_SELECTION) {
        const selectedObjects = refObject._objects as fabric.Object[]
        const refTop = refObject.top
        const refHeight = refObject.height
        this.canvas.discardActiveObject()
        selectedObjects.forEach((object) => {
          const currentObject = object
          const currentObjectHeight = currentObject.getScaledHeight()
          currentObject.set({
            top: refTop + refHeight / 2 - currentObjectHeight / 2,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas,
        }) as fabric.Object
        this.canvas.setActiveObject(selection)
        this.state.setActiveObject(selection)
      } else {
        const currentObject = refObject
        const currentObjectHeight = currentObject.getScaledHeight()
        currentObject.set({
          top: frame.top + frame.height / 2 - currentObjectHeight / 2,
        })
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the bottom of the frame. If multiple objects are selected,
   * will move all objects to the bottom of the selection.
   */
  public alignBottom = (id?: string) => {
    const frame = this.editor.frame.frame
    let refObject = this.canvas.getActiveObject() as Required<fabric.Object>
    if (id) {
      refObject = this.findOneById(id)
    }

    if (refObject) {
      if (refObject.type === LayerType.ACTIVE_SELECTION) {
        const selectedObjects = refObject._objects as fabric.Object[]
        const refTop = refObject.top
        const refHeight = refObject.height
        this.canvas.discardActiveObject()
        selectedObjects.forEach((object) => {
          const currentObject = object
          const currentObjectHeight = currentObject.getScaledHeight()
          currentObject.set({
            top: refTop + refHeight - currentObjectHeight,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas,
        }) as fabric.Object
        this.canvas.setActiveObject(selection)
        this.state.setActiveObject(selection)
      } else {
        const currentObject = refObject
        const currentObjectHeight = currentObject.getScaledHeight()
        currentObject.set({
          top: frame.top + frame.height - currentObjectHeight,
        })
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the left of the frame. If multiple objects are selected,
   * will move all objects to the left of the selection.
   */
  public alignLeft = (id?: string) => {
    const frame = this.editor.frame.frame
    let refObject = this.canvas.getActiveObject()
    if (id) {
      refObject = this.findOneById(id)
    }

    if (refObject) {
      if (refObject.type === LayerType.ACTIVE_SELECTION) {
        const selectedObjects = refObject._objects as fabric.Object[]
        const refLeft = refObject.left
        this.canvas.discardActiveObject()
        selectedObjects.forEach((object) => {
          const currentObject = object
          currentObject.set({
            left: refLeft,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas,
        }) as fabric.Object
        this.canvas.setActiveObject(selection)
        this.state.setActiveObject(selection)
      } else {
        const currentObject = refObject
        currentObject.set({
          left: frame.left,
        })
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the center of the frame. If multiple objects are selected,
   * will move all objects to the center of the selection.
   */
  public alignCenter = (id?: string) => {
    const frame = this.editor.frame.frame
    let refObject = this.canvas.getActiveObject() as Required<fabric.Object>
    if (id) {
      refObject = this.findOneById(id)
    }

    if (refObject) {
      if (refObject.type === LayerType.ACTIVE_SELECTION) {
        const selectedObjects = refObject._objects
        const refLeft = refObject.left
        const refWidth = refObject.width
        this.canvas.discardActiveObject()
        selectedObjects.forEach((object) => {
          const currentObject = object
          const currentObjectWidth = currentObject.getScaledWidth()
          currentObject.set({
            left: refLeft + refWidth / 2 - currentObjectWidth / 2,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas,
        }) as fabric.Object
        this.canvas.setActiveObject(selection)
        this.state.setActiveObject(selection)
      } else {
        const currentObject = refObject
        const currentObjectWidth = currentObject.getScaledWidth()
        currentObject.set({
          left: frame.left + frame.width / 2 - currentObjectWidth / 2,
        })
      }
      this.canvas.requestRenderAll()
    }
  }

  /**
   * Moves an object to the right of the frame. If multiple objects are selected,
   * will move all objects to the right of the selection.
   */
  public alignRight = (id?: string) => {
    const frame = this.editor.frame.frame
    let refObject = this.canvas.getActiveObject() as Required<fabric.Object>
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject) {
      if (refObject.type === LayerType.ACTIVE_SELECTION) {
        const selectedObjects = refObject._objects as fabric.Group[]
        const refLeft = refObject.left
        const refWidth = refObject.width
        this.canvas.discardActiveObject()
        selectedObjects.forEach((object) => {
          const currentObject = object
          const currentObjectWidth = currentObject.getScaledWidth()
          currentObject.set({
            left: refLeft + refWidth - currentObjectWidth,
          })
        })
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas,
        }) as fabric.Object
        this.canvas.setActiveObject(selection)
        this.state.setActiveObject(selection)
      } else {
        const currentObject = refObject
        const currentObjectWidth = currentObject.getScaledWidth()
        currentObject.set({
          left: frame.left + frame.width - currentObjectWidth,
        })
      }
      this.canvas.requestRenderAll()
    }
  }

  public unsetBackgroundImage(): Promise<fabric.StaticImage | null> {
    return new Promise(async (resolve) => {
      const objects = this.canvas.getObjects()
      const currentBackgroundImage = objects.find((o) => o.type === LayerType.BACKGROUND_IMAGE)
      let nextImage: fabric.StaticImage
      if (currentBackgroundImage) {
        const currentBackgroundImageJSON = currentBackgroundImage.toJSON(this.config.propertiesToInclude)
        delete currentBackgroundImageJSON.clipPath
        const nextImageElement = await loadImageFromURL(currentBackgroundImageJSON.src)
        nextImage = new fabric.StaticImage(nextImageElement, { ...currentBackgroundImageJSON, id: nanoid() })
        // @ts-ignore
        // this.canvas.add(nextImage)
        this.canvas.remove(currentBackgroundImage)
        resolve(nextImage)
      } else {
        resolve(null)
      }
    })
  }

  public async setAsBackgroundImage(id?: string) {
    let refObject = this.canvas.getActiveObject() as fabric.Object
    if (id) {
      refObject = this.findOneById(id)
    }

    if (refObject && refObject.type === LayerType.STATIC_IMAGE) {
      const frame = this.editor.frame.frame
      let nextImage = await this.unsetBackgroundImage()
      if (nextImage) {
        // @ts-ignore
        this.canvas.add(nextImage)
      }
      const objectJSON = refObject.toJSON(this.config.propertiesToInclude)
      delete objectJSON.clipPath
      const image = await loadImageFromURL(objectJSON.src)
      const backgroundImage = new fabric.BackgroundImage(image, { ...objectJSON, id: nanoid() })
      // @ts-ignore
      this.canvas.add(backgroundImage)
      backgroundImage.clipPath = frame
      this.canvas.remove(refObject)

      this.canvas.requestRenderAll()
      this.scale("fill", backgroundImage.id)
      backgroundImage.moveTo(2)
      if (nextImage) {
        this.sendToBack(nextImage.id)
      }
    }
  }

  /**
   * Set object shadow
   * @param options ShadowOptions
   */
  public setShadow = (options: ShadowOptions) => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject instanceof fabric.Group && activeObject.type !== LayerType.STATIC_VECTOR) {
      // @ts-ignore
      activeObject._objects.forEach((object) => {
        setObjectShadow(object, options)
      })
    } else {
      setObjectShadow(activeObject, options)
    }
    this.canvas.requestRenderAll()
    this.editor.history.save()
  }

  /**
   * Set object fill as gradient
   * @param param GradientOptions
   */
  public setGradient = ({ angle, colors }: GradientOptions) => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject instanceof fabric.Group) {
      // @ts-ignore
      activeObject._objects.forEach((object) => {
        setObjectGradient(object, angle, colors)
      })
    } else {
      setObjectGradient(activeObject, angle, colors)
    }
    this.canvas.requestRenderAll()
    this.editor.history.save()
  }

  /**
   * Group selected objects
   */
  public group = () => {
    const activeObject = this.canvas.getActiveObject() as fabric.ActiveSelection
    if (!activeObject) {
      return
    }
    if (activeObject.type !== LayerType.ACTIVE_SELECTION) {
      return
    }

    activeObject.toGroup()
    this.canvas.requestRenderAll()
    this.editor.history.save()

    const groupedActiveObject = this.canvas.getActiveObject()
    groupedActiveObject.set({
      name: "group",
      id: nanoid(),
      // @ts-ignore
      subTargetCheck: true,
    })
    this.updateContextObjects()
  }

  public ungroup = () => {
    const frame = this.editor.frame.frame
    const activeObject = this.canvas.getActiveObject() as fabric.ActiveSelection
    if (!activeObject) {
      return
    }
    if (activeObject.type !== LayerType.GROUP.toLowerCase()) {
      return
    }

    activeObject.clipPath = null
    const activeSelection = activeObject.toActiveSelection()
    // @ts-ignore
    activeSelection._objects.forEach((object) => {
      object.clipPath = frame
    })
    this.state.setActiveObject(activeSelection)
    this.canvas.requestRenderAll()
    this.editor.history.save()
    this.updateContextObjects()
  }

  /**
   * Lock object movement and disable controls
   */
  public lock = (id?: string) => {
    let refObject = this.canvas.getActiveObject() as fabric.Object | fabric.ActiveSelection
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject) {
      if (refObject._objects) {
        refObject._objects.forEach((object) => {
          object.set({
            hasControls: false,
            lockMovementY: true,
            lockMovementX: true,
            locked: true,
          })
        })
        // @ts-ignore
        refObject.set({
          hasControls: false,
          lockMovementY: true,
          lockMovementX: true,
          locked: true,
        })
      } else {
        // @ts-ignore
        refObject.set({
          hasControls: false,
          lockMovementY: true,
          lockMovementX: true,
          locked: true,
        })
      }
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  /**
   * Unlock active object
   */
  public unlock = (id?: string) => {
    let refObject = this.canvas.getActiveObject() as fabric.Object | fabric.ActiveSelection
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject) {
      if (refObject?._objects) {
        refObject._objects.forEach((object) => {
          object.set({
            hasControls: true,
            lockMovementY: false,
            lockMovementX: false,
            locked: false,
          })
        })
        // @ts-ignore
        refObject.set({
          hasControls: true,
          lockMovementY: false,
          lockMovementX: false,
          locked: false,
        })
      } else {
        // @ts-ignore
        refObject.set({
          hasControls: true,
          lockMovementY: false,
          lockMovementX: false,
          locked: false,
        })
      }
      this.canvas.requestRenderAll()
      this.editor.history.save()
    }
  }

  public findByName = (name: string) => {
    return this.canvas.getObjects().filter((o) => o.name === name)
  }

  public removeByName = (name: string) => {
    this.canvas.getObjects().forEach((o) => {
      if (o.name === name) {
        this.canvas.remove(o)
        this.editor.history.save()
      }
    })
    this.canvas.requestRenderAll()
  }

  public findByIdInObjecs = (id: string, objects: fabric.Object[]): any => {
    let item = null

    for (const object of objects) {
      if (object.id === id) {
        item = object
        break
      }
      if (object.type === "group") {
        // @ts-ignore
        const itemInGroup = this.findByIdInObjecs(id, object._objects)
        if (itemInGroup) {
          item = itemInGroup
          break
        }
      }
    }
    return item
  }
  public findById = (id: string) => {
    const objects = this.canvas.getObjects()
    const object = this.findByIdInObjecs(id, objects)
    return [object]
  }

  public findOneById = (id: string) => {
    const objects = this.findById(id)
    return objects[0]
  }

  public removeById = (id: string) => {
    this.canvas.getObjects().forEach((o) => {
      if (o.id === id) {
        this.canvas.remove(o)
        this.editor.history.save()
        this.updateContextObjects()
      }
    })
    this.canvas.requestRenderAll()
  }

  // Text exclusive hooks
  public toUppercase(id?: string) {
    let refObject = this.canvas.getActiveObject() as fabric.StaticText
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject && refObject.type === LayerType.STATIC_TEXT) {
      if (refObject.isEditing) {
        refObject.hiddenTextarea!.value = refObject.hiddenTextarea!.value.toUpperCase()
        refObject.updateFromTextArea()
        this.canvas.requestRenderAll()
        return
      }

      const text = refObject.text
      refObject.text = text!.toUpperCase()
      this.canvas.requestRenderAll()
    }
  }

  // Text exclusive hooks
  public toLowerCase(id?: string) {
    let refObject = this.canvas.getActiveObject() as fabric.StaticText
    if (id) {
      refObject = this.findOneById(id)
    }
    if (refObject && refObject.type === LayerType.STATIC_TEXT) {
      if (refObject.isEditing) {
        refObject.hiddenTextarea!.value = refObject.hiddenTextarea!.value.toLowerCase()
        refObject.updateFromTextArea()
        this.canvas.requestRenderAll()
        return
      }

      const text = refObject.text
      refObject.text = text!.toLowerCase()
      this.canvas.requestRenderAll()
    }
  }

  public updateContextObjects = () => {
    const objects = this.canvas.getObjects()
    const filteredObjects = objects.filter((o) => {
      return o.type !== "Frame" && o.type !== "Background"
    })
    this.state.setObjects(filteredObjects)
  }
}

export default Objects
