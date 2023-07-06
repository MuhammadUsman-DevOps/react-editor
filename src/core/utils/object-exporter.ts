import {
  ILayer,
  IStaticAudio,
  IStaticImage,
  IStaticText,
  IStaticVector,
  IStaticVideo,
  IStaticPath,
  IBackground,
  IGroup,
  IBackgroundImage,
} from "~/types"
import { LayerType } from "../common/constants"

class ObjectExporter {
  public export(item: ILayer, options: Required<ILayer>, inGroup = false): ILayer {
    let object
    switch (item.type) {
      case LayerType.STATIC_IMAGE:
        object = this.staticImage(item, options, inGroup)
        break
      case LayerType.BACKGROUND_IMAGE:
        object = this.backgroundImage(item, options, inGroup)
        break
      case LayerType.STATIC_VIDEO:
        object = this.staticVideo(item, options, inGroup)
        break
      case LayerType.STATIC_TEXT:
        object = this.staticText(item, options, inGroup)
        break
      case LayerType.STATIC_VECTOR:
        object = this.staticVector(item, options, inGroup)
        break
      case LayerType.STATIC_PATH:
        object = this.staticPath(item, options, inGroup)
        break
      case LayerType.BACKGROUND:
        object = this.background(item, options, inGroup)
        break
      case LayerType.GROUP.toLowerCase():
        object = this.group(item, options, inGroup)
        break
      case LayerType.STATIC_AUDIO:
        object = this.staticAudio(item, options, inGroup)
        break
      default:
        object = this.background(item, options, inGroup)
    }
    return object
  }

  public staticText(item: ILayer, options: Required<ILayer>, inGroup: boolean): IStaticText {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
    const {
      fontFamily,
      textAlign,
      fontSize,
      charSpacing,
      lineHeight,
      fill,
      text,
      angle,
      underline,
      fontURL,
      metadata,
    } = item as IStaticText
    const object = {
      ...baseOptions,
      charSpacing,
      fill,
      fontFamily,
      fontSize,
      lineHeight,
      text,
      textAlign,
      angle,
      underline,
      fontURL,
      metadata,
    }
    return object
  }

  public staticImage(item: ILayer, options: Required<ILayer>, inGroup: boolean): IStaticImage {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
    const { src, cropX, cropY, metadata } = item as IStaticImage
    const object = {
      ...baseOptions,
      src,
      cropX,
      cropY,
      metadata,
    }

    return object
  }

  public backgroundImage(item: ILayer, options: Required<ILayer>, inGroup: boolean): IBackgroundImage {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
    const { src, cropX, cropY, metadata } = item as IBackgroundImage
    const object = {
      ...baseOptions,
      src,
      cropX,
      cropY,
      metadata,
    }

    return object
  }

  public staticAudio(item: ILayer, options: Required<ILayer>, inGroup: boolean): IStaticAudio {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
    const { src, metadata } = item as IStaticAudio
    const object: IStaticAudio = {
      ...baseOptions,
      src,
      metadata,
      speedFactor: 1,
    }
    return object
  }

  public staticVideo(item: ILayer, options: Required<ILayer>, inGroup: boolean): IStaticVideo {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
    const { src } = item as IStaticVideo
    const object = {
      ...baseOptions,
      src: src,
      metadata: {},
      speedFactor: 1,
    }
    return object
  }

  public staticVector(item: ILayer, options: Required<ILayer>, inGroup: boolean): IStaticVector {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
    const { src, colorMap, metadata } = item as IStaticVector
    const object = {
      ...baseOptions,
      src,
      colorMap,
      metadata,
    }

    return object
  }

  public staticPath(item: ILayer, options: Required<ILayer>, inGroup: boolean): IStaticPath {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
    const { path, fill, metadata } = item as IStaticPath
    const object = {
      ...baseOptions,
      path,
      fill,
      metadata,
    }

    return object
  }

  public background(item: ILayer, options: Required<ILayer>, inGroup: boolean): IBackground {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
    const { fill, metadata } = item as IBackground
    const object = {
      ...baseOptions,
      fill,
      metadata,
    }

    return object
  }

  public group(item: ILayer, options: Required<ILayer>, inGroup: boolean): IGroup {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
    const { objects, metadata } = item as IGroup
    const groupObjects = objects.map((object) => {
      return this.export(object, options, true)
    })
    return {
      ...baseOptions,
      type: "Group",
      objects: groupObjects,
      metadata,
    }
  }

  public getBaseOptions(item: ILayer, options: Required<ILayer>, inGroup: boolean = false) {
    const {
      id,
      name,
      top,
      left,
      width,
      height,
      scaleX,
      scaleY,
      originX,
      originY,
      type,
      stroke,
      strokeWidth,
      opacity,
      angle,
      flipX,
      flipY,
      skewX,
      skewY,
      shadow,
      preview,
    } = item as Required<ILayer>
    const baseOptions = {
      id,
      name: name ? name : type,
      angle,
      stroke,
      strokeWidth,
      left: inGroup ? left : left - options.left,
      top: inGroup ? top : top - options.top,
      width,
      height,
      opacity,
      originX,
      originY,
      scaleX,
      scaleY,
      type,
      flipX,
      flipY,
      skewX,
      skewY,
      visible: true,
      shadow,
      preview,
    }
    return baseOptions
  }
}

export default ObjectExporter
