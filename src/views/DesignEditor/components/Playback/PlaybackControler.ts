import { nanoid } from "nanoid"
import * as PIXI from "pixi.js"

PIXI.settings.SORTABLE_CHILDREN = true

export interface Element {
  id: string
  type: string
  url: string
  display: {
    from: number
    to: number
  }
  cut: {
    from: number
    to: number
  }
  position: {
    x: number
    y: number
    zIndex: number
  }
  objectId?: string
}

interface Options {
  zoomRatio: number
  /**
   * Fabric Object list
   */
  data?: Element[]
  template: any
}

interface ElementWithSprite extends Element {
  sprite: PIXI.Sprite
  video: HTMLVideoElement
}

class PlaybackController {
  /**
   * Pixi container canvas id
   */
  private id: string
  /**
   * Pixi wrapper DOM Reference
   */
  private el: HTMLElement

  /**
   * Pixi app instance
   */
  private app: PIXI.Application

  /**
   * Resources map used to store the data needed to display the content
   */
  private resources: Map<string, ElementWithSprite>

  /**
   * Resources map for audio elements
   */
  private audioResources: Map<string, any>
  private clipResources: Map<string, any>

  /**
   * Required options used to hold the elements data
   */
  private status: string = "STOPPED"
  private zoomRatio: number = 1
  /**
   * Whether the pixi app has been initialized
   */
  public initialized: Boolean
  private template: any

  constructor(id: string, options: Options) {
    this.id = id
    this.resources = new Map()
    this.audioResources = new Map()
    this.clipResources = new Map()
    this.initialized = false
    this.zoomRatio = options.zoomRatio
    this.template = options.template
    this.initialize()
  }

  /**
   * Initializes Pixi App
   * @returns
   * @private
   */
  private initialize = async () => {
    this.initializeContainer()
    this.initializeApplication()
    await this.initializeResources()
    this.initialized = true
  }

  /**
   * Get the container where the App wil be appended
   * @returns
   * @private
   */
  private initializeContainer = () => {
    const id = this.id
    const el = document.getElementById(id) as HTMLDivElement
    this.el = el
  }

  /**
   * renders the content in the webgl layer
   * @param progress Time Progress
   * @returns
   * @public
   */
  public render = (time: number) => {
    for (let [key, resource] of this.resources) {
      if (time > resource.display.from && time < resource.display.to!) {
        this.applySpriteOptions(resource.sprite, { visible: true })
      } else {
        if (resource.type === "StaticVideo") {
          this.hideAndMuteVideo(resource)
        } else {
          this.applySpriteOptions(resource.sprite, { visible: false })
        }
      }
    }
  }

  public hideAndMuteVideo = (resource: ElementWithSprite) => {
    resource.sprite.visible = false
    resource.video.muted = true
  }

  /**
   * Show the resource content in the webgl layer
   * @public
   * @returns
   */
  public play = () => {
    for (let [key, value] of this.resources) {
      this.applySpriteOptions(value.sprite, value.position)
      if (value.type === "StaticVideo") {
        value.video.muted = false
        value.video.currentTime = 0
      }

      value.sprite.visible = true
      this.app.stage.addChild(value.sprite)
    }
  }
  /**
   * Changes the sprite options
   * Used to show or hide elements
   * @param sprite Pixi Sprite
   * @param {Object} options Object that contains the option values
   */
  private applySpriteOptions = (sprite: PIXI.Sprite, options: Record<string, any>) => {
    for (const property in options) {
      // @ts-ignore
      sprite[property] = options[property]
    }

    if (options.x) sprite.x = options.x * this.zoomRatio
    if (options.y) sprite.y = options.y * this.zoomRatio
    if (options.width) sprite.width = options.width * options.scaleX * this.zoomRatio
    if (options.height) sprite.height = options.height * options.scaleY * this.zoomRatio
  }

  /**
   * Creates the Pixi app instance and appends it to the HTML Div container
   * @returns
   * @private
   */
  private initializeApplication = () => {
    let app = new PIXI.Application({
      width: 1200 * this.zoomRatio,
      height: 1200 * this.zoomRatio,
      resizeTo: this.el,
      backgroundColor: 0xffffff,
      backgroundAlpha: 1,
    })
    this.el.appendChild(app.view)
    this.app = app
  }

  /**
   * Loads the files and stores the data
   * @returns
   * @private
   */
  private initializeResources = async () => {
    let layers: any[] = []
    for (const clip of this.template.clips) {
      layers = layers.concat(clip.layers)
    }
    const updatedLayers = layers.map((layer) => {
      return {
        ...layer,
        id: nanoid(),
      }
    })

    const loader = new PIXI.Loader()
    for (const item of updatedLayers) {
      if (item.type === "StaticVideo" || item.type === "StaticAudio") {
        loader.add(item.id, item.url)
      } else {
        // Handle if it is an image
        if (item.url.match(/blob/)) {
          loader.add(item.id, item.url, {
            loadType: PIXI.LoaderResource.LOAD_TYPE.IMAGE,
            xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BLOB,
          })
        } else {
          loader.add(item.id, item.url)
        }
      }
    }

    return new Promise((resolve) => {
      loader.load((loader, resources) => {
        for (const [key, resource] of Object.entries(resources)) {
          const element = updatedLayers.find((i) => i.id === key) as Element

          const object = resource.data
          if (element.type === "StaticVideo") {
            object.muted = true
          }

          let texture: PIXI.Texture<PIXI.Resource> = PIXI.Texture.from(object)

          let sprite = new PIXI.Sprite(texture)
          this.resources.set(key, {
            ...element,
            sprite: sprite,
            video: object,
          })
        }
        resolve(true)
      })
    })
  }
}
export default PlaybackController
