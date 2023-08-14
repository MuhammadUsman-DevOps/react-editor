import { fabric } from "fabric"
import { nanoid } from "nanoid"
import { LayerType } from "~/common/constants"
import { loadImageFromURL } from "../fabricControllers/image-loader"
import { Editor } from "../editor"
import { updateObjectBounds, updateObjectShadow } from "../fabricControllers/fabric"
import {
  IBackground,
  IBackgroundImage,
  IGroup,
  ILayer,
  IStaticAudio,
  IStaticImage,
  IStaticPath,
  IStaticText,
  IStaticVector,
  IStaticVideo,
} from "~/types"
import { createVideoElement } from "./video-loader"

class ObjectImporter {
  constructor(public editor: Editor) {}
  async import(item: ILayer, options: Required<ILayer>, inGroup: boolean = false): Promise<fabric.Object> {
    let object: fabric.Object
    switch (item.type) {
      case LayerType.STATIC_TEXT:
        object = await this.staticText(item, options, inGroup)
        break
      case LayerType.STATIC_IMAGE:
        // @ts-ignore
        object = await this.staticImage(item, options, inGroup)
        break
      case LayerType.BACKGROUND_IMAGE:
        // @ts-ignore
        object = await this.backgroundImage(item, options, inGroup)
        break
      case LayerType.STATIC_VIDEO:
        object = await this.staticVideo(item, options, inGroup)
        break
      case LayerType.STATIC_VECTOR:
        // @ts-ignore
        object = await this.staticVector(item, options, inGroup)
        break
      case LayerType.STATIC_PATH:
        object = await this.staticPath(item, options, inGroup)
        break
      case LayerType.BACKGROUND:
        object = await this.background(item, options, inGroup)
        break
      case LayerType.GROUP:
        object = await this.group(item, options, inGroup)
        break
      case LayerType.STATIC_AUDIO:
        object = await this.staticAudio(item, options, inGroup)
        break
      default:
        object = await this.background(item, options, inGroup)
    }
    return object
  }

  public staticText(item: ILayer, options: Required<ILayer>, inGroup: boolean): Promise<fabric.StaticText> {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup)

        const metadata = item.metadata

        const { textAlign, fontFamily, fontSize, charSpacing, lineHeight, text, underline, fill, fontURL } =
          item as IStaticText

        const textOptions = {
          ...baseOptions,
          underline,
          width: baseOptions.width ? baseOptions.width : 240,
          fill: fill ? fill : "#333333",
          text: text ? text : "Empty Text",
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && { fontSize }),
          ...(charSpacing && { charSpacing }),
          ...(lineHeight && { lineHeight }),
          metadata,
          fontURL,
        }
        // @ts-ignore
        const element = new fabric.StaticText(textOptions)
        updateObjectBounds(element, options)
        updateObjectShadow(element, item.shadow)

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  public staticImage(item: ILayer, options: Required<ILayer>, inGroup: boolean): Promise<fabric.StaticImage> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup)
        const { src, cropX, cropY } = item as IStaticImage

        const image: any = await loadImageFromURL(src)

        const { width, height } = baseOptions
        if (!width || !height) {
          baseOptions.width = image.width
          baseOptions.height = image.height
        }

        const element = new fabric.StaticImage(image, {
          ...baseOptions,
          cropX: cropX || 0,
          cropY: cropY || 0,
        })

        updateObjectBounds(element, options)
        updateObjectShadow(element, item.shadow)

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  public backgroundImage(item: ILayer, options: Required<ILayer>, inGroup: boolean): Promise<fabric.BackgroundImage> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup)
        const { src, cropX, cropY } = item as IBackgroundImage

        const image: any = await loadImageFromURL(src)

        const { width, height } = baseOptions
        if (!width || !height) {
          baseOptions.width = image.width
          baseOptions.height = image.height
        }

        const element = new fabric.BackgroundImage(image, {
          ...baseOptions,
          cropX: cropX || 0,
          cropY: cropY || 0,
        })

        updateObjectBounds(element, options)
        // updateObjectShadow(element, item.shadow)

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  public staticVideo(item: ILayer, options: Required<ILayer>, inGroup: boolean): Promise<fabric.Object> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup)
        const { src } = item as IStaticVideo
        const id = item.id
        const videoElement = await createVideoElement(id, src)
        const { width, height } = baseOptions

        if (!width || !height) {
          baseOptions.width = videoElement.videoWidth
          baseOptions.height = videoElement.videoHeight
        }

        const element = new fabric.StaticVideo(videoElement, {
          ...baseOptions,
          src: src,
          duration: videoElement.duration,
          totalDuration: videoElement.duration,
        }) as unknown as any

        element.set("time", 10)
        videoElement.currentTime = 10
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  public staticAudio(item: ILayer, options: Required<ILayer>, inGroup: boolean): Promise<fabric.StaticAudio> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup)
        const { src } = item as IStaticAudio
        // @ts-ignore
        const element = new fabric.StaticAudio({
          ...baseOptions,
          src: src,
        })
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  public staticPath(item: ILayer, options: Required<ILayer>, inGroup: boolean): Promise<fabric.StaticPath> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup)
        const { path, fill } = item as IStaticPath

        const element = new fabric.StaticPath({
          ...baseOptions,
          // @ts-ignore
          path,
          fill,
        })

        updateObjectBounds(element, options)
        updateObjectShadow(element, item.shadow)

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  public group(item: ILayer, options: Required<ILayer>, inGroup: boolean): Promise<fabric.Group> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup)
        let objects: fabric.Object[] = []

        for (const object of (item as IGroup).objects) {
          // @ts-ignore
          objects = objects.concat(await this.import(object, options, true))
        }
        // @ts-ignore
        const element = new fabric.Group(objects, { ...baseOptions, subTargetCheck: true })

        updateObjectBounds(element, options)
        updateObjectShadow(element, item.shadow)

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  public background(item: ILayer, options: Required<ILayer>, inGroup: boolean): Promise<fabric.Background> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup)
        const { fill } = item as IBackground
        // @ts-ignore
        const element = new fabric.Background({
          ...baseOptions,
          fill: fill,
          // @ts-ignore
          shadow: item.shadow,
        })

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  public staticVector(item: ILayer, options: Required<ILayer>, inGroup: boolean): Promise<fabric.StaticVector> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup)
        const { src, colorMap = {} } = item as IStaticVector

        fabric.loadSVGFromURL(src, (objects, opts) => {
          const { width, height } = baseOptions
          if (!width || !height) {
            baseOptions.width = opts.width
            baseOptions.height = opts.height
            baseOptions.top = options.top
            baseOptions.left = options.left
          }

          const element = new fabric.StaticVector(objects, opts, {
            ...baseOptions,
            src,
            colorMap,
          })

          updateObjectBounds(element, options)
          updateObjectShadow(element, item.shadow)

          resolve(element)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  public getBaseOptions(item: ILayer, options: Required<ILayer>, inGroup: boolean) {
    const {
      id,
      name,
      left,
      top,
      width,
      height,
      scaleX,
      scaleY,
      stroke,
      strokeWidth,
      angle,
      opacity,
      flipX,
      flipY,
      skewX,
      skewY,
      originX,
      originY,
      type,
      preview,
    } = item as Required<ILayer>
    let metadata = item.metadata ? item.metadata : {}
    const { fill } = metadata
    let baseOptions = {
      id: id ? id : nanoid(),
      name: name ? name : type,
      angle: angle ? angle : 0,
      top: inGroup ? top : options.top + top,
      left: inGroup ? left : options.left + left,
      width: width,
      height: height,
      originX: originX || "left",
      originY: originY || "top",
      scaleX: scaleX || 1,
      scaleY: scaleY || 1,
      fill: fill || "#000000",
      opacity: opacity ? opacity : 1,
      flipX: flipX ? flipX : false,
      flipY: flipY ? flipY : false,
      skewX: skewX ? skewX : 0,
      skewY: skewY ? skewY : 0,
      ...(stroke && { stroke }),
      strokeWidth: strokeWidth ? strokeWidth : 0,
      strokeDashArray: item.strokeDashArray ? item.strokeDashArray : null,
      strokeLineCap: item.strokeLineCap ? item.strokeLineCap : "butt",
      strokeLineJoin: item.strokeLineJoin ? item.strokeLineJoin : "miter",
      strokeUniform: item.strokeUniform || false,
      strokeMiterLimit: item.strokeMiterLimit ? item.strokeMiterLimit : 4,
      strokeDashOffset: item.strokeDashOffset ? item.strokeMiterLimit : 0,
      metadata: metadata,
      preview,
    }
    return baseOptions
  }
}

export default ObjectImporter
